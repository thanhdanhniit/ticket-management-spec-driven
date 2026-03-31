package com.ticketmgt.escalationpolicy.config;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Annotation to validate that a String value matches a known EscalationStep.TargetType.
 *
 * Usage:
 * <pre>
 *   {@code @ValidTargetType}
 *   private String targetType;
 * </pre>
 */
@Documented
@Constraint(validatedBy = ValidTargetTypeValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTargetType {
    String message() default "Invalid targetType. Must be USER or TEAM.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
