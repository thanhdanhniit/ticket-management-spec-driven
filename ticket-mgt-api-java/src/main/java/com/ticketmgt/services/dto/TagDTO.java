package com.ticketmgt.services.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TagDTO {
    @NotBlank
    private String key;

    @NotBlank
    private String value;
}
