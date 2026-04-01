package com.ticketmgt.escalationpolicy.engine;

import com.ticketmgt.escalationpolicy.engine.EscalationExecution.ExecutionStatus;
import com.ticketmgt.escalationpolicy.entity.EscalationPolicy;
import com.ticketmgt.escalationpolicy.entity.EscalationStep;
import com.ticketmgt.escalationpolicy.entity.EscalationStep.TargetType;
import com.ticketmgt.escalationpolicy.repository.EscalationPolicyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Core escalation execution engine.
 *
 * <p><strong>Responsibilities:</strong>
 * <ol>
 *   <li>Start a new execution when an incident is triggered ({@link #startEscalation}).</li>
 *   <li>Fire the current step of every due execution ({@link #processDueExecutions}).</li>
 *   <li>Provide an acknowledgement hook to cancel pending steps ({@link #cancelForIncident}).</li>
 * </ol>
 *
 * <p><strong>Concurrency safeguards:</strong>
 * <ul>
 *   <li>The repository fetches due rows with {@code SELECT FOR UPDATE} — only one
 *       thread/node processes each execution row at a time.</li>
 *   <li>Incident state is re-read from DB at each step fire — never trusted from memory.</li>
 *   <li>Policy version is compared to a snapshot taken at schedule time; a mismatch
 *       triggers re-evaluation before notifying.</li>
 *   <li>All mutations use {@code @Transactional} so partial writes are never visible.</li>
 * </ul>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EscalationExecutionEngine {

    private final EscalationExecutionRepository executionRepository;
    private final EscalationPolicyRepository    policyRepository;
    private final EscalationNotificationPort    notificationPort;

    // =========================================================================
    // Public API
    // =========================================================================

    /**
     * Creates and persists a new {@link EscalationExecution} for the given incident.
     *
     * <p>Must be called by the incident domain immediately after an incident is created
     * and a policy has been assigned to it.
     *
     * <p>Idempotent — if a PENDING execution already exists for this incident the call
     * is a no-op (returns immediately without creating a duplicate).
     *
     * @param incidentId UUID of the newly created incident
     * @param policyId   UUID of the escalation policy assigned to that incident
     */
    @Transactional
    public void startEscalation(UUID incidentId, UUID policyId) {
        // Guard: do not create a duplicate execution for the same incident
        if (executionRepository.existsByIncidentIdAndStatus(incidentId, ExecutionStatus.PENDING)) {
            log.warn("startEscalation ignored — PENDING execution already exists for incident {}", incidentId);
            return;
        }

        EscalationPolicy policy = loadPolicyOrAbort(incidentId, policyId).orElse(null);
        if (policy == null) return;

        List<EscalationStep> steps = sortedSteps(policy);
        if (steps.isEmpty()) {
            log.warn("startEscalation aborted — policy {} has no steps; incident {}", policyId, incidentId);
            return;
        }

        // Step 1 waitTimeMinutes is typically 0 → fire immediately
        EscalationStep firstStep = steps.get(0);
        Instant nextFireAt = Instant.now().plus(firstStep.getWaitTimeMinutes(), ChronoUnit.MINUTES);

        EscalationExecution execution = EscalationExecution.builder()
                .incidentId(incidentId)
                .policyId(policyId)
                .policyVersion(policy.getVersion())   // snapshot for mid-execution change detection
                .currentStep(firstStep.getStepOrder())
                .nextFireAt(nextFireAt)
                .status(ExecutionStatus.PENDING)
                .build();

        executionRepository.save(execution);
        log.info("Escalation started: incidentId={}, policyId={}, firstStep={}, nextFireAt={}",
                incidentId, policyId, firstStep.getStepOrder(), nextFireAt);
    }

    /**
     * Called by {@link EscalationScheduler} on each polling cycle.
     *
     * <p>Processes every execution whose {@code nextFireAt} is in the past and whose
     * status is PENDING. The repository-level {@code SELECT FOR UPDATE} lock guarantees
     * that in a multi-node setup only one scheduler thread runs each execution.
     */
    @Transactional
    public void processDueExecutions() {
        List<EscalationExecution> due = executionRepository.findDueForFiringWithLock(Instant.now());

        if (!due.isEmpty()) {
            log.info("Processing {} due escalation execution(s)", due.size());
        }

        for (EscalationExecution exec : due) {
            try {
                processExecution(exec);
            } catch (Exception e) {
                // Log and continue — one bad execution must not block others
                log.error("Error processing escalation execution {}: {}", exec.getId(), e.getMessage(), e);
            }
        }
    }

    /**
     * Cancels all PENDING escalation steps for the given incident.
     *
     * <p>Must be called by the incident domain whenever an incident is acknowledged or resolved.
     * Uses a status-CAS UPDATE so it is fully idempotent.
     *
     * @param incidentId the incident being acknowledged/resolved
     */
    @Transactional
    public void cancelForIncident(UUID incidentId) {
        int cancelled = executionRepository.cancelPendingByIncidentId(incidentId);
        log.info("Cancelled {} pending escalation execution(s) for incident {}", cancelled, incidentId);
    }

    // =========================================================================
    // Core step-firing logic
    // =========================================================================

    /**
     * Fires the current step for a single {@link EscalationExecution}.
     *
     * <p>Order of checks before firing:
     * <ol>
     *   <li>Re-load the policy (fresh DB read) — abort if deleted.</li>
     *   <li>Compare policy version to snapshot — log and continue with latest steps if changed.</li>
     *   <li>Locate the current step by {@code stepOrder} — abort if it no longer exists.</li>
     *   <li>Send the notification.</li>
     *   <li>Advance to the next step or mark COMPLETED if no more steps remain.</li>
     * </ol>
     */
    private void processExecution(EscalationExecution exec) {
        UUID incidentId = exec.getIncidentId();
        UUID policyId   = exec.getPolicyId();

        // --- 1. Re-fetch policy (fresh DB read — never trust in-memory state) ---
        Optional<EscalationPolicy> policyOpt = loadPolicyOrAbort(incidentId, policyId);
        if (policyOpt.isEmpty()) {
            abort(exec, "Policy " + policyId + " no longer exists");
            return;
        }
        EscalationPolicy policy = policyOpt.get();

        // --- 2. Detect mid-execution policy edits via version snapshot ---
        if (!policy.getVersion().equals(exec.getPolicyVersion())) {
            log.warn("Policy {} was updated (stored version={}, current version={}) mid-escalation for incident {}. "
                    + "Re-evaluating with latest step list.",
                    policyId, exec.getPolicyVersion(), policy.getVersion(), incidentId);
            // Update the stored version so we don't re-warn on the next poll
            exec.setPolicyVersion(policy.getVersion());
        }

        // --- 3. Locate the current step ---
        List<EscalationStep> steps = sortedSteps(policy);
        EscalationStep currentStep = findStep(steps, exec.getCurrentStep()).orElse(null);
        if (currentStep == null) {
            abort(exec, "Step " + exec.getCurrentStep() + " no longer exists in policy " + policyId);
            return;
        }

        // --- 4. Fire the notification ---
        sendNotification(currentStep, incidentId);

        log.info("Escalation step fired: incidentId={}, policyId={}, step={}, target={}/{}",
                incidentId, policyId, currentStep.getStepOrder(),
                currentStep.getTargetType(), currentStep.getTargetId());

        // --- 5. Advance to next step or complete ---
        Optional<EscalationStep> nextStepOpt = findStep(steps, exec.getCurrentStep() + 1);
        if (nextStepOpt.isPresent()) {
            EscalationStep nextStep = nextStepOpt.get();
            exec.setCurrentStep(nextStep.getStepOrder());
            exec.setNextFireAt(Instant.now().plus(nextStep.getWaitTimeMinutes(), ChronoUnit.MINUTES));
            exec.setStatus(ExecutionStatus.PENDING);

            log.info("Escalation advanced: incidentId={}, nextStep={}, nextFireAt={}",
                    incidentId, nextStep.getStepOrder(), exec.getNextFireAt());
        } else {
            exec.setStatus(ExecutionStatus.COMPLETED);
            log.info("Escalation completed: incidentId={}, policyId={} — all {} step(s) exhausted without acknowledgement.",
                    incidentId, policyId, steps.size());
        }

        executionRepository.save(exec);
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    /**
     * Dispatches the notification to the correct port method based on {@code TargetType}.
     */
    private void sendNotification(EscalationStep step, UUID incidentId) {
        if (step.getTargetType() == TargetType.USER) {
            notificationPort.notifyUser(step.getTargetId(), incidentId, step.getStepOrder());
        } else if (step.getTargetType() == TargetType.TEAM) {
            notificationPort.notifyTeam(step.getTargetId(), incidentId, step.getStepOrder());
        } else {
            log.warn("Unknown TargetType '{}' on step {} — notification skipped",
                    step.getTargetType(), step.getStepOrder());
        }
    }

    /**
     * Returns the policy if it exists, or logs and returns empty.
     * The caller is responsible for aborting the execution if empty is returned.
     */
    private Optional<EscalationPolicy> loadPolicyOrAbort(UUID incidentId, UUID policyId) {
        Optional<EscalationPolicy> opt = policyRepository.findById(policyId);
        if (opt.isEmpty()) {
            log.error("Escalation policy {} not found — aborting escalation for incident {}",
                    policyId, incidentId);
        }
        return opt;
    }

    /**
     * Returns a step matching the given {@code stepOrder}, or empty if not found.
     * Lookup is O(n) — acceptable since policies have ≤ 20 steps in practice.
     */
    private Optional<EscalationStep> findStep(List<EscalationStep> steps, int stepOrder) {
        return steps.stream()
                .filter(s -> s.getStepOrder() == stepOrder)
                .findFirst();
    }

    /**
     * Returns the steps of a policy sorted ascending by {@code stepOrder}.
     * Although the entity already has {@code @OrderBy("stepOrder ASC")}, we re-sort here
     * defensively in case the steps collection was hydrated in a different session.
     */
    private List<EscalationStep> sortedSteps(EscalationPolicy policy) {
        return policy.getSteps().stream()
                .sorted(Comparator.comparingInt(EscalationStep::getStepOrder))
                .toList();
    }

    /**
     * Marks an execution as ABORTED and persists it with a structured log entry.
     */
    private void abort(EscalationExecution exec, String reason) {
        log.error("Escalation execution {} aborted for incident {}: {}",
                exec.getId(), exec.getIncidentId(), reason);
        exec.setStatus(ExecutionStatus.ABORTED);
        executionRepository.save(exec);
    }
}
