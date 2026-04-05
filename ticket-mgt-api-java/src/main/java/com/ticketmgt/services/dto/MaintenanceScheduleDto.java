package com.ticketmgt.services.dto;

import com.ticketmgt.services.domain.enums.RepeatsEvery;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class MaintenanceScheduleDto {
    private UUID id;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalTime startTime;

    private LocalDate endDate;
    private LocalTime endTime;

    @NotNull
    private RepeatsEvery repeatsEvery;
}
