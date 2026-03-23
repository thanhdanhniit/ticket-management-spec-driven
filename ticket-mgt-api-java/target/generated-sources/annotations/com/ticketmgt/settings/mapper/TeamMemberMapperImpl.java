package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.TeamMemberDTO;
import com.ticketmgt.settings.entity.TeamMember;
import com.ticketmgt.settings.entity.User;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-23T19:11:19+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class TeamMemberMapperImpl implements TeamMemberMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public TeamMemberDTO toDto(TeamMember teamMember) {
        if ( teamMember == null ) {
            return null;
        }

        TeamMemberDTO.TeamMemberDTOBuilder teamMemberDTO = TeamMemberDTO.builder();

        teamMemberDTO.userId( teamMemberUserId( teamMember ) );
        teamMemberDTO.teamRoles( teamRolesToIds( teamMember.getTeamRoles() ) );
        teamMemberDTO.user( userMapper.toDto( teamMember.getUser() ) );

        return teamMemberDTO.build();
    }

    @Override
    public List<TeamMemberDTO> toDtoList(List<TeamMember> teamMembers) {
        if ( teamMembers == null ) {
            return null;
        }

        List<TeamMemberDTO> list = new ArrayList<TeamMemberDTO>( teamMembers.size() );
        for ( TeamMember teamMember : teamMembers ) {
            list.add( toDto( teamMember ) );
        }

        return list;
    }

    private UUID teamMemberUserId(TeamMember teamMember) {
        if ( teamMember == null ) {
            return null;
        }
        User user = teamMember.getUser();
        if ( user == null ) {
            return null;
        }
        UUID id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
