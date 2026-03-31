package com.ticketmgt.escalationpolicy.repository;

import com.ticketmgt.escalationpolicy.entity.EscalationStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EscalationStepRepository extends JpaRepository<EscalationStep, UUID> {

    /**
     * Fetches all steps for a given policy, ordered by step_order.
     */
    List<EscalationStep> findByPolicyIdOrderByStepOrderAsc(UUID policyId);

    /**
     * Removes all orphaned steps for a given policy before batch replace during updates.
     */
    @Modifying
    @Query("DELETE FROM EscalationStep s WHERE s.policy.id = :policyId")
    void deleteAllByPolicyId(@Param("policyId") UUID policyId);
}
