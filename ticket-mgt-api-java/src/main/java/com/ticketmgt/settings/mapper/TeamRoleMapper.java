package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.TeamRoleDTO;
import com.ticketmgt.settings.entity.TeamRole;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = JsonMapper.class)
public interface TeamRoleMapper {

    TeamRoleDTO toDto(TeamRole teamRole);

    List<TeamRoleDTO> toDtoList(List<TeamRole> teamRoles);
}
