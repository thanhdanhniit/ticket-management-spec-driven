package com.ticketmgt.settings.controller;

import com.ticketmgt.settings.dto.CreateTeamRoleRequest;
import com.ticketmgt.settings.dto.TeamRoleDTO;
import com.ticketmgt.settings.dto.UpdateTeamRoleRequest;
import com.ticketmgt.settings.service.TeamRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/settings/teams/{teamId}/roles")
@RequiredArgsConstructor
public class TeamRoleController {

    private final TeamRoleService roleService;

    @GetMapping
    public List<TeamRoleDTO> listRoles(@PathVariable UUID teamId) {
        return roleService.listRoles(teamId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createRole(@PathVariable UUID teamId, @RequestBody CreateTeamRoleRequest request) {
        roleService.createTeamRole(teamId, request);
    }

    @PutMapping("/{roleId}")
    public void updateRole(@PathVariable UUID teamId, @PathVariable UUID roleId, @RequestBody UpdateTeamRoleRequest request) {
        roleService.updateTeamRole(teamId, roleId, request);
    }

    @DeleteMapping("/{roleId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRole(@PathVariable UUID teamId, @PathVariable UUID roleId) {
        roleService.deleteTeamRole(teamId, roleId);
    }
}
