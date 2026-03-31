package com.ticketmgt.escalationpolicy.entity;

import com.ticketmgt.settings.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "escalation_steps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EscalationStep extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id", nullable = false)
    private EscalationPolicy policy;

    @Column(name = "step_order", nullable = false)
    private Integer stepOrder;

    @Column(name = "wait_time_minutes", nullable = false)
    private Integer waitTimeMinutes;

    /**
     * References a User or Team by UUID from the settings domain.
     */
    @Column(name = "target_id", nullable = false)
    private UUID targetId;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", nullable = false)
    private TargetType targetType;

    public enum TargetType {
        USER, TEAM
    }
}
