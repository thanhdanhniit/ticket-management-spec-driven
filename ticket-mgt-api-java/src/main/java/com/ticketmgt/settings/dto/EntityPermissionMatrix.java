package com.ticketmgt.settings.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EntityPermissionMatrix {
    private boolean create;
    private boolean read;
    private boolean update;
    private boolean delete;
}
