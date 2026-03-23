package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.OrganizationRoleDTO;
import com.ticketmgt.settings.entity.OrganizationRole;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = JsonMapper.class)
public interface OrganizationRoleMapper {

    OrganizationRoleDTO toDto(OrganizationRole role);

    OrganizationRole toEntity(OrganizationRoleDTO dto);

    List<OrganizationRoleDTO> toDtoList(List<OrganizationRole> roles);
}
