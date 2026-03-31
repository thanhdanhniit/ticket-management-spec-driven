package com.ticketmgt.escalationpolicy.mapper;

import com.ticketmgt.escalationpolicy.dto.EscalationPolicyDTO;
import com.ticketmgt.escalationpolicy.dto.EscalationPolicyMutationRequest;
import com.ticketmgt.escalationpolicy.dto.EscalationStepDTO;
import com.ticketmgt.escalationpolicy.entity.EscalationPolicy;
import com.ticketmgt.escalationpolicy.entity.EscalationStep;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EscalationPolicyMapper {

    EscalationPolicyDTO toDto(EscalationPolicy policy);

    List<EscalationPolicyDTO> toDtoList(List<EscalationPolicy> policies);

    @Mapping(target = "targetType", source = "targetType")
    EscalationStepDTO stepToDto(EscalationStep step);

    /**
     * Maps the mutation request to a new entity for creation.
     * The id, version, and steps are managed manually in the service layer.
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "steps", ignore = true)
    EscalationPolicy toEntity(EscalationPolicyMutationRequest request);

    /**
     * Updates only the name and description of an existing entity during an update operation.
     * Steps are handled separately for correct orphan removal.
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "steps", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(EscalationPolicyMutationRequest request, @MappingTarget EscalationPolicy policy);
}
