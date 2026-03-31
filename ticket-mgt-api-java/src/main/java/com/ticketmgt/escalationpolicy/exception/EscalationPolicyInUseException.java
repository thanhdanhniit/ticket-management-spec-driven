package com.ticketmgt.escalationpolicy.exception;

public class EscalationPolicyInUseException extends RuntimeException {
    public EscalationPolicyInUseException(String message) {
        super(message);
    }
}
