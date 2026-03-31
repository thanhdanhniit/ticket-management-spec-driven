package com.ticketmgt.escalationpolicy.controller;

import com.ticketmgt.escalationpolicy.dto.EscalationPolicyDTO;
import com.ticketmgt.escalationpolicy.dto.EscalationPolicyListResponse;
import com.ticketmgt.escalationpolicy.dto.EscalationPolicyMutationRequest;
import com.ticketmgt.escalationpolicy.service.EscalationPolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * REST controller for Escalation Policy management.
 * Endpoints follow the API contract defined in
 * specs/escalation-policies-api-spec.yaml.
 */
@RestController
@RequestMapping("/v1/escalation-policies")
@RequiredArgsConstructor
public class EscalationPolicyController {

    private final EscalationPolicyService service;

    /**
     * GET /api/v1/escalation-policies
     * Paginated list with optional live search.
     * Powers the main list view and the search bar from the UI spec.
     */
    @GetMapping
    public EscalationPolicyListResponse listPolicies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name,asc") String sort,
            @RequestParam(required = false) String search) {
        return service.listPolicies(page, size, sort, search);
    }

    /**
     * GET /api/v1/escalation-policies/{id}
     * Fetches a single policy pre-populating the Edit overlay with its full
     * configuration.
     */
    @GetMapping("/{id}")
    public EscalationPolicyDTO getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    /**
     * POST /api/v1/escalation-policies
     * Creates a new policy from the Add overlay form submission.
     * 
     * @Valid enforces: name required, steps array minItems=1, each step has a
     *        targetId.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EscalationPolicyDTO createPolicy(@Valid @RequestBody EscalationPolicyMutationRequest request) {
        return service.createPolicy(request);
    }

    /**
     * PUT /api/v1/escalation-policies/{id}
     * Updates an existing policy from the Edit overlay form submission.
     * Steps are fully replaced (not patched) to support re-ordering and deletion.
     */
    @PutMapping("/{id}")
    public EscalationPolicyDTO updatePolicy(
            @PathVariable UUID id,
            @Valid @RequestBody EscalationPolicyMutationRequest request) {
        return service.updatePolicy(id, request);
    }

    /**
     * DELETE /api/v1/escalation-policies/{id}
     * Row action delete. Returns 409 Conflict if the policy is assigned to an
     * active service.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePolicy(@PathVariable UUID id) {
        service.deletePolicy(id);
    }
}
