package com.ticketmgt.services.service;

import com.ticketmgt.services.domain.ServiceEntity;
import com.ticketmgt.services.domain.Tag;
import com.ticketmgt.services.dto.*;
import com.ticketmgt.services.mapper.ServiceMapper;
import com.ticketmgt.services.repository.ServiceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class ServiceManagementServiceImplTest {

    @Mock
    private ServiceRepository serviceRepository;

    @Mock
    private ServiceMapper serviceMapper;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private ServiceManagementServiceImpl serviceManagementService;

    @Test
    @DisplayName("Should successfully create a new service")
    void shouldCreateServiceSuccessfully() {
        // Arrange
        ServiceCreateRequest request = new ServiceCreateRequest();
        request.setName("Web Frontend");
        request.setDescription("Main web application");
        request.setOwnerId(UUID.randomUUID());

        ServiceEntity savedEntity = new ServiceEntity();
        savedEntity.setId(UUID.randomUUID());
        savedEntity.setName("Web Frontend");

        ServiceResponse expectedResponse = new ServiceResponse();
        expectedResponse.setId(savedEntity.getId());
        expectedResponse.setName("Web Frontend");

        given(serviceRepository.existsByName(request.getName())).willReturn(false);
        given(serviceRepository.save(any(ServiceEntity.class))).willReturn(savedEntity);
        given(serviceMapper.toResponse(savedEntity)).willReturn(expectedResponse);

        // Act
        ServiceResponse actualResponse = serviceManagementService.createService(request);

        // Assert
        assertNotNull(actualResponse);
        assertEquals(expectedResponse.getId(), actualResponse.getId());
        assertEquals("Web Frontend", actualResponse.getName());
        then(serviceRepository).should().save(any(ServiceEntity.class));
    }

    @Test
    @DisplayName("Should throw IllegalArgumentException when creating a service with existing name")
    void shouldThrowExceptionWhenCreateServiceWithExistingName() {
        // Arrange
        ServiceCreateRequest request = new ServiceCreateRequest();
        request.setName("Web Frontend");

        given(serviceRepository.existsByName(request.getName())).willReturn(true);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> serviceManagementService.createService(request));
        then(serviceRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    @DisplayName("Should successfully return service when ID exists")
    void shouldReturnServiceWhenIdExists() {
        // Arrange
        UUID serviceId = UUID.randomUUID();
        ServiceEntity entity = new ServiceEntity();
        entity.setId(serviceId);
        entity.setName("API Gateway");

        ServiceResponse expectedResponse = new ServiceResponse();
        expectedResponse.setId(serviceId);
        expectedResponse.setName("API Gateway");

        given(serviceRepository.findById(serviceId)).willReturn(Optional.of(entity));
        given(serviceMapper.toResponse(entity)).willReturn(expectedResponse);

        // Act
        ServiceResponse actualResponse = serviceManagementService.getServiceById(serviceId);

        // Assert
        assertNotNull(actualResponse);
        assertEquals(expectedResponse.getId(), actualResponse.getId());
    }

    @Test
    @DisplayName("Should throw EntityNotFoundException when getting service by non-existent ID")
    void shouldThrowExceptionWhenServiceNotFound() {
        // Arrange
        UUID serviceId = UUID.randomUUID();
        given(serviceRepository.findById(serviceId)).willReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> serviceManagementService.getServiceById(serviceId));
    }

    @Test
    @DisplayName("Should successfully update service tags")
    void shouldUpdateServiceTagsSuccessfully() {
        // Arrange
        UUID serviceId = UUID.randomUUID();
        ServiceEntity entity = new ServiceEntity();
        entity.setId(serviceId);
        entity.setTags(new ArrayList<>());

        List<TagDTO> newTags = List.of(mock(TagDTO.class));
        List<Tag> newTagEntities = List.of(new Tag());

        given(serviceRepository.findById(serviceId)).willReturn(Optional.of(entity));
        given(serviceMapper.toTagEntityList(newTags)).willReturn(newTagEntities);
        given(serviceRepository.save(entity)).willReturn(entity);
        given(serviceMapper.toTagDtoList(newTagEntities)).willReturn(newTags);

        // Act
        List<TagDTO> actualTags = serviceManagementService.updateServiceTags(serviceId, newTags);

        // Assert
        assertNotNull(actualTags);
        assertEquals(newTags.size(), actualTags.size());
        then(serviceRepository).should().save(entity);
    }

    @Test
    @DisplayName("Should successfully delete service")
    void shouldDeleteServiceSuccessfully() {
        // Arrange
        UUID serviceId = UUID.randomUUID();
        given(serviceRepository.existsById(serviceId)).willReturn(true);

        // Act
        serviceManagementService.deleteService(serviceId);

        // Assert
        then(serviceRepository).should().deleteById(serviceId);
    }
}
