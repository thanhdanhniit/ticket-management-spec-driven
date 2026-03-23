package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.PostmortemTemplateDTO;
import com.ticketmgt.settings.entity.PostmortemTemplate;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostmortemTemplateMapper {

    PostmortemTemplateDTO toDto(PostmortemTemplate template);

    List<PostmortemTemplateDTO> toDtoList(List<PostmortemTemplate> templates);
}
