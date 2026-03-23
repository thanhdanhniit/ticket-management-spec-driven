package com.ticketmgt.settings.security;

import com.ticketmgt.settings.dto.EntityPermissionMatrix;
import com.ticketmgt.settings.entity.TeamMember;
import com.ticketmgt.settings.entity.TeamRole;
import com.ticketmgt.settings.entity.User;
import com.ticketmgt.settings.mapper.JsonMapper;
import com.ticketmgt.settings.repository.TeamMemberRepository;
import com.ticketmgt.settings.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;

/**
 * Custom Method Security Expression Root Bean for evaluating dynamic JSON matrices.
 * Usage Example: @PreAuthorize("@permissionChecker.hasOrgPermission(authentication, 'users', 'create')")
 */
@Component("permissionChecker")
@RequiredArgsConstructor
public class PermissionChecker {

    private final UserRepository userRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final JsonMapper jsonMapper;

    public boolean hasOrgPermission(Authentication authentication, String entityFeature, String capability) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UUID userId)) {
            return false;
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getOrganizationRole() == null || user.getOrganizationRole().getPermissions() == null) {
            return false;
        }

        Map<String, EntityPermissionMatrix> matrix = jsonMapper.asMap(user.getOrganizationRole().getPermissions());
        return evaluateMatrix(matrix, entityFeature, capability);
    }

    public boolean hasTeamPermission(Authentication authentication, UUID teamId, String entityFeature, String capability) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UUID userId)) {
            return false;
        }

        TeamMember member = teamMemberRepository.findByTeamIdAndUserId(teamId, userId).orElse(null);
        if (member == null || member.getTeamRoles().isEmpty()) {
            return false;
        }

        for (TeamRole role : member.getTeamRoles()) {
            if (role.getPermissions() != null) {
                Map<String, EntityPermissionMatrix> matrix = jsonMapper.asMap(role.getPermissions());
                if (evaluateMatrix(matrix, entityFeature, capability)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean evaluateMatrix(Map<String, EntityPermissionMatrix> matrix, String feature, String capability) {
        if (matrix == null || !matrix.containsKey(feature)) {
            return false;
        }
        EntityPermissionMatrix perms = matrix.get(feature);
        if (perms == null) return false;

        return switch (capability.toLowerCase()) {
            case "create" -> perms.isCreate();
            case "read" -> perms.isRead();
            case "update" -> perms.isUpdate();
            case "delete" -> perms.isDelete();
            default -> false;
        };
    }
}
