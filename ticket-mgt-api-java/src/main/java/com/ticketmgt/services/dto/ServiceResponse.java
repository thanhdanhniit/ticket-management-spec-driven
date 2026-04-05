package com.ticketmgt.services.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class ServiceResponse {
    private UUID id;
    private String name;
    private String description;
    private OwnerSummary owner;
    private PolicySummary escalationPolicy;
    private List<String> alertSources;
    private List<TagDTO> tags;
    private Boolean maintenanceEnabled;
    private ServiceMetrics metrics;
    private String healthStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
