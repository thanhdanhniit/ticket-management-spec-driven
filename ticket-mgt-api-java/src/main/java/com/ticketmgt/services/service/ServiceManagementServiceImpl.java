package com.ticketmgt.services.service;

import com.ticketmgt.services.domain.MaintenanceScheduleEntity;
import com.ticketmgt.services.domain.ServiceEntity;
import com.ticketmgt.services.domain.Tag;
import com.ticketmgt.services.dto.*;
import com.ticketmgt.services.mapper.ServiceMapper;
import com.ticketmgt.services.repository.ServiceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceManagementServiceImpl implements ServiceManagementService {

    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional(readOnly = true)
    public ServicePageResponse getServices(String search, String ownerIds, Pageable pageable) {
        log.info("Fetching services with search:[{}] and ownerIds:[{}]", search, ownerIds);
        
        Specification<ServiceEntity> spec = Specification.where(null);
        
        if (search != null && !search.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> 
                    cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"));
        }
        
        if (ownerIds != null && !ownerIds.trim().isEmpty()) {
            List<UUID> owners = Arrays.stream(ownerIds.split(","))
                    .map(String::trim)
                    .map(UUID::fromString)
                    .collect(Collectors.toList());
            if (!owners.isEmpty()) {
                spec = spec.and((root, query, cb) -> root.get("ownerId").in(owners));
            }
        }

        Page<ServiceEntity> page = serviceRepository.findAll(spec, pageable);
        return serviceMapper.toPageResponse(page);
    }

    @Override
    @Transactional
    public ServiceResponse createService(ServiceCreateRequest request) {
        log.info("Creating new service with name: {}", request.getName());
        
        if (serviceRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Service name already exists");
        }

        ServiceEntity entity = new ServiceEntity();
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        entity.setOwnerId(request.getOwnerId());
        entity.setEscalationPolicyId(request.getEscalationPolicyId());

        ServiceEntity saved = serviceRepository.save(entity);
        log.info("Service created with ID: {}", saved.getId());

        return serviceMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "serviceDetails", key = "#id")
    public ServiceResponse getServiceById(UUID id) {
        log.info("Fetching service details for ID: {}", id);
        ServiceEntity entity = findServiceOrThrow(id);
        return serviceMapper.toResponse(entity);
    }

    @Override
    @Transactional
    @CacheEvict(value = "serviceDetails", key = "#id")
    public ServiceResponse updateService(UUID id, ServiceUpdateRequest request) {
        log.info("Updating service details for ID: {}", id);
        ServiceEntity entity = findServiceOrThrow(id);

        if (request.getName() != null && !request.getName().equals(entity.getName())) {
            if (serviceRepository.existsByName(request.getName())) {
                throw new IllegalArgumentException("Service name already exists");
            }
            entity.setName(request.getName());
        }

        if (request.getDescription() != null) entity.setDescription(request.getDescription());
        if (request.getOwnerId() != null) entity.setOwnerId(request.getOwnerId());
        if (request.getEscalationPolicyId() != null) entity.setEscalationPolicyId(request.getEscalationPolicyId());

        return serviceMapper.toResponse(serviceRepository.save(entity));
    }

    @Override
    @Transactional
    @CacheEvict(value = "serviceDetails", key = "#id")
    public void deleteService(UUID id) {
        log.info("Deleting service ID: {}", id);
        if (!serviceRepository.existsById(id)) {
            throw new EntityNotFoundException("Service not found");
        }
        serviceRepository.deleteById(id);
    }

    @Override
    @Transactional
    @CacheEvict(value = "serviceDetails", key = "#id")
    public List<TagDTO> updateServiceTags(UUID id, List<TagDTO> dtos) {
        log.info("Updating tags for service ID: {}", id);
        ServiceEntity entity = findServiceOrThrow(id);
        
        // Complete replacement to match batch logic from UI payload natively.
        List<Tag> newTags = serviceMapper.toTagEntityList(dtos);
        entity.setTags(newTags);
        
        ServiceEntity saved = serviceRepository.save(entity);
        return serviceMapper.toTagDtoList(saved.getTags());
    }

    @Override
    @Transactional
    @CacheEvict(value = "serviceDetails", key = "#id")
    public MaintenanceModeResponse updateMaintenanceMode(UUID id, MaintenanceModeUpdateRequest request) {
        log.info("Updating maintenance mode for service ID: {}", id);
        ServiceEntity entity = findServiceOrThrow(id);
        
        entity.setMaintenanceEnabled(request.getMaintenanceEnabled());
        
        // Clear all arrays allowing complete array rewrite mimicking specific PUT behavior explicitly.
        entity.getMaintenanceSchedules().clear();
        
        if (Boolean.TRUE.equals(request.getMaintenanceEnabled()) && request.getSchedules() != null) {
            for (MaintenanceScheduleDto dto : request.getSchedules()) {
                MaintenanceScheduleEntity schedule = serviceMapper.toMaintenanceScheduleEntity(dto);
                entity.addMaintenanceSchedule(schedule);
            }
        }
        
        ServiceEntity saved = serviceRepository.save(entity);
        return serviceMapper.toMaintenanceModeResponse(saved);
    }

    private ServiceEntity findServiceOrThrow(UUID id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Service not found"));
    }
}
