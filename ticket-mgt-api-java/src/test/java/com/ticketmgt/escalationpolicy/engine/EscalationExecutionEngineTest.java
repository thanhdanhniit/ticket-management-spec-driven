package com.ticketmgt.escalationpolicy.engine;

import com.ticketmgt.escalationpolicy.engine.EscalationExecution.ExecutionStatus;
import com.ticketmgt.escalationpolicy.entity.EscalationPolicy;
import com.ticketmgt.escalationpolicy.entity.EscalationStep;
import com.ticketmgt.escalationpolicy.entity.EscalationStep.TargetType;
import com.ticketmgt.escalationpolicy.repository.EscalationPolicyRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link EscalationExecutionEngine}.
 *
 * <p>Strategy: Mock all dependencies (repositories + notification port).
 * Each nested class targets one specific engine concern.
 */
@ExtendWith(MockitoExtension.class)
class EscalationExecutionEngineTest {

    @Mock private EscalationExecutionRepository executionRepository;
    @Mock private EscalationPolicyRepository    policyRepository;
    @Mock private EscalationNotificationPort    notificationPort;

    @InjectMocks
    private EscalationExecutionEngine engine;

    // ------------------------------------------------------------------
    // Test fixtures
    // ------------------------------------------------------------------

    private static final UUID INCIDENT_ID = UUID.randomUUID();
    private static final UUID POLICY_ID   = UUID.randomUUID();
    private static final UUID USER_ID     = UUID.randomUUID();
    private static final UUID TEAM_ID     = UUID.randomUUID();

    /** Builds a policy with the given steps list. */
    private EscalationPolicy buildPolicy(List<EscalationStep> steps) {
        EscalationPolicy policy = new EscalationPolicy();
        policy.setId(POLICY_ID);
        policy.setName("Test Policy");
        policy.setVersion(0);
        policy.setSteps(steps);
        return policy;
    }

    /** Builds a single step. */
    private EscalationStep buildStep(int order, int waitMinutes, UUID targetId, TargetType type) {
        EscalationStep step = new EscalationStep();
        step.setId(UUID.randomUUID());
        step.setStepOrder(order);
        step.setWaitTimeMinutes(waitMinutes);
        step.setTargetId(targetId);
        step.setTargetType(type);
        return step;
    }

    /** Builds a PENDING execution at step 1. */
    private EscalationExecution pendingExecution(int currentStep) {
        EscalationExecution exec = new EscalationExecution();
        exec.setId(UUID.randomUUID());
        exec.setIncidentId(INCIDENT_ID);
        exec.setPolicyId(POLICY_ID);
        exec.setPolicyVersion(0);
        exec.setCurrentStep(currentStep);
        exec.setNextFireAt(Instant.now().minusSeconds(1)); // already due
        exec.setStatus(ExecutionStatus.PENDING);
        return exec;
    }

    // ==================================================================
    // 1. startEscalation
    // ==================================================================

    @Nested
    @DisplayName("startEscalation()")
    class StartEscalation {

        @Test
        @DisplayName("Creates PENDING execution for step 1 with correct nextFireAt")
        void shouldCreatePendingExecution() {
            EscalationStep step1 = buildStep(1, 0, USER_ID, TargetType.USER);
            EscalationPolicy policy = buildPolicy(List.of(step1));

            when(executionRepository.existsByIncidentIdAndStatus(INCIDENT_ID, ExecutionStatus.PENDING))
                    .thenReturn(false);
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.of(policy));

            engine.startEscalation(INCIDENT_ID, POLICY_ID);

            ArgumentCaptor<EscalationExecution> captor = ArgumentCaptor.forClass(EscalationExecution.class);
            verify(executionRepository).save(captor.capture());

            EscalationExecution saved = captor.getValue();
            assertThat(saved.getIncidentId()).isEqualTo(INCIDENT_ID);
            assertThat(saved.getPolicyId()).isEqualTo(POLICY_ID);
            assertThat(saved.getPolicyVersion()).isEqualTo(0);
            assertThat(saved.getCurrentStep()).isEqualTo(1);
            assertThat(saved.getStatus()).isEqualTo(ExecutionStatus.PENDING);
            // waitTimeMinutes=0 → nextFireAt should be within a few seconds of now
            assertThat(saved.getNextFireAt()).isBeforeOrEqualTo(Instant.now().plusSeconds(2));
        }

        @Test
        @DisplayName("Is idempotent — no duplicate execution created if PENDING already exists")
        void shouldBeIdempotent() {
            when(executionRepository.existsByIncidentIdAndStatus(INCIDENT_ID, ExecutionStatus.PENDING))
                    .thenReturn(true);

            engine.startEscalation(INCIDENT_ID, POLICY_ID);

            verify(executionRepository, never()).save(any());
            verify(policyRepository, never()).findById(any());
        }

        @Test
        @DisplayName("Does not start if policy does not exist")
        void shouldNotStartIfPolicyMissing() {
            when(executionRepository.existsByIncidentIdAndStatus(INCIDENT_ID, ExecutionStatus.PENDING))
                    .thenReturn(false);
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.empty());

            engine.startEscalation(INCIDENT_ID, POLICY_ID);

            verify(executionRepository, never()).save(any());
        }

        @Test
        @DisplayName("Does not start if policy has no steps")
        void shouldNotStartIfPolicyHasNoSteps() {
            EscalationPolicy policy = buildPolicy(new ArrayList<>());
            when(executionRepository.existsByIncidentIdAndStatus(INCIDENT_ID, ExecutionStatus.PENDING))
                    .thenReturn(false);
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.of(policy));

            engine.startEscalation(INCIDENT_ID, POLICY_ID);

            verify(executionRepository, never()).save(any());
        }
    }

    // ==================================================================
    // 2. processDueExecutions — Execution Engine logic
    // ==================================================================

    @Nested
    @DisplayName("processDueExecutions() — Engine logic")
    class ProcessDueExecutions {

        @Test
        @DisplayName("Fires USER notification and advances to next step")
        void shouldFireUserNotificationAndAdvance() {
            EscalationStep step1 = buildStep(1, 0, USER_ID, TargetType.USER);
            EscalationStep step2 = buildStep(2, 15, TEAM_ID, TargetType.TEAM);
            EscalationPolicy policy = buildPolicy(List.of(step1, step2));

            EscalationExecution exec = pendingExecution(1);

            when(executionRepository.findDueForFiringWithLock(any())).thenReturn(List.of(exec));
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.of(policy));

            engine.processDueExecutions();

            // Notification fired for step 1 (USER)
            verify(notificationPort).notifyUser(USER_ID, INCIDENT_ID, 1);
            verify(notificationPort, never()).notifyTeam(any(), any(), anyInt());

            // Execution advanced to step 2
            ArgumentCaptor<EscalationExecution> captor = ArgumentCaptor.forClass(EscalationExecution.class);
            verify(executionRepository).save(captor.capture());
            EscalationExecution saved = captor.getValue();
            assertThat(saved.getCurrentStep()).isEqualTo(2);
            assertThat(saved.getStatus()).isEqualTo(ExecutionStatus.PENDING);
            // nextFireAt must be ~15 minutes in the future
            assertThat(saved.getNextFireAt()).isAfter(Instant.now().plusSeconds(800));
        }

        @Test
        @DisplayName("Fires TEAM notification")
        void shouldFireTeamNotification() {
            EscalationStep step1 = buildStep(1, 0, TEAM_ID, TargetType.TEAM);
            EscalationPolicy policy = buildPolicy(List.of(step1));

            EscalationExecution exec = pendingExecution(1);

            when(executionRepository.findDueForFiringWithLock(any())).thenReturn(List.of(exec));
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.of(policy));

            engine.processDueExecutions();

            verify(notificationPort).notifyTeam(TEAM_ID, INCIDENT_ID, 1);
            verify(notificationPort, never()).notifyUser(any(), any(), anyInt());
        }

        @Test
        @DisplayName("Marks COMPLETED when last step fires")
        void shouldMarkCompletedAfterLastStep() {
            EscalationStep step1 = buildStep(1, 0, USER_ID, TargetType.USER);
            EscalationPolicy policy = buildPolicy(List.of(step1));

            EscalationExecution exec = pendingExecution(1);

            when(executionRepository.findDueForFiringWithLock(any())).thenReturn(List.of(exec));
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.of(policy));

            engine.processDueExecutions();

            ArgumentCaptor<EscalationExecution> captor = ArgumentCaptor.forClass(EscalationExecution.class);
            verify(executionRepository).save(captor.capture());
            assertThat(captor.getValue().getStatus()).isEqualTo(ExecutionStatus.COMPLETED);
        }

        @Test
        @DisplayName("Does nothing when no executions are due")
        void shouldHandleNoDueExecutions() {
            when(executionRepository.findDueForFiringWithLock(any())).thenReturn(List.of());

            engine.processDueExecutions();

            verify(notificationPort, never()).notifyUser(any(), any(), anyInt());
            verify(notificationPort, never()).notifyTeam(any(), any(), anyInt());
            verify(executionRepository, never()).save(any());
        }
    }

    // ==================================================================
    // 3. Incident State Synchronization
    // ==================================================================

    @Nested
    @DisplayName("Incident state synchronization")
    class IncidentStateSynchronization {

        @Test
        @DisplayName("Aborts execution when policy has been deleted mid-escalation")
        void shouldAbortWhenPolicyDeleted() {
            EscalationExecution exec = pendingExecution(2);

            when(executionRepository.findDueForFiringWithLock(any())).thenReturn(List.of(exec));
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.empty());

            engine.processDueExecutions();

            verify(notificationPort, never()).notifyUser(any(), any(), anyInt());
            verify(notificationPort, never()).notifyTeam(any(), any(), anyInt());

            ArgumentCaptor<EscalationExecution> captor = ArgumentCaptor.forClass(EscalationExecution.class);
            verify(executionRepository).save(captor.capture());
            assertThat(captor.getValue().getStatus()).isEqualTo(ExecutionStatus.ABORTED);
        }

        @Test
        @DisplayName("Aborts execution when current step no longer exists in updated policy")
        void shouldAbortWhenStepRemovedByPolicyUpdate() {
            // Policy now only has step 1 — but execution is at step 2 (removed by admin)
            EscalationStep step1 = buildStep(1, 0, USER_ID, TargetType.USER);
            EscalationPolicy policy = buildPolicy(List.of(step1));

            EscalationExecution exec = pendingExecution(2); // points to a now-missing step

            when(executionRepository.findDueForFiringWithLock(any())).thenReturn(List.of(exec));
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.of(policy));

            engine.processDueExecutions();

            verify(notificationPort, never()).notifyUser(any(), any(), anyInt());

            ArgumentCaptor<EscalationExecution> captor = ArgumentCaptor.forClass(EscalationExecution.class);
            verify(executionRepository).save(captor.capture());
            assertThat(captor.getValue().getStatus()).isEqualTo(ExecutionStatus.ABORTED);
        }

        @Test
        @DisplayName("Updates policyVersion snapshot when policy was edited mid-execution")
        void shouldUpdatePolicyVersionSnapshotOnMismatch() {
            // Policy has been updated → version is now 1
            EscalationStep step1 = buildStep(1, 0, USER_ID, TargetType.USER);
            EscalationStep step2 = buildStep(2, 15, TEAM_ID, TargetType.TEAM);
            EscalationPolicy policy = buildPolicy(List.of(step1, step2));
            policy.setVersion(1); // bumped by an updatePolicy() call

            EscalationExecution exec = pendingExecution(1);
            exec.setPolicyVersion(0); // stored version is stale

            when(executionRepository.findDueForFiringWithLock(any())).thenReturn(List.of(exec));
            when(policyRepository.findById(POLICY_ID)).thenReturn(Optional.of(policy));

            engine.processDueExecutions();

            // Engine should continue (not abort) and update the version on the saved exec
            ArgumentCaptor<EscalationExecution> captor = ArgumentCaptor.forClass(EscalationExecution.class);
            verify(executionRepository).save(captor.capture());
            assertThat(captor.getValue().getPolicyVersion()).isEqualTo(1);
            assertThat(captor.getValue().getStatus()).isEqualTo(ExecutionStatus.PENDING);
        }
    }

    // ==================================================================
    // 4. cancelForIncident — concurrency / race: ghost execution prevention
    // ==================================================================

    @Nested
    @DisplayName("cancelForIncident() — ghost execution prevention")
    class CancelForIncident {

        @Test
        @DisplayName("Delegates to repository to cancel pending executions")
        void shouldCancelPendingExecutions() {
            when(executionRepository.cancelPendingByIncidentId(INCIDENT_ID)).thenReturn(1);

            engine.cancelForIncident(INCIDENT_ID);

            verify(executionRepository).cancelPendingByIncidentId(INCIDENT_ID);
        }

        @Test
        @DisplayName("Is idempotent — returns normally even if nothing was cancelled")
        void shouldBeIdempotentWhenNothingToCancel() {
            when(executionRepository.cancelPendingByIncidentId(INCIDENT_ID)).thenReturn(0);

            // Must not throw
            engine.cancelForIncident(INCIDENT_ID);

            verify(executionRepository).cancelPendingByIncidentId(INCIDENT_ID);
        }
    }
}
