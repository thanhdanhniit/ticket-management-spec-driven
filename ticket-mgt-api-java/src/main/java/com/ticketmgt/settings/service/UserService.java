package com.ticketmgt.settings.service;

import com.ticketmgt.settings.dto.AddUsersRequest;
import com.ticketmgt.settings.dto.UserDTO;
import com.ticketmgt.settings.dto.UserListResponse;
import com.ticketmgt.settings.entity.User;
import com.ticketmgt.settings.mapper.UserMapper;
import com.ticketmgt.settings.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public UserListResponse listUsers(int page, int size, String sort, String query, String status) {
        Pageable pageable = createPageable(page, size, sort);
        Page<User> usersPage;

        if (status != null && !status.isEmpty()) {
            User.UserStatus userStatus = User.UserStatus.valueOf(status.toUpperCase());
            if (query != null && !query.isEmpty()) {
                usersPage = userRepository.findByStatusAndEmailContainingIgnoreCaseOrStatusAndFullNameContainingIgnoreCase(
                        userStatus, query, userStatus, query, pageable);
            } else {
                usersPage = userRepository.findByStatus(userStatus, pageable);
            }
        } else if (query != null && !query.isEmpty()) {
            usersPage = userRepository.findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCase(query, query, pageable);
        } else {
            usersPage = userRepository.findAll(pageable);
        }

        return UserListResponse.builder()
                .content(userMapper.toDtoList(usersPage.getContent()))
                .totalElements(usersPage.getTotalElements())
                .totalPages(usersPage.getTotalPages())
                .build();
    }

    @Transactional
    public void addUsers(AddUsersRequest request) {
        // Implement bulk adding/invitation of users using the request payload.
        // Needs BCrypt encoder for password_hash mapping default temp password, 
        // fetching OrgRole, and sending invite emails functionally.
        // Left as stub per basic logic generation
        request.getUsers().forEach(invite -> {
            User user = User.builder()
                    .email(invite.getEmail())
                    .fullName(invite.getEmail().split("@")[0]) // Placeholder logic
                    .passwordHash("tempHash") // Placeholder logic
                    .status(User.UserStatus.INVITATION_PENDING)
                    .build();
            userRepository.save(user);
        });
    }

    private Pageable createPageable(int page, int size, String sortParam) {
        if (sortParam != null && sortParam.contains(",")) {
            String[] parts = sortParam.split(",");
            Sort.Direction direction = Sort.Direction.fromString(parts[1]);
            return PageRequest.of(page, size, Sort.by(direction, parts[0]));
        }
        return PageRequest.of(page, size);
    }
}
