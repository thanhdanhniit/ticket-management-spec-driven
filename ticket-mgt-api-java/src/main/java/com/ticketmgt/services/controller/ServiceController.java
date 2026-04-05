package com.ticketmgt.services.controller;

import com.ticketmgt.services.dto.*;
import com.ticketmgt.services.service.ServiceManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceManagementService serviceManagementService;

    @GetMapping
    public ServicePageResponse getServices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String ownerIds) {

        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));

        return serviceManagementService.getServices(search, ownerIds, pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceResponse createService(@Valid @RequestBody ServiceCreateRequest request) {
        return serviceManagementService.createService(request);
    }

    @GetMapping("/{id}")
    public ServiceResponse getService(@PathVariable UUID id) {
        return serviceManagementService.getServiceById(id);
    }

    @PutMapping("/{id}")
    public ServiceResponse updateService(@PathVariable UUID id, @Valid @RequestBody ServiceUpdateRequest request) {
        return serviceManagementService.updateService(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteService(@PathVariable UUID id) {
        serviceManagementService.deleteService(id);
    }

    @PutMapping("/{id}/tags")
    public List<TagDTO> updateServiceTags(@PathVariable UUID id, @Valid @RequestBody FeatureTagsUpdateRequest request) {
        return serviceManagementService.updateServiceTags(id, request.getTags());
    }

    @PutMapping("/{id}/maintenance-windows")
    public MaintenanceModeResponse updateMaintenanceMode(@PathVariable UUID id, @Valid @RequestBody MaintenanceModeUpdateRequest request) {
        return serviceManagementService.updateMaintenanceMode(id, request);
    }
}
