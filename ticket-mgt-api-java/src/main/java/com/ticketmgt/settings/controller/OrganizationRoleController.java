package com.ticketmgt.settings.controller;

import com.ticketmgt.settings.dto.OrganizationRoleDTO;
import com.ticketmgt.settings.dto.UpdateOrganizationRoleRequest;
import com.ticketmgt.settings.service.OrganizationRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/settings/organization-roles")
@RequiredArgsConstructor
public class OrganizationRoleController {

    private final OrganizationRoleService roleService;

    @GetMapping
    public List<OrganizationRoleDTO> listRoles() {
        return roleService.listRoles();
    }

    @PutMapping("/{id}")
    public void updateRole(@PathVariable java.util.UUID id, @RequestBody UpdateOrganizationRoleRequest request) {
        roleService.updateRolePermissions(id, request);
    }
}
