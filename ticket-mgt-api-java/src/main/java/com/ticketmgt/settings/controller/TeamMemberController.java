package com.ticketmgt.settings.controller;

import com.ticketmgt.settings.dto.AddTeamMembersRequest;
import com.ticketmgt.settings.dto.TeamMemberListResponse;
import com.ticketmgt.settings.dto.UpdateTeamMemberRolesRequest;
import com.ticketmgt.settings.service.TeamMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/settings/teams/{teamId}/members")
@RequiredArgsConstructor
public class TeamMemberController {

    private final TeamMemberService memberService;

    @GetMapping
    public TeamMemberListResponse listMembers(
            @PathVariable UUID teamId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String query) {
        return memberService.listMembers(teamId, page, size, query);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addMembers(
            @PathVariable UUID teamId,
            @RequestBody AddTeamMembersRequest request) {
        memberService.addMembers(teamId, request);
    }

    @PutMapping("/{userId}")
    public void updateMember(
            @PathVariable UUID teamId,
            @PathVariable UUID userId,
            @RequestBody UpdateTeamMemberRolesRequest request) {
        memberService.updateMemberRoles(teamId, userId, request);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeMember(@PathVariable UUID teamId, @PathVariable UUID userId) {
        memberService.removeMember(teamId, userId);
    }
}
