package com.ticketmgt.services.dto;

import lombok.Data;

import java.util.List;

@Data
public class ServicePageResponse {
    private List<ServiceResponse> content;
    private Integer totalPages;
    private Long totalElements;
    private Integer size;
    private Integer number;
}
