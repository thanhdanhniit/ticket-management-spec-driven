package com.ticketmgt.settings.service;

import com.ticketmgt.settings.dto.OrganizationRoleDTO;
import com.ticketmgt.settings.dto.UpdateOrganizationRoleRequest;
import com.ticketmgt.settings.entity.OrganizationRole;
import com.ticketmgt.shared.exception.ResourceNotFoundException;
import com.ticketmgt.settings.mapper.JsonMapper;
import com.ticketmgt.settings.mapper.OrganizationRoleMapper;
import com.ticketmgt.settings.repository.OrganizationRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationRoleService {

    private final OrganizationRoleRepository roleRepository;
    private final OrganizationRoleMapper roleMapper;
    private final JsonMapper jsonMapper;

    @Transactional(readOnly = true)
    public List<OrganizationRoleDTO> listRoles() {
        return roleMapper.toDtoList(roleRepository.findAll());
    }

    @Transactional
    public void updateRolePermissions(UUID id, UpdateOrganizationRoleRequest request) {
        OrganizationRole role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization Role not found with ID: " + id));
        
        // Cannot modify immutable roles
        if (role.isImmutable()) {
            throw new IllegalArgumentException("Cannot modify system immutable role.");
        }

        role.setPermissions(jsonMapper.asString(request.getPermissions()));
        roleRepository.save(role);
    }
}
