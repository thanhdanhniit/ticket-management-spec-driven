package com.ticketmgt.services.dto;

import jakarta.validation.Valid;
import lombok.Data;

import java.util.List;

@Data
public class FeatureTagsUpdateRequest {
    @Valid
    private List<TagDTO> tags;
}
