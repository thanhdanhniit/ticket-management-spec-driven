package com.ticketmgt.services.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class ServiceCreateRequest {

    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    private UUID ownerId;
    private UUID escalationPolicyId;
}
