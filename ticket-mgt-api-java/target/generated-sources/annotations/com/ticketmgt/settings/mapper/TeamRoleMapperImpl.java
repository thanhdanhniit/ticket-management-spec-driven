package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.TeamRoleDTO;
import com.ticketmgt.settings.entity.TeamRole;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-23T19:11:19+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class TeamRoleMapperImpl implements TeamRoleMapper {

    @Autowired
    private JsonMapper jsonMapper;

    @Override
    public TeamRoleDTO toDto(TeamRole teamRole) {
        if ( teamRole == null ) {
            return null;
        }

        TeamRoleDTO.TeamRoleDTOBuilder teamRoleDTO = TeamRoleDTO.builder();

        teamRoleDTO.id( teamRole.getId() );
        teamRoleDTO.name( teamRole.getName() );
        teamRoleDTO.permissions( jsonMapper.asMap( teamRole.getPermissions() ) );

        return teamRoleDTO.build();
    }

    @Override
    public List<TeamRoleDTO> toDtoList(List<TeamRole> teamRoles) {
        if ( teamRoles == null ) {
            return null;
        }

        List<TeamRoleDTO> list = new ArrayList<TeamRoleDTO>( teamRoles.size() );
        for ( TeamRole teamRole : teamRoles ) {
            list.add( toDto( teamRole ) );
        }

        return list;
    }
}
