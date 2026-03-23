package com.ticketmgt.settings.controller;

import com.ticketmgt.settings.dto.CreateTemplateRequest;
import com.ticketmgt.settings.dto.PostmortemTemplateDTO;
import com.ticketmgt.settings.service.PostmortemTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/settings/postmortem-templates")
@RequiredArgsConstructor
public class PostmortemTemplateController {

    private final PostmortemTemplateService templateService;

    @GetMapping
    public List<PostmortemTemplateDTO> listTemplates() {
        return templateService.listTemplates();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createTemplate(@RequestBody CreateTemplateRequest request) {
        templateService.createTemplate(request);
    }

    @PutMapping("/{id}")
    public void updateTemplate(@PathVariable UUID id, @RequestBody CreateTemplateRequest request) {
        templateService.updateTemplate(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTemplate(@PathVariable UUID id) {
        templateService.deleteTemplate(id);
    }
}
