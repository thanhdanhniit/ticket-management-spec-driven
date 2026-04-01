package com.ticketmgt.escalationpolicy.engine;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * No-op stub implementation of {@link EscalationNotificationPort}.
 *
 * <p>Active when no real notification adapter is provided on the classpath/context.
 * Logs the notification intent so that the engine can be exercised end-to-end in
 * a development or test environment without external dependencies.
 *
 * <p>Replace this with a real adapter (e.g., {@code PagerDutyNotificationAdapter},
 * {@code SmtpNotificationAdapter}) by providing a bean of type
 * {@link EscalationNotificationPort} in the application context.
 */
@Slf4j
@Component
@ConditionalOnMissingBean(name = "realEscalationNotificationAdapter")
public class LoggingEscalationNotificationAdapter implements EscalationNotificationPort {

    @Override
    public void notifyUser(UUID userId, UUID incidentId, int stepOrder) {
        log.warn("[STUB] Escalation Step {} — notify USER {} for incident {}",
                stepOrder, userId, incidentId);
    }

    @Override
    public void notifyTeam(UUID teamId, UUID incidentId, int stepOrder) {
        log.warn("[STUB] Escalation Step {} — notify TEAM {} for incident {}",
                stepOrder, teamId, incidentId);
    }
}
