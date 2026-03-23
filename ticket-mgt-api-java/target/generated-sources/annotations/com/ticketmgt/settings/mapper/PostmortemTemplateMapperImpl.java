package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.PostmortemTemplateDTO;
import com.ticketmgt.settings.entity.PostmortemTemplate;
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
public class PostmortemTemplateMapperImpl implements PostmortemTemplateMapper {

    @Override
    public PostmortemTemplateDTO toDto(PostmortemTemplate template) {
        if ( template == null ) {
            return null;
        }

        PostmortemTemplateDTO.PostmortemTemplateDTOBuilder postmortemTemplateDTO = PostmortemTemplateDTO.builder();

        postmortemTemplateDTO.content( template.getContent() );
        postmortemTemplateDTO.id( template.getId() );
        postmortemTemplateDTO.name( template.getName() );

        return postmortemTemplateDTO.build();
    }

    @Override
    public List<PostmortemTemplateDTO> toDtoList(List<PostmortemTemplate> templates) {
        if ( templates == null ) {
            return null;
        }

        List<PostmortemTemplateDTO> list = new ArrayList<PostmortemTemplateDTO>( templates.size() );
        for ( PostmortemTemplate postmortemTemplate : templates ) {
            list.add( toDto( postmortemTemplate ) );
        }

        return list;
    }
}
