package com.ticketmgt.services.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketmgt.services.dto.*;
import com.ticketmgt.services.service.ServiceManagementService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ServiceController.class)
@AutoConfigureMockMvc(addFilters = false) // Disables Spring Security filters for pure unit testing
class ServiceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ServiceManagementService serviceManagementService;

    @Test
    @DisplayName("GET /api/v1/services - Should return 200 with paginated content")
    void shouldReturnPaginatedServices() throws Exception {
        // Arrange
        ServicePageResponse response = new ServicePageResponse();
        response.setTotalElements(1L);
        
        given(serviceManagementService.getServices(any(), any(), any(Pageable.class)))
                .willReturn(response);

        // Act & Assert
        mockMvc.perform(get("/api/v1/services")
                        .param("page", "0")
                        .param("size", "20"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    @DisplayName("POST /api/v1/services - Should return 201 on successful creation")
    void shouldCreateService() throws Exception {
        // Arrange
        ServiceCreateRequest request = new ServiceCreateRequest();
        request.setName("Payment Gateway");
        request.setDescription("Handles all payments");

        ServiceResponse response = new ServiceResponse();
        response.setId(UUID.randomUUID());
        response.setName("Payment Gateway");

        given(serviceManagementService.createService(any(ServiceCreateRequest.class)))
                .willReturn(response);

        // Act & Assert
        mockMvc.perform(post("/api/v1/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Payment Gateway"));
    }

    @Test
    @DisplayName("POST /api/v1/services - Should return 400 for invalid payload")
    void shouldReturnBadRequestForInvalidServiceCreationPayload() throws Exception {
        // Arrange
        ServiceCreateRequest request = new ServiceCreateRequest(); // Name is @NotBlank but left null

        // Act & Assert
        mockMvc.perform(post("/api/v1/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /api/v1/services/{id} - Should return 404 when not found")
    void shouldReturnNotFoundForMissingServiceId() throws Exception {
        // Arrange
        UUID id = UUID.randomUUID();
        given(serviceManagementService.getServiceById(id))
                .willThrow(new EntityNotFoundException("Service not found"));

        // Act & Assert
        mockMvc.perform(get("/api/v1/services/{id}", id))
                .andExpect(status().isNotFound()); // The GlobalExceptionHandler handles this mapping
    }

    @Test
    @DisplayName("DELETE /api/v1/services/{id} - Should return 204")
    void shouldReturnNoContentOnDelete() throws Exception {
        // Act & Assert
        mockMvc.perform(delete("/api/v1/services/{id}", UUID.randomUUID()))
                .andExpect(status().isNoContent());
    }
}
