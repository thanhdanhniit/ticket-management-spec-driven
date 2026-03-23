import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamMemberService } from '../services/teamMemberService';
import type {
  AddTeamMembersRequest,
  UpdateTeamMemberRolesRequest,
  ListTeamMembersParams,
} from '../types/settings';

export const TEAM_MEMBER_KEYS = {
  all: (teamId: string) => ['teams', teamId, 'members'] as const,
  list: (teamId: string, params?: ListTeamMembersParams) =>
    ['teams', teamId, 'members', 'list', params] as const,
};

export function useTeamMembers(teamId: string, params?: ListTeamMembersParams) {
  return useQuery({
    queryKey: TEAM_MEMBER_KEYS.list(teamId, params),
    queryFn: () => teamMemberService.listMembers(teamId, params),
    enabled: !!teamId,
  });
}

export function useAddTeamMembers(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddTeamMembersRequest) =>
      teamMemberService.addMembers(teamId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_MEMBER_KEYS.all(teamId) });
    },
  });
}

export function useUpdateTeamMemberRoles(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: UpdateTeamMemberRolesRequest }) =>
      teamMemberService.updateMemberRoles(teamId, userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_MEMBER_KEYS.all(teamId) });
    },
  });
}

export function useRemoveTeamMember(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => teamMemberService.removeMember(teamId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_MEMBER_KEYS.all(teamId) });
    },
  });
}
