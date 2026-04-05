package com.ticketmgt.services.config;

import com.ticketmgt.services.domain.MaintenanceScheduleEntity;
import com.ticketmgt.services.domain.ServiceEntity;
import com.ticketmgt.services.domain.ServiceMetricsEntity;
import com.ticketmgt.services.domain.Tag;
import com.ticketmgt.services.domain.enums.RepeatsEvery;
import com.ticketmgt.services.domain.enums.ServiceHealthStatus;
import com.ticketmgt.services.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class ServiceDataSeeder {

    private final ServiceRepository serviceRepository;

    @Bean
    public CommandLineRunner initServicesDatabase() {
        return args -> {
            if (serviceRepository.count() == 0) {
                log.info("Services module is empty. Seeding mock initial data...");

                // Service 1: Core API - Healthy with Tags
                ServiceEntity coreApi = new ServiceEntity();
                coreApi.setName("Core API Platform");
                coreApi.setDescription("Main backend routing structure handling mobile and web gateways.");
                coreApi.setOwnerId(UUID.randomUUID());
                coreApi.setEscalationPolicyId(UUID.randomUUID());
                coreApi.setHealthStatus(ServiceHealthStatus.HEALTHY);
                coreApi.setTags(List.of(
                        new Tag("tier", "p1"),
                        new Tag("team", "infrastructure")
                ));
                coreApi.setAlertSources(List.of("Datadog", "AWS Cloudwatch"));
                coreApi.setMaintenanceEnabled(false);
                
                ServiceMetricsEntity coreMetrics = new ServiceMetricsEntity();
                coreMetrics.setOpenIncidentsTriggered(0);
                coreMetrics.setOpenIncidentsAcknowledged(0);
                coreMetrics.setMttaMinutes(5.5);
                coreMetrics.setMttrHours(1.2);
                coreMetrics.setService(coreApi);
                coreApi.setMetrics(coreMetrics);

                // Service 2: Payment Gateway - Maintenance Mode
                ServiceEntity paymentGateway = new ServiceEntity();
                paymentGateway.setName("Stripe Payment Gateway");
                paymentGateway.setDescription("PCI-compliant external transaction processor.");
                paymentGateway.setOwnerId(UUID.randomUUID());
                paymentGateway.setEscalationPolicyId(UUID.randomUUID());
                paymentGateway.setHealthStatus(ServiceHealthStatus.MAINTENANCE);
                paymentGateway.setTags(List.of(
                        new Tag("tier", "p1"),
                        new Tag("compliance", "pci-dss")
                ));
                paymentGateway.setMaintenanceEnabled(true);

                MaintenanceScheduleEntity paymentSchedule = new MaintenanceScheduleEntity();
                paymentSchedule.setStartDate(LocalDate.now());
                paymentSchedule.setStartTime(LocalTime.of(2, 0));
                paymentSchedule.setEndDate(LocalDate.now());
                paymentSchedule.setEndTime(LocalTime.of(4, 0));
                paymentSchedule.setRepeatsEvery(RepeatsEvery.DAILY);
                paymentGateway.addMaintenanceSchedule(paymentSchedule);

                ServiceMetricsEntity paymentMetrics = new ServiceMetricsEntity();
                paymentMetrics.setOpenIncidentsTriggered(0);
                paymentMetrics.setOpenIncidentsAcknowledged(0);
                paymentMetrics.setMttaMinutes(12.0);
                paymentMetrics.setMttrHours(2.5);
                paymentMetrics.setService(paymentGateway);
                paymentGateway.setMetrics(paymentMetrics);

                // Service 3: Legacy Inventory - Degraded
                ServiceEntity legacyInventory = new ServiceEntity();
                legacyInventory.setName("Legacy Inventory System");
                legacyInventory.setDescription("On-premise warehouse syncing engine.");
                legacyInventory.setOwnerId(UUID.randomUUID());
                legacyInventory.setEscalationPolicyId(UUID.randomUUID());
                legacyInventory.setHealthStatus(ServiceHealthStatus.DEGRADED);
                legacyInventory.setTags(List.of(
                        new Tag("tier", "p3"),
                        new Tag("status", "deprecating")
                ));
                legacyInventory.setAlertSources(List.of("Nagios"));
                legacyInventory.setMaintenanceEnabled(false);

                ServiceMetricsEntity legacyMetrics = new ServiceMetricsEntity();
                legacyMetrics.setOpenIncidentsTriggered(2);
                legacyMetrics.setOpenIncidentsAcknowledged(1);
                legacyMetrics.setMttaMinutes(45.0);
                legacyMetrics.setMttrHours(18.0);
                legacyMetrics.setService(legacyInventory);
                legacyInventory.setMetrics(legacyMetrics);

                serviceRepository.saveAll(List.of(coreApi, paymentGateway, legacyInventory));
                log.info("Initialized 3 mock Services (Core API, Payment Gateway, Legacy Inventory).");
            } else {
                log.info("Services module already contains data. Skipping seeder.");
            }
        };
    }
}
