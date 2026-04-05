package com.ticketmgt.services.service;

import com.ticketmgt.services.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ServiceManagementService {
    ServicePageResponse getServices(String search, String ownerIds, Pageable pageable);
    ServiceResponse createService(ServiceCreateRequest request);
    ServiceResponse getServiceById(UUID id);
    ServiceResponse updateService(UUID id, ServiceUpdateRequest request);
    void deleteService(UUID id);
    List<TagDTO> updateServiceTags(UUID id, List<TagDTO> tags);
    MaintenanceModeResponse updateMaintenanceMode(UUID id, MaintenanceModeUpdateRequest request);
}
