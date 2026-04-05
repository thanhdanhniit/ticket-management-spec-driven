package com.ticketmgt.services.dto;

import com.ticketmgt.services.domain.enums.OwnerType;
import lombok.Data;

import java.util.UUID;

@Data
public class OwnerSummary {
    private UUID id;
    private String name;
    private OwnerType type;
}
