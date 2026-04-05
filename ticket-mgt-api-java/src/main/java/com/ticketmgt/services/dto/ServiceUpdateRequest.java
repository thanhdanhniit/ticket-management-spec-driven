package com.ticketmgt.services.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class ServiceUpdateRequest {

    @Size(min = 2, max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    private UUID ownerId;
    private UUID escalationPolicyId;
}
