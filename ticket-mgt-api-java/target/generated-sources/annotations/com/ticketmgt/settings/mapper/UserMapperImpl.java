package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.UserDTO;
import com.ticketmgt.settings.entity.OrganizationRole;
import com.ticketmgt.settings.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-23T19:11:19+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.organizationRole( userOrganizationRoleName( user ) );
        userDTO.email( user.getEmail() );
        userDTO.fullName( user.getFullName() );
        userDTO.id( user.getId() );
        if ( user.getStatus() != null ) {
            userDTO.status( user.getStatus().name() );
        }

        return userDTO.build();
    }

    @Override
    public List<UserDTO> toDtoList(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDTO> list = new ArrayList<UserDTO>( users.size() );
        for ( User user : users ) {
            list.add( toDto( user ) );
        }

        return list;
    }

    private String userOrganizationRoleName(User user) {
        if ( user == null ) {
            return null;
        }
        OrganizationRole organizationRole = user.getOrganizationRole();
        if ( organizationRole == null ) {
            return null;
        }
        String name = organizationRole.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
