package com.ticketmgt.settings.service;

import com.ticketmgt.settings.dto.CreateTeamRoleRequest;
import com.ticketmgt.settings.dto.TeamRoleDTO;
import com.ticketmgt.settings.dto.UpdateTeamRoleRequest;
import com.ticketmgt.settings.entity.Team;
import com.ticketmgt.settings.entity.TeamRole;
import com.ticketmgt.shared.exception.BadRequestException;
import com.ticketmgt.shared.exception.ResourceNotFoundException;
import com.ticketmgt.settings.mapper.JsonMapper;
import com.ticketmgt.settings.mapper.TeamRoleMapper;
import com.ticketmgt.settings.repository.TeamRepository;
import com.ticketmgt.settings.repository.TeamRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamRoleService {

    private final TeamRoleRepository roleRepository;
    private final TeamRepository teamRepository;
    private final TeamRoleMapper roleMapper;
    private final JsonMapper jsonMapper;

    @Transactional(readOnly = true)
    public List<TeamRoleDTO> listRoles(UUID teamId) {
        return roleMapper.toDtoList(roleRepository.findByTeamId(teamId));
    }

    @Transactional
    public void createTeamRole(UUID teamId, CreateTeamRoleRequest request) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        TeamRole role = TeamRole.builder()
                .team(team)
                .name(request.getName())
                .isImmutable(false)
                .permissions(jsonMapper.asString(request.getPermissions()))
                .build();
                
        roleRepository.save(role);
    }

    @Transactional
    public void updateTeamRole(UUID teamId, UUID roleId, UpdateTeamRoleRequest request) {
        TeamRole role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Team role not found"));
                
        if (!role.getTeam().getId().equals(teamId)) {
            throw new BadRequestException("Role does not belong to team");
        }

        if (role.isImmutable()) {
            throw new BadRequestException("Forbidden to edit system-immutable roles");
        }

        role.setName(request.getName());
        role.setPermissions(jsonMapper.asString(request.getPermissions()));
        roleRepository.save(role);
    }

    @Transactional
    public void deleteTeamRole(UUID teamId, UUID roleId) {
        TeamRole role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Team role not found"));

        if (!role.getTeam().getId().equals(teamId)) {
            throw new BadRequestException("Role does not belong to team");
        }

        if (role.isImmutable()) {
            throw new BadRequestException("Forbidden to delete system-immutable roles");
        }

        roleRepository.delete(role);
    }
}
