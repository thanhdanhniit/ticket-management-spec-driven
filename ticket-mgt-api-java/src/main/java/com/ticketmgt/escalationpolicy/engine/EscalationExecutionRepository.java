package com.ticketmgt.escalationpolicy.engine;

import com.ticketmgt.escalationpolicy.engine.EscalationExecution.ExecutionStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface EscalationExecutionRepository extends JpaRepository<EscalationExecution, UUID> {

    /**
     * Finds all executions whose {@code nextFireAt} is in the past and are still PENDING.
     *
     * <p>Uses {@code PESSIMISTIC_WRITE} (translates to {@code SELECT ... FOR UPDATE SKIP LOCKED}
     * in MySQL 8+) to guarantee that in a multi-node deployment only ONE scheduler thread
     * processes each row — preventing double-fire.
     *
     * @param now current UTC time supplied by the scheduler
     * @return locked batch of due executions
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
            SELECT e FROM EscalationExecution e
            WHERE e.nextFireAt <= :now
              AND e.status = 'PENDING'
            ORDER BY e.nextFireAt ASC
            """)
    List<EscalationExecution> findDueForFiringWithLock(@Param("now") Instant now);

    /**
     * Cancels all PENDING executions for a given incident.
     *
     * <p>Called by the incident domain when an incident is acknowledged or resolved.
     * The {@code int} return value is the count of affected rows — if 0, the execution
     * was already terminal (idempotent).
     *
     * @param incidentId the incident being acknowledged/resolved
     * @return number of executions cancelled
     */
    @Modifying
    @Query("""
            UPDATE EscalationExecution e
            SET e.status = 'CANCELLED'
            WHERE e.incidentId = :incidentId
              AND e.status = 'PENDING'
            """)
    int cancelPendingByIncidentId(@Param("incidentId") UUID incidentId);

    /**
     * Checks whether a PENDING execution already exists for this incident.
     * Used to enforce idempotent {@link EscalationExecutionEngine#startEscalation} calls.
     */
    boolean existsByIncidentIdAndStatus(UUID incidentId, ExecutionStatus status);
}
