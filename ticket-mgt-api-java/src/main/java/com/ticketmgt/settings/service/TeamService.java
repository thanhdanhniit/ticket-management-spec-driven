package com.ticketmgt.settings.service;

import com.ticketmgt.settings.dto.CreateTeamRequest;
import com.ticketmgt.settings.dto.TeamDTO;
import com.ticketmgt.settings.dto.TeamListResponse;
import com.ticketmgt.settings.entity.Team;
import com.ticketmgt.settings.entity.User;
import com.ticketmgt.shared.exception.BadRequestException;
import com.ticketmgt.shared.exception.ResourceNotFoundException;
import com.ticketmgt.settings.mapper.TeamMapper;
import com.ticketmgt.settings.repository.TeamRepository;
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
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamMapper teamMapper;

    @Transactional(readOnly = true)
    public TeamListResponse listTeams(int page, int size, String sort) {
        Pageable pageable = createPageable(page, size, sort);
        Page<Team> teams = teamRepository.findAll(pageable);
        
        return TeamListResponse.builder()
                .content(teamMapper.toDtoList(teams.getContent()))
                .totalElements(teams.getTotalElements())
                .build();
    }

    @Transactional
    public TeamDTO createTeam(CreateTeamRequest request) {
        if (teamRepository.findByName(request.getName()).isPresent()) {
            throw new BadRequestException("Team name already exists");
        }

        User defaultUser = userRepository.findById(request.getDefaultUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Default user not found"));

        Team team = Team.builder()
                .name(request.getName())
                .description(request.getDescription())
                .defaultUser(defaultUser)
                .isImmutable(false)
                .build();

        return teamMapper.toDto(teamRepository.save(team));
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
