package com.ticketmgt.settings.repository;

import com.ticketmgt.settings.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    Page<User> findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCase(String email, String fullName, Pageable pageable);

    Page<User> findByStatus(User.UserStatus status, Pageable pageable);

    Page<User> findByStatusAndEmailContainingIgnoreCaseOrStatusAndFullNameContainingIgnoreCase(
            User.UserStatus status1, String email,
            User.UserStatus status2, String fullName,
            Pageable pageable);
}
