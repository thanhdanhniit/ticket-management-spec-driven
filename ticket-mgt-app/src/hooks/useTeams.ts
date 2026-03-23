import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '../services/teamService';
import type { CreateTeamRequest, PaginationParams } from '../types/settings';

export const TEAM_KEYS = {
  all: ['teams'] as const,
  list: (params?: PaginationParams) => ['teams', 'list', params] as const,
};

export function useTeams(params?: PaginationParams) {
  return useQuery({
    queryKey: TEAM_KEYS.list(params),
    queryFn: () => teamService.listTeams(params),
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTeamRequest) => teamService.createTeam(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.all });
    },
  });
}
