package com.ticketmgt.escalationpolicy.engine;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Scheduled poller that drives the escalation execution engine.
 *
 * <p>Runs every 30 seconds (configurable via {@code escalation.scheduler.fixed-delay-ms}).
 * Uses {@code fixedDelay} rather than {@code fixedRate} to prevent poll overlaps: the next
 * poll only starts 30 seconds after the previous one <em>completes</em>.
 *
 * <p><strong>Timer accuracy</strong>: {@code nextFireAt} stores an absolute UTC timestamp.
 * The 30-second poll cadence means a step can fire up to 30 seconds after its exact due time.
 * For production use with sub-minute SLAs, lower the delay or switch to an external scheduler
 * (e.g., Quartz, AWS EventBridge, or a dedicated cron Lambda).
 *
 * <p><strong>Concurrency safety</strong>: The underlying {@link EscalationExecutionEngine}
 * uses {@code SELECT FOR UPDATE SKIP LOCKED} so multiple scheduler instances across nodes
 * never process the same execution row simultaneously.
 *
 * <h3>Enabling the scheduler</h3>
 * Add {@code @EnableScheduling} to your main application class or any {@code @Configuration}:
 * <pre>{@code
 * @SpringBootApplication
 * @EnableScheduling
 * public class TicketMgtApplication { ... }
 * }</pre>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class EscalationScheduler {

    private final EscalationExecutionEngine engine;

    /**
     * Polls for and fires all due escalation steps.
     *
     * <p>The 30-second delay is intentionally conservative. Adjust
     * {@code escalation.scheduler.fixed-delay-ms} in {@code application.properties} to tune
     * the responsiveness vs. DB load trade-off:
     * <pre>
     * escalation.scheduler.fixed-delay-ms=30000
     * </pre>
     */
    @Scheduled(fixedDelayString = "${escalation.scheduler.fixed-delay-ms:30000}")
    public void poll() {
        log.debug("Escalation scheduler polling for due executions...");
        try {
            engine.processDueExecutions();
        } catch (Exception e) {
            // Catch-all: scheduler thread must never die silently
            log.error("Unexpected error in escalation scheduler poll: {}", e.getMessage(), e);
        }
    }
}
