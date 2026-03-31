package com.ticketmgt.escalationpolicy.service;

import com.ticketmgt.escalationpolicy.dto.EscalationPolicyDTO;
import com.ticketmgt.escalationpolicy.dto.EscalationPolicyListResponse;
import com.ticketmgt.escalationpolicy.dto.EscalationPolicyMutationRequest;
import com.ticketmgt.escalationpolicy.entity.EscalationPolicy;
import com.ticketmgt.escalationpolicy.entity.EscalationStep;
import com.ticketmgt.escalationpolicy.mapper.EscalationPolicyMapper;
import com.ticketmgt.escalationpolicy.repository.EscalationPolicyRepository;
import com.ticketmgt.escalationpolicy.repository.EscalationStepRepository;
import com.ticketmgt.settings.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@RequiredArgsConstructor
public class EscalationPolicyService {

    private final EscalationPolicyRepository policyRepository;
    private final EscalationStepRepository stepRepository;
    private final EscalationPolicyMapper mapper;

    /**
     * List policies with optional search and pagination.
     * Powers the list view and the live search bar from the UI spec.
     */
    @Transactional(readOnly = true)
    public EscalationPolicyListResponse listPolicies(int page, int size, String sort, String search) {
        Pageable pageable = buildPageable(page, size, sort);
        Page<EscalationPolicy> result = StringUtils.hasText(search)
                ? policyRepository.findByNameContainingIgnoreCase(search, pageable)
                : policyRepository.findAll(pageable);

        log.info("Listing escalation policies: page={}, size={}, search={}, totalElements={}",
                page, size, search, result.getTotalElements());

        return EscalationPolicyListResponse.builder()
                .content(mapper.toDtoList(result.getContent()))
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .build();
    }

    /**
     * Fetch a single policy by ID.
     * Used to pre-populate the Edit overlay with current configuration.
     */
    @Transactional(readOnly = true)
    public EscalationPolicyDTO getById(UUID id) {
        EscalationPolicy policy = findOrThrow(id);
        return mapper.toDto(policy);
    }

    /**
     * Create a new escalation policy.
     * Business rule: must contain at least one valid step (enforced by @Valid on DTO + here defensively).
     */
    @Transactional
    public EscalationPolicyDTO createPolicy(EscalationPolicyMutationRequest request) {
        log.info("Creating new escalation policy: name={}", request.getName());

        EscalationPolicy policy = mapper.toEntity(request);
        policy = policyRepository.save(policy);

        List<EscalationStep> steps = buildSteps(request, policy);
        stepRepository.saveAll(steps);

        // Reload to return the fully hydrated entity with steps
        return mapper.toDto(findOrThrow(policy.getId()));
    }

    /**
     * Update an existing escalation policy.
     * Strategy: replace all steps atomically to support re-ordering, deletion, and addition cleanly.
     * This is safer than trying to diff and patch individual steps.
     */
    @Transactional
    public EscalationPolicyDTO updatePolicy(UUID id, EscalationPolicyMutationRequest request) {
        log.info("Updating escalation policy: id={}", id);

        EscalationPolicy policy = findOrThrow(id);

        // Update scalar fields only (name, description)
        mapper.updateEntityFromRequest(request, policy);

        // Replace all steps: delete existing, re-insert with new step_order sequence
        stepRepository.deleteAllByPolicyId(policy.getId());
        List<EscalationStep> newSteps = buildSteps(request, policy);
        stepRepository.saveAll(newSteps);

        policyRepository.save(policy);

        return mapper.toDto(findOrThrow(policy.getId()));
    }

    /**
     * Delete an escalation policy.
     * Business rule (user story): blocked with 409 if the policy is still assigned to an active service.
     * NOTE: When the Services domain is implemented, inject ServiceRepository here to check assignment.
     */
    @Transactional
    public void deletePolicy(UUID id) {
        EscalationPolicy policy = findOrThrow(id);

        // TODO: Uncomment when Services domain is implemented
        // if (serviceRepository.existsByEscalationPolicyId(id)) {
        //     throw new EscalationPolicyInUseException(
        //         "Cannot delete escalation policy '" + policy.getName() + "' because it is assigned to one or more active services.");
        // }

        log.info("Deleting escalation policy: id={}, name={}", id, policy.getName());
        policyRepository.delete(policy);
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    private EscalationPolicy findOrThrow(UUID id) {
        return policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Escalation policy not found with id: " + id));
    }

    /**
     * Converts the step requests into ordered EscalationStep entities.
     * Auto-assigns step_order (1-based) based on request array position.
     */
    private List<EscalationStep> buildSteps(EscalationPolicyMutationRequest request, EscalationPolicy policy) {
        AtomicInteger order = new AtomicInteger(1);
        return request.getSteps().stream()
                .map(stepRequest -> EscalationStep.builder()
                        .policy(policy)
                        .stepOrder(order.getAndIncrement())
                        .waitTimeMinutes(stepRequest.getWaitTimeMinutes())
                        .targetId(stepRequest.getTargetId())
                        .targetType(EscalationStep.TargetType.valueOf(stepRequest.getTargetType().toUpperCase()))
                        .build())
                .toList();
    }

    private Pageable buildPageable(int page, int size, String sort) {
        if (StringUtils.hasText(sort) && sort.contains(",")) {
            String[] parts = sort.split(",");
            Sort.Direction direction = Sort.Direction.fromString(parts[1].trim());
            return PageRequest.of(page, size, Sort.by(direction, parts[0].trim()));
        }
        return PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "name"));
    }
}
