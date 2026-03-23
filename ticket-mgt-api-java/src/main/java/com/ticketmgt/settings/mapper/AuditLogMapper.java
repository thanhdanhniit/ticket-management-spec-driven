package com.ticketmgt.settings.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketmgt.settings.dto.AuditLogDTO;
import com.ticketmgt.settings.entity.AuditLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Map;

@Mapper(componentModel = "spring")
public interface AuditLogMapper {

    @Mapping(target = "timestamp", source = "timestamp")
    @Mapping(target = "details", source = "details", qualifiedByName = "jsonStringToMap")
    AuditLogDTO toDto(AuditLog auditLog);

    List<AuditLogDTO> toDtoList(List<AuditLog> auditLogs);

    @Named("jsonStringToMap")
    default Map<String, Object> jsonStringToMap(String json) {
        if (json == null || json.isEmpty()) {
            return null;
        }
        try {
            return new ObjectMapper().readValue(json, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            return null; // Or throw exception based on strictness
        }
    }
}
