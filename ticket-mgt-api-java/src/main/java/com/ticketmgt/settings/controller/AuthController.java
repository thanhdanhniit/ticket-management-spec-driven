package com.ticketmgt.settings.controller;

import com.ticketmgt.settings.dto.AuthResponse;
import com.ticketmgt.settings.dto.LoginRequest;
import com.ticketmgt.settings.entity.User;
import com.ticketmgt.shared.exception.BadRequestException;
import com.ticketmgt.settings.mapper.UserMapper;
import com.ticketmgt.settings.repository.UserRepository;
import com.ticketmgt.shared.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/settings/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final UserMapper userMapper;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid credentials");
        }

        if (user.getStatus() != User.UserStatus.ACTIVE) {
            throw new BadRequestException("User account is not active");
        }

        String token = tokenProvider.generateToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(userMapper.toDto(user))
                .build();
    }
}
