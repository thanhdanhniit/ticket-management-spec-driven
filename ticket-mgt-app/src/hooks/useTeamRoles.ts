import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamRoleService } from '../services/teamRoleService';
import type { CreateTeamRoleRequest, UpdateTeamRoleRequest } from '../types/settings';

export const TEAM_ROLE_KEYS = {
  all: (teamId: string) => ['teams', teamId, 'roles'] as const,
  list: (teamId: string) => ['teams', teamId, 'roles', 'list'] as const,
};

export function useTeamRoles(teamId: string) {
  return useQuery({
    queryKey: TEAM_ROLE_KEYS.list(teamId),
    queryFn: () => teamRoleService.listRoles(teamId),
    enabled: !!teamId,
  });
}

export function useCreateTeamRole(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTeamRoleRequest) =>
      teamRoleService.createRole(teamId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_ROLE_KEYS.all(teamId) });
    },
  });
}

export function useUpdateTeamRole(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, payload }: { roleId: string; payload: UpdateTeamRoleRequest }) =>
      teamRoleService.updateRole(teamId, roleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_ROLE_KEYS.all(teamId) });
    },
  });
}

export function useDeleteTeamRole(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roleId: string) => teamRoleService.deleteRole(teamId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_ROLE_KEYS.all(teamId) });
    },
  });
}
