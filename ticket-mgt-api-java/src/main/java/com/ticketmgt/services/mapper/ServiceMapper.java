package com.ticketmgt.services.mapper;

import com.ticketmgt.services.domain.MaintenanceScheduleEntity;
import com.ticketmgt.services.domain.ServiceEntity;
import com.ticketmgt.services.domain.ServiceMetricsEntity;
import com.ticketmgt.services.domain.Tag;
import com.ticketmgt.services.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceMapper {

    @Mapping(target = "owner", ignore = true) // Handled dynamically in service depending on internal APIs
    @Mapping(target = "escalationPolicy", ignore = true) // Handled dynamically
    ServiceResponse toResponse(ServiceEntity entity);

    @Mapping(target = "content", source = "content")
    ServicePageResponse toPageResponse(Page<ServiceEntity> page);

    ServiceMetrics toMetricsDto(ServiceMetricsEntity entity);

    MaintenanceScheduleDto toMaintenanceScheduleDto(MaintenanceScheduleEntity entity);
    MaintenanceScheduleEntity toMaintenanceScheduleEntity(MaintenanceScheduleDto dto);

    TagDTO toTagDto(Tag tag);
    Tag toTagEntity(TagDTO tagDto);

    List<TagDTO> toTagDtoList(List<Tag> tags);
    List<Tag> toTagEntityList(List<TagDTO> dtos);

    List<MaintenanceScheduleDto> toScheduleDtoList(List<MaintenanceScheduleEntity> entities);

    @Mapping(target = "maintenanceEnabled", source = "maintenanceEnabled")
    @Mapping(target = "schedules", source = "maintenanceSchedules")
    MaintenanceModeResponse toMaintenanceModeResponse(ServiceEntity entity);
}
