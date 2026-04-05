package com.ticketmgt.services.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PolicySummary {
    private UUID id;
    private String name;
}
