package com.ticketmgt.settings.repository;

import com.ticketmgt.settings.entity.PostmortemTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PostmortemTemplateRepository extends JpaRepository<PostmortemTemplate, UUID> {
}
