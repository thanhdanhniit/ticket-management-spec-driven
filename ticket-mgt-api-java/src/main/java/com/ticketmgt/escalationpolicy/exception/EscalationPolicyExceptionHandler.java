package com.ticketmgt.escalationpolicy.exception;

import com.ticketmgt.settings.dto.StandardErrorResponse;
import com.ticketmgt.shared.exception.BadRequestException;
import com.ticketmgt.shared.exception.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.stream.Collectors;

@RestControllerAdvice(basePackages = "com.ticketmgt.escalationpolicy")
public class EscalationPolicyExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardErrorResponse> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<StandardErrorResponse> handleBadRequest(BadRequestException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    /**
     * Handles 409 Conflict: escalation policy is in use by an active service.
     * Enforces the protected deletion rule from the user story.
     */
    @ExceptionHandler(EscalationPolicyInUseException.class)
    public ResponseEntity<StandardErrorResponse> handlePolicyInUse(EscalationPolicyInUseException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), request);
    }

    /**
     * Handles @Valid annotation failures — returns field-level validation messages.
     * Enforces: name required, steps minItems=1, targetId required per step.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<StandardErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return buildResponse(HttpStatus.BAD_REQUEST, message, request);
    }

    private ResponseEntity<StandardErrorResponse> buildResponse(HttpStatus status, String message, HttpServletRequest request) {
        StandardErrorResponse body = StandardErrorResponse.builder()
                .timestamp(Instant.now().toString())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(message)
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(body, status);
    }
}
