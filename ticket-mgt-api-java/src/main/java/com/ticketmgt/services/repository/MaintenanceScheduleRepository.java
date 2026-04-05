package com.ticketmgt.services.repository;

import com.ticketmgt.services.domain.MaintenanceScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MaintenanceScheduleRepository extends JpaRepository<MaintenanceScheduleEntity, UUID> {
    List<MaintenanceScheduleEntity> findByServiceId(UUID serviceId);
}
