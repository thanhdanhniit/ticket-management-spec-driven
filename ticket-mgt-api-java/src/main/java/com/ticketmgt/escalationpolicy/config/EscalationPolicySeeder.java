package com.ticketmgt.escalationpolicy.config;

import com.ticketmgt.escalationpolicy.entity.EscalationPolicy;
import com.ticketmgt.escalationpolicy.entity.EscalationStep;
import com.ticketmgt.escalationpolicy.repository.EscalationPolicyRepository;
import com.ticketmgt.escalationpolicy.repository.EscalationStepRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Seeds 2 default escalation policies on startup if the table is empty.
 * Runs after the main DatabaseSeeder (Order 2) so that Users and Teams
 * created by the main seeder are already available as target references.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@Order(2)
public class EscalationPolicySeeder implements CommandLineRunner {

        private final EscalationPolicyRepository policyRepository;
        private final EscalationStepRepository stepRepository;

        @Override
        @Transactional
        public void run(String... args) {
                if (policyRepository.count() > 0) {
                        log.info("Escalation policies already seeded. Skipping.");
                        return;
                }

                log.info("Seeding default escalation policies...");

                seedPolicy1();
                seedPolicy2();

                log.info("Successfully seeded 2 default escalation policies.");
        }

        /**
         * Policy 1: Standard On-Call Escalation
         * Step 1 — Notify the primary on-call engineer immediately (0 min wait).
         * Step 2 — If unacknowledged after 15 min, escalate to the Backend Platform
         * team.
         * Step 3 — If still unacknowledged after 30 min, escalate to the SRE team.
         */
        private void seedPolicy1() {
                EscalationPolicy policy = policyRepository.save(
                                EscalationPolicy.builder()
                                                .name("Standard On-Call Escalation")
                                                .description("Default 3-step escalation: engineer → backend team → SRE team.")
                                                .build());

                stepRepository.saveAll(List.of(
                                EscalationStep.builder()
                                                .policy(policy)
                                                .stepOrder(1)
                                                .waitTimeMinutes(0)
                                                .targetId(UUID.fromString("a9e9d2ef-636e-441d-89b1-af4a739c6f21")) // placeholder:
                                                                                                                   // primary
                                                                                                                   // on-call
                                                                                                                   // user
                                                .targetType(EscalationStep.TargetType.USER)
                                                .build(),
                                EscalationStep.builder()
                                                .policy(policy)
                                                .stepOrder(2)
                                                .waitTimeMinutes(15)
                                                .targetId(UUID.fromString("6dfead2c-4fd5-4678-a891-da828500c56c")) // placeholder:
                                                                                                                   // Backend
                                                                                                                   // Platform
                                                                                                                   // team
                                                .targetType(EscalationStep.TargetType.TEAM)
                                                .build(),
                                EscalationStep.builder()
                                                .policy(policy)
                                                .stepOrder(3)
                                                .waitTimeMinutes(30)
                                                .targetId(UUID.fromString("72d67b44-1b7f-4ad1-8fcc-4a8db0443f7c")) // placeholder:
                                                                                                                   // SRE
                                                                                                                   // team
                                                .targetType(EscalationStep.TargetType.TEAM)
                                                .build()));

                log.info("Seeded policy: '{}'", policy.getName());
        }

        /**
         * Policy 2: Critical Incident Fast-Track
         * Step 1 — Immediately notify the SRE team (0 min wait).
         * Step 2 — After 10 min, escalate directly to the Admin user.
         */
        private void seedPolicy2() {
                EscalationPolicy policy = policyRepository.save(
                                EscalationPolicy.builder()
                                                .name("Critical Incident Fast-Track")
                                                .description("Aggressive 2-step escalation for P0 incidents: SRE team → admin.")
                                                .build());

                stepRepository.saveAll(List.of(
                                EscalationStep.builder()
                                                .policy(policy)
                                                .stepOrder(1)
                                                .waitTimeMinutes(0)
                                                .targetId(UUID.fromString("6dfead2c-4fd5-4678-a891-da828500c56c")) // placeholder:
                                                                                                                   // SRE
                                                                                                                   // team
                                                .targetType(EscalationStep.TargetType.TEAM)
                                                .build(),
                                EscalationStep.builder()
                                                .policy(policy)
                                                .stepOrder(2)
                                                .waitTimeMinutes(10)
                                                .targetId(UUID.fromString("a76788ba-5d2a-4cf6-a002-692a96b266ae")) // placeholder:
                                                                                                                   // admin
                                                                                                                   // user
                                                .targetType(EscalationStep.TargetType.USER)
                                                .build()));

                log.info("Seeded policy: '{}'", policy.getName());
        }
}
