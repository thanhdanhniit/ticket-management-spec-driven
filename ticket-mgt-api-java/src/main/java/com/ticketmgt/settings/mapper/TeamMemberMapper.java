package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.TeamMemberDTO;
import com.ticketmgt.settings.entity.TeamMember;
import com.ticketmgt.settings.entity.TeamRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TeamMemberMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "teamRoles", source = "teamRoles", qualifiedByName = "teamRolesToIds")
    TeamMemberDTO toDto(TeamMember teamMember);

    List<TeamMemberDTO> toDtoList(List<TeamMember> teamMembers);

    @Named("teamRolesToIds")
    default List<UUID> teamRolesToIds(Set<TeamRole> teamRoles) {
        if (teamRoles == null) {
            return null;
        }
        return teamRoles.stream().map(TeamRole::getId).collect(Collectors.toList());
    }
}
