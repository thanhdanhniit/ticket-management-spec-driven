package com.ticketmgt.escalationpolicy.dto;

import com.ticketmgt.escalationpolicy.config.ValidTargetType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EscalationPolicyMutationRequest {

    @NotBlank(message = "Policy name is required")
    private String name;

    private String description;

    @NotNull(message = "Escalation steps are required")
    @Size(min = 1, message = "At least one escalation step is required")
    @Valid
    private List<EscalationStepRequest> steps;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EscalationStepRequest {

        @NotNull(message = "Wait time is required")
        private Integer waitTimeMinutes;

        @NotNull(message = "Target ID is required")
        private UUID targetId;

        @ValidTargetType
        @NotBlank(message = "Target type is required")
        private String targetType;
    }
}
