package com.ticketmgt.settings.repository;

import com.ticketmgt.settings.entity.TeamMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, UUID> {

    Page<TeamMember> findByTeamId(UUID teamId, Pageable pageable);

    @Query("SELECT tm FROM TeamMember tm JOIN tm.user u WHERE tm.team.id = :teamId AND (LOWER(u.fullName) LIKE LOWER(CONCAT('%',:query,'%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%',:query,'%')))")
    Page<TeamMember> searchByTeamIdAndUser(UUID teamId, String query, Pageable pageable);

    Optional<TeamMember> findByTeamIdAndUserId(UUID teamId, UUID userId);
}
