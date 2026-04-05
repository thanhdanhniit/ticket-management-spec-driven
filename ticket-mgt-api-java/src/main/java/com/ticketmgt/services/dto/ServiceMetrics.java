package com.ticketmgt.services.dto;

import lombok.Data;

@Data
public class ServiceMetrics {
    private Integer openIncidentsTriggered;
    private Integer openIncidentsAcknowledged;
    private Double mttaMinutes;
    private Double mttrHours;
}
