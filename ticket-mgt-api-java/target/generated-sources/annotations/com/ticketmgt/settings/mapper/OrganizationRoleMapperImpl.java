package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.OrganizationRoleDTO;
import com.ticketmgt.settings.entity.OrganizationRole;
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
public class OrganizationRoleMapperImpl implements OrganizationRoleMapper {

    @Autowired
    private JsonMapper jsonMapper;

    @Override
    public OrganizationRoleDTO toDto(OrganizationRole role) {
        if ( role == null ) {
            return null;
        }

        OrganizationRoleDTO.OrganizationRoleDTOBuilder organizationRoleDTO = OrganizationRoleDTO.builder();

        organizationRoleDTO.id( role.getId() );
        organizationRoleDTO.name( role.getName() );
        organizationRoleDTO.permissions( jsonMapper.asMap( role.getPermissions() ) );

        return organizationRoleDTO.build();
    }

    @Override
    public OrganizationRole toEntity(OrganizationRoleDTO dto) {
        if ( dto == null ) {
            return null;
        }

        OrganizationRole.OrganizationRoleBuilder organizationRole = OrganizationRole.builder();

        organizationRole.id( dto.getId() );
        organizationRole.name( dto.getName() );
        organizationRole.permissions( jsonMapper.asString( dto.getPermissions() ) );

        return organizationRole.build();
    }

    @Override
    public List<OrganizationRoleDTO> toDtoList(List<OrganizationRole> roles) {
        if ( roles == null ) {
            return null;
        }

        List<OrganizationRoleDTO> list = new ArrayList<OrganizationRoleDTO>( roles.size() );
        for ( OrganizationRole organizationRole : roles ) {
            list.add( toDto( organizationRole ) );
        }

        return list;
    }
}
