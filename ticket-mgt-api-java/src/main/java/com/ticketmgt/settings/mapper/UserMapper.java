package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.UserDTO;
import com.ticketmgt.settings.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "organizationRole", source = "organizationRole.name")
    UserDTO toDto(User user);

    List<UserDTO> toDtoList(List<User> users);
}
