package com.ticketmgt.services.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class MaintenanceModeUpdateRequest {

    @NotNull
    private Boolean maintenanceEnabled;

    @Valid
    private List<MaintenanceScheduleDto> schedules;
}
