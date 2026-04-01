package com.ticketmgt.escalationpolicy.engine;

import com.ticketmgt.settings.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

/**
 * Represents one live escalation execution bound to an incident.
 *
 * <p>One row is created per incident when escalation is triggered.
 * The scheduler polls this table to fire steps at the right time.
 *
 * <p>Concurrency strategy:
 * <ul>
 *   <li>The scheduler uses {@code SELECT FOR UPDATE SKIP LOCKED} to prevent double-fire.</li>
 *   <li>{@code policyVersion} snapshots the policy version at schedule time; a mismatch
 *       at fire time signals that the policy was edited mid-escalation.</li>
 *   <li>Status transitions enforce a strict state machine to prevent ghost executions.</li>
 * </ul>
 */
@Entity
@Table(
    name = "escalation_executions",
    indexes = {
        @Index(name = "idx_exec_incident_id",  columnList = "incident_id"),
        @Index(name = "idx_exec_next_fire_at", columnList = "next_fire_at"),
        @Index(name = "idx_exec_status",       columnList = "status")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EscalationExecution extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**
     * The incident this execution is tied to.
     * Conceptually a FK — kept as a plain UUID to avoid a cross-domain JPA join.
     */
    @Column(name = "incident_id", nullable = false)
    private UUID incidentId;

    /** The escalation policy that defines the step sequence. */
    @Column(name = "policy_id", nullable = false)
    private UUID policyId;

    /**
     * Snapshot of {@link com.ticketmgt.escalationpolicy.entity.EscalationPolicy#version}
     * at the time this execution was created.
     * Compared at each step fire to detect mid-execution policy edits.
     */
    @Column(name = "policy_version", nullable = false)
    private Integer policyVersion;

    /** 1-based index of the step that will fire next. */
    @Column(name = "current_step", nullable = false)
    private Integer currentStep;

    /**
     * Absolute UTC timestamp after which the next step becomes eligible to fire.
     * Computed as: {@code previousStepFiredAt + currentStep.waitTimeMinutes}.
     *
     * <p>Step 1 always has {@code waitTimeMinutes = 0} so {@code nextFireAt} equals
     * the incident trigger time.
     */
    @Column(name = "next_fire_at", nullable = false)
    private Instant nextFireAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ExecutionStatus status;

    // -------------------------------------------------------------------------
    // State machine
    // -------------------------------------------------------------------------

    public enum ExecutionStatus {
        /**
         * Waiting — the scheduler will fire the next step when {@code nextFireAt} is reached.
         */
        PENDING,

        /**
         * All steps exhausted without acknowledgement.
         */
        COMPLETED,

        /**
         * Incident was acknowledged or resolved before all steps fired.
         * Terminal — the scheduler will ignore rows in this state.
         */
        CANCELLED,

        /**
         * Policy was deleted or the current step no longer exists after a policy edit.
         * Terminal — escalation cannot continue safely.
         */
        ABORTED
    }
}
