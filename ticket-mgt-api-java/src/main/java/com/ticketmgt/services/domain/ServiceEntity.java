package com.ticketmgt.services.domain;

import com.ticketmgt.services.domain.enums.ServiceHealthStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ServiceEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(name = "owner_id")
    private UUID ownerId;

    @Column(name = "escalation_policy_id")
    private UUID escalationPolicyId;

    @Enumerated(EnumType.STRING)
    @Column(name = "health_status", nullable = false)
    @Builder.Default
    private ServiceHealthStatus healthStatus = ServiceHealthStatus.HEALTHY;

    @Column(name = "maintenance_enabled", nullable = false)
    private boolean maintenanceEnabled;

    @JdbcTypeCode(SqlTypes.JSON)
    @Builder.Default
    private List<Tag> tags = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "alert_sources")
    @Builder.Default
    private List<String> alertSources = new ArrayList<>();

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MaintenanceScheduleEntity> maintenanceSchedules = new ArrayList<>();

    @OneToOne(mappedBy = "service", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ServiceMetricsEntity metrics;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void addMaintenanceSchedule(MaintenanceScheduleEntity schedule) {
        maintenanceSchedules.add(schedule);
        schedule.setService(this);
    }

    public void removeMaintenanceSchedule(MaintenanceScheduleEntity schedule) {
        maintenanceSchedules.remove(schedule);
        schedule.setService(null);
    }
}
