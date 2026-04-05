package com.ticketmgt.services.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "service_metrics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ServiceMetricsEntity {

    @Id
    @Column(name = "service_id")
    private UUID serviceId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "service_id")
    private ServiceEntity service;

    @Column(name = "open_incidents_triggered")
    private Integer openIncidentsTriggered;

    @Column(name = "open_incidents_acknowledged")
    private Integer openIncidentsAcknowledged;

    @Column(name = "mtta_minutes")
    private Double mttaMinutes;

    @Column(name = "mttr_hours")
    private Double mttrHours;

    @LastModifiedDate
    @Column(name = "last_calculated_at")
    private LocalDateTime lastCalculatedAt;
}
