package com.ticketmgt.settings.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketmgt.settings.dto.EntityPermissionMatrix;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JsonMapper {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, EntityPermissionMatrix> asMap(String json) {
        if (json == null || json.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON to map", e);
        }
    }

    public String asString(Map<String, EntityPermissionMatrix> map) {
        if (map == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing map to JSON", e);
        }
    }
}
