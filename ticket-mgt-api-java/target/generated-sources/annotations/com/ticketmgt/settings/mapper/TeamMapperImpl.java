package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.TeamDTO;
import com.ticketmgt.settings.entity.Team;
import com.ticketmgt.settings.entity.User;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-23T19:11:19+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class TeamMapperImpl implements TeamMapper {

    @Override
    public TeamDTO toDto(Team team) {
        if ( team == null ) {
            return null;
        }

        TeamDTO.TeamDTOBuilder teamDTO = TeamDTO.builder();

        teamDTO.defaultUserId( teamDefaultUserId( team ) );
        teamDTO.description( team.getDescription() );
        teamDTO.id( team.getId() );
        teamDTO.name( team.getName() );

        return teamDTO.build();
    }

    @Override
    public List<TeamDTO> toDtoList(List<Team> teams) {
        if ( teams == null ) {
            return null;
        }

        List<TeamDTO> list = new ArrayList<TeamDTO>( teams.size() );
        for ( Team team : teams ) {
            list.add( toDto( team ) );
        }

        return list;
    }

    private UUID teamDefaultUserId(Team team) {
        if ( team == null ) {
            return null;
        }
        User defaultUser = team.getDefaultUser();
        if ( defaultUser == null ) {
            return null;
        }
        UUID id = defaultUser.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
