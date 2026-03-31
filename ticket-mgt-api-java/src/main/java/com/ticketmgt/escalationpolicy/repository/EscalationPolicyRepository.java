package com.ticketmgt.escalationpolicy.repository;

import com.ticketmgt.escalationpolicy.entity.EscalationPolicy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EscalationPolicyRepository extends JpaRepository<EscalationPolicy, UUID> {

    /**
     * Searches policies by name containing the search term (case-insensitive).
     * Supports the live search bar in the List UI view.
     */
    @Query("SELECT p FROM EscalationPolicy p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<EscalationPolicy> findByNameContainingIgnoreCase(@Param("search") String search, Pageable pageable);

    /**
     * Returns all policies with pagination when no search term is present.
     */
    Page<EscalationPolicy> findAll(Pageable pageable);

}
