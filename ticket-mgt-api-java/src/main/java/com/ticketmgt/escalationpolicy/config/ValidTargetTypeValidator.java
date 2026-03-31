package com.ticketmgt.escalationpolicy.config;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import com.ticketmgt.escalationpolicy.entity.EscalationStep;

/**
 * Validates that the targetType string in incoming requests is a known enum value.
 * Prevents invalid routing targets being persisted (e.g., "ADMIN", "WEBHOOK").
 */
public class ValidTargetTypeValidator implements ConstraintValidator<ValidTargetType, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) return false;
        try {
            EscalationStep.TargetType.valueOf(value.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
