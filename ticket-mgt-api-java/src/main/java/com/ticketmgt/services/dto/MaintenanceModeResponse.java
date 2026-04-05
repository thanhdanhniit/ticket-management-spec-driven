package com.ticketmgt.services.dto;

import lombok.Data;

import java.util.List;

@Data
public class MaintenanceModeResponse {
    private Boolean maintenanceEnabled;
    private List<MaintenanceScheduleDto> schedules;
}
