package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.TeamDTO;
import com.ticketmgt.settings.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TeamMapper {

    @Mapping(target = "defaultUserId", source = "defaultUser.id")
    TeamDTO toDto(Team team);

    List<TeamDTO> toDtoList(List<Team> teams);
}
