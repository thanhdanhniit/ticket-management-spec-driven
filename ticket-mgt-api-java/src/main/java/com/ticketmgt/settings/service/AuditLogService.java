package com.ticketmgt.settings.service;

import com.ticketmgt.settings.dto.AuditLogListResponse;
import com.ticketmgt.settings.entity.AuditLog;
import com.ticketmgt.settings.mapper.AuditLogMapper;
import com.ticketmgt.settings.repository.AuditLogRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AuditLogMapper auditLogMapper;

    @Transactional(readOnly = true)
    public AuditLogListResponse listLogs(int page, int size, String sort, String actee, String actor, String action, String startTime, String endTime) {
        Pageable pageable = createPageable(page, size, sort);

        Specification<AuditLog> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (actee != null && !actee.isEmpty()) predicates.add(cb.equal(root.get("actee"), actee));
            if (actor != null && !actor.isEmpty()) predicates.add(cb.equal(root.get("actorName"), actor));
            if (action != null && !action.isEmpty()) predicates.add(cb.equal(root.get("action"), action));
            
            if (startTime != null && !startTime.isEmpty()) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("timestamp"), LocalDateTime.parse(startTime, DateTimeFormatter.ISO_DATE_TIME)));
            }
            if (endTime != null && !endTime.isEmpty()) {
                predicates.add(cb.lessThanOrEqualTo(root.get("timestamp"), LocalDateTime.parse(endTime, DateTimeFormatter.ISO_DATE_TIME)));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<AuditLog> logs = auditLogRepository.findAll(spec, pageable);

        return AuditLogListResponse.builder()
                .content(auditLogMapper.toDtoList(logs.getContent()))
                .totalElements(logs.getTotalElements())
                .totalPages(logs.getTotalPages())
                .build();
    }

    private Pageable createPageable(int page, int size, String sortParam) {
        if (sortParam != null && sortParam.contains(",")) {
            String[] parts = sortParam.split(",");
            Sort.Direction direction = Sort.Direction.fromString(parts[1]);
            return PageRequest.of(page, size, Sort.by(direction, parts[0]));
        }
        return PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp")); // Default sort
    }
}
