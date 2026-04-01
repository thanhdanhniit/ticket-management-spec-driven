package com.ticketmgt.escalationpolicy.engine;

import java.util.UUID;

/**
 * Port (interface) for sending escalation notifications.
 *
 * <p>Decouples the execution engine from the notification transport (email, PagerDuty,
 * SMS, Slack, etc.). The concrete adapter is plugged in at runtime via Spring's DI.
 *
 * <p>Implementations must be idempotent — the engine may call {@code notifyUser} or
 * {@code notifyTeam} more than once in failure/retry scenarios.
 */
public interface EscalationNotificationPort {

    /**
     * Sends an escalation notification to a single user.
     *
     * @param userId     UUID of the user (from the settings domain)
     * @param incidentId UUID of the escalating incident
     * @param stepOrder  1-based step number, used for notification context ("Step 2 of 3")
     */
    void notifyUser(UUID userId, UUID incidentId, int stepOrder);

    /**
     * Fans out escalation notifications to all members of a team.
     *
     * @param teamId     UUID of the target team (from the settings domain)
     * @param incidentId UUID of the escalating incident
     * @param stepOrder  1-based step number
     */
    void notifyTeam(UUID teamId, UUID incidentId, int stepOrder);
}
