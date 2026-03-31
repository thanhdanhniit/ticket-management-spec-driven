package com.ticketmgt.settings.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketmgt.settings.entity.AuditLog;
import com.ticketmgt.settings.entity.User;
import com.ticketmgt.settings.repository.AuditLogRepository;
import com.ticketmgt.settings.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class AuditAspect {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Pointcut("execution(* com.ticketmgt.settings.service.*.create*(..)) || " +
              "execution(* com.ticketmgt.settings.service.*.update*(..)) || " +
              "execution(* com.ticketmgt.settings.service.*.delete*(..)) || " +
              "execution(* com.ticketmgt.settings.service.*.add*(..)) || " +
              "execution(* com.ticketmgt.settings.service.*.remove*(..)) || " +
              "execution(* com.ticketmgt.escalationpolicy.service.*.create*(..)) || " +
              "execution(* com.ticketmgt.escalationpolicy.service.*.update*(..)) || " +
              "execution(* com.ticketmgt.escalationpolicy.service.*.delete*(..))")
    public void auditMethods() {}

    @AfterReturning(pointcut = "auditMethods()", returning = "result")
    public void logAuditAction(JoinPoint joinPoint, Object result) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !(auth.getPrincipal() instanceof UUID userId)) {
                return;
            }

            User actor = userRepository.findById(userId).orElse(null);
            if (actor == null) return;

            String methodName = joinPoint.getSignature().getName();
            String action = camelCaseToSnakeCase(methodName).toUpperCase();
            
            // Determine "Actee" (What was acted upon)
            // Typically the first argument if it's a String/UUID/Name, or the result if it's an entity
            String actee = determineActee(joinPoint, result);

            // Capture details
            Map<String, Object> details = new HashMap<>();
            details.put("method", methodName);
            details.put("args", joinPoint.getArgs());
            String detailsJson = objectMapper.writeValueAsString(details);

            AuditLog logEntry = AuditLog.builder()
                    .timestamp(LocalDateTime.now())
                    .actorName(actor.getFullName())
                    .actorEmail(actor.getEmail())
                    .action(action)
                    .actee(actee)
                    .details(detailsJson)
                    .build();

            auditLogRepository.save(logEntry);
            log.debug("Audit log saved for action: {}", action);

        } catch (Exception e) {
            log.error("Failed to record audit log", e);
        }
    }

    private String determineActee(JoinPoint joinPoint, Object result) {
        Object[] args = joinPoint.getArgs();
        if (args.length > 0) {
            // If the first arg is a UUID or String (like teamId or email), use it as actee
            if (args[0] instanceof UUID || args[0] instanceof String) {
                return args[0].toString();
            }
        }
        return "N/A";
    }

    private String camelCaseToSnakeCase(String str) {
        return str.replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
    }
}
