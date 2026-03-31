package com.ticketmgt.escalationpolicy.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

/**
 * Cross-cutting request logging filter.
 * Attaches a unique correlation ID (X-Correlation-Id) to every incoming
 * request so that distributed log traces can be linked end-to-end.
 *
 * Applies to all requests hitting the escalation policy API surface.
 */
@Slf4j
@Component
@Order(1)
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final String CORRELATION_ID_HEADER = "X-Correlation-Id";
    private static final String MDC_CORRELATION_KEY = "correlationId";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Use the incoming header if present (from upstream gateway), otherwise generate a new one
        String correlationId = request.getHeader(CORRELATION_ID_HEADER);
        if (correlationId == null || correlationId.isBlank()) {
            correlationId = UUID.randomUUID().toString();
        }

        MDC.put(MDC_CORRELATION_KEY, correlationId);
        response.setHeader(CORRELATION_ID_HEADER, correlationId);

        long startMs = System.currentTimeMillis();
        try {
            log.info("Inbound  {} {} [correlationId={}]",
                    request.getMethod(), request.getRequestURI(), correlationId);
            filterChain.doFilter(request, response);
        } finally {
            long elapsed = System.currentTimeMillis() - startMs;
            log.info("Outbound {} {} [status={}, elapsed={}ms, correlationId={}]",
                    request.getMethod(), request.getRequestURI(),
                    response.getStatus(), elapsed, correlationId);
            MDC.remove(MDC_CORRELATION_KEY);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Skip health checks and H2 console to reduce log noise
        String path = request.getRequestURI();
        return path.startsWith("/actuator") || path.startsWith("/h2-console");
    }
}
