package com.ticketmgt.settings.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamMemberDTO {
    private UUID userId;
    private UserDTO user;
    private boolean isDefaultUser;
    private List<UUID> teamRoles;
}
