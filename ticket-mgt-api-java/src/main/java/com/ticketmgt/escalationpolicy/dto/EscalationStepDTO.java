package com.ticketmgt.escalationpolicy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EscalationStepDTO {
    private UUID id;
    private Integer stepOrder;
    private Integer waitTimeMinutes;
    private UUID targetId;
    private String targetType;
    private String targetName; // Enriched via service
}
