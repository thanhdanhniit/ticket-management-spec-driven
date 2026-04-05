package com.ticketmgt.settings.service;

import com.ticketmgt.settings.dto.AddTeamMembersRequest;
import com.ticketmgt.settings.dto.TeamMemberListResponse;
import com.ticketmgt.settings.dto.UpdateTeamMemberRolesRequest;
import com.ticketmgt.settings.entity.Team;
import com.ticketmgt.settings.entity.TeamMember;
import com.ticketmgt.settings.entity.TeamRole;
import com.ticketmgt.settings.entity.User;
import com.ticketmgt.shared.exception.BadRequestException;
import com.ticketmgt.shared.exception.ResourceNotFoundException;
import com.ticketmgt.settings.mapper.TeamMemberMapper;
import com.ticketmgt.settings.repository.TeamMemberRepository;
import com.ticketmgt.settings.repository.TeamRepository;
import com.ticketmgt.settings.repository.TeamRoleRepository;
import com.ticketmgt.settings.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamMemberService {

    private final TeamMemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamRoleRepository teamRoleRepository;
    private final TeamMemberMapper memberMapper;

    @Transactional(readOnly = true)
    public TeamMemberListResponse listMembers(UUID teamId, int page, int size, String query) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TeamMember> members;
        
        if (query != null && !query.isEmpty()) {
            members = memberRepository.searchByTeamIdAndUser(teamId, query, pageable);
        } else {
            members = memberRepository.findByTeamId(teamId, pageable);
        }

        return TeamMemberListResponse.builder()
                .content(memberMapper.toDtoList(members.getContent()))
                .totalElements(members.getTotalElements())
                .build();
    }

    @Transactional
    public void addMembers(UUID teamId, AddTeamMembersRequest request) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
                
        List<TeamRole> roles = teamRoleRepository.findAllById(request.getTeamRoleIds());

        for (UUID userId : request.getUserIds()) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

            // Idempotent: Ignore if already added
            if (memberRepository.findByTeamIdAndUserId(teamId, userId).isEmpty()) {
                TeamMember member = TeamMember.builder()
                        .team(team)
                        .user(user)
                        .isDefaultUser(false)
                        .teamRoles(new HashSet<>(roles))
                        .build();
                memberRepository.save(member);
            }
        }
    }

    @Transactional
    public void updateMemberRoles(UUID teamId, UUID userId, UpdateTeamMemberRolesRequest request) {
        TeamMember member = memberRepository.findByTeamIdAndUserId(teamId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found"));

        List<TeamRole> roles = teamRoleRepository.findAllById(request.getTeamRoleIds());
        member.setTeamRoles(new HashSet<>(roles));
        memberRepository.save(member);
    }

    @Transactional
    public void removeMember(UUID teamId, UUID userId) {
        TeamMember member = memberRepository.findByTeamIdAndUserId(teamId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found"));
                
        if (member.isDefaultUser()) {
            throw new BadRequestException("Cannot remove the default team user without systemic re-assignment.");
        }
        
        memberRepository.delete(member);
    }
}
