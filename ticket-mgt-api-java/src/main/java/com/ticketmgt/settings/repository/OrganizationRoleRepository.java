package com.ticketmgt.settings.repository;

import com.ticketmgt.settings.entity.OrganizationRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizationRoleRepository extends JpaRepository<OrganizationRole, UUID> {

    Optional<OrganizationRole> findByName(String name);
}
