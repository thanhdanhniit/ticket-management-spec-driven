package com.ticketmgt.settings.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationRoleDTO {
    private UUID id;
    private String name;
    private boolean isImmutable;
    private Map<String, EntityPermissionMatrix> permissions;
}
