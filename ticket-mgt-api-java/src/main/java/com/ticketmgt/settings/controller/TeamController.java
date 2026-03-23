package com.ticketmgt.settings.controller;

import com.ticketmgt.settings.dto.CreateTeamRequest;
import com.ticketmgt.settings.dto.TeamDTO;
import com.ticketmgt.settings.dto.TeamListResponse;
import com.ticketmgt.settings.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/settings/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping
    public TeamListResponse listTeams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String sort) {
        return teamService.listTeams(page, size, sort);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeamDTO createTeam(@RequestBody CreateTeamRequest request) {
        return teamService.createTeam(request);
    }
}
