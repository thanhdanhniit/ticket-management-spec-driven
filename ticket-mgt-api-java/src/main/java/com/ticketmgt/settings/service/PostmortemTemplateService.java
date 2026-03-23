package com.ticketmgt.settings.service;

import com.ticketmgt.settings.dto.CreateTemplateRequest;
import com.ticketmgt.settings.dto.PostmortemTemplateDTO;
import com.ticketmgt.settings.entity.PostmortemTemplate;
import com.ticketmgt.settings.exception.ResourceNotFoundException;
import com.ticketmgt.settings.mapper.PostmortemTemplateMapper;
import com.ticketmgt.settings.repository.PostmortemTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostmortemTemplateService {

    private final PostmortemTemplateRepository templateRepository;
    private final PostmortemTemplateMapper templateMapper;

    @Transactional(readOnly = true)
    public List<PostmortemTemplateDTO> listTemplates() {
        return templateMapper.toDtoList(templateRepository.findAll());
    }

    @Transactional
    public void createTemplate(CreateTemplateRequest request) {
        PostmortemTemplate template = PostmortemTemplate.builder()
                .name(request.getName())
                .content(request.getContent())
                .build();
        templateRepository.save(template);
    }

    @Transactional
    public void updateTemplate(UUID id, CreateTemplateRequest request) {
        PostmortemTemplate template = templateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Template not found"));
                
        template.setName(request.getName());
        template.setContent(request.getContent());
        templateRepository.save(template);
    }

    @Transactional
    public void deleteTemplate(UUID id) {
        PostmortemTemplate template = templateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Template not found"));
        templateRepository.delete(template);
    }
}
