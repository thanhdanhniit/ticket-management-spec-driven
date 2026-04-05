package com.ticketmgt.settings.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    // Note: Audit logs are immutable and don't strictly need updated_at, so we
    // avoid BaseEntity

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    @Column(name = "actor_name", nullable = false, updatable = false)
    private String actorName;

    @Column(name = "actor_email", nullable = false, updatable = false)
    private String actorEmail;

    @Column(nullable = false, updatable = false)
    private String action;

    @Column(nullable = false, updatable = false)
    private String actee;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json", updatable = false)
    private String details;
}
