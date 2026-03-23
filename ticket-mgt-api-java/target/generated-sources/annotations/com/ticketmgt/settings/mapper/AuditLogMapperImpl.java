package com.ticketmgt.settings.mapper;

import com.ticketmgt.settings.dto.AuditLogDTO;
import com.ticketmgt.settings.entity.AuditLog;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-23T19:11:19+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class AuditLogMapperImpl implements AuditLogMapper {

    @Override
    public AuditLogDTO toDto(AuditLog auditLog) {
        if ( auditLog == null ) {
            return null;
        }

        AuditLogDTO.AuditLogDTOBuilder auditLogDTO = AuditLogDTO.builder();

        if ( auditLog.getTimestamp() != null ) {
            auditLogDTO.timestamp( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( auditLog.getTimestamp() ) );
        }
        auditLogDTO.details( jsonStringToMap( auditLog.getDetails() ) );
        auditLogDTO.actee( auditLog.getActee() );
        auditLogDTO.action( auditLog.getAction() );
        auditLogDTO.actorEmail( auditLog.getActorEmail() );
        auditLogDTO.actorName( auditLog.getActorName() );
        auditLogDTO.id( auditLog.getId() );

        return auditLogDTO.build();
    }

    @Override
    public List<AuditLogDTO> toDtoList(List<AuditLog> auditLogs) {
        if ( auditLogs == null ) {
            return null;
        }

        List<AuditLogDTO> list = new ArrayList<AuditLogDTO>( auditLogs.size() );
        for ( AuditLog auditLog : auditLogs ) {
            list.add( toDto( auditLog ) );
        }

        return list;
    }
}
