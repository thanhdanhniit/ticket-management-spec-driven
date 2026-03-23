package com.ticketmgt.settings.controller;

import com.ticketmgt.settings.dto.AddUsersRequest;
import com.ticketmgt.settings.dto.UserListResponse;
import com.ticketmgt.settings.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/settings/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserListResponse listUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String status) {
        return userService.listUsers(page, size, sort, query, status);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addUsers(@RequestBody AddUsersRequest request) {
        userService.addUsers(request);
    }
}
