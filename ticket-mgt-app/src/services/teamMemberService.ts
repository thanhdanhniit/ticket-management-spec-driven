import apiClient from './apiClient';
import type {
  TeamMemberListResponse,
  AddTeamMembersRequest,
  UpdateTeamMemberRolesRequest,
  ListTeamMembersParams,
} from '../types/settings';

export const teamMemberService = {
  /**
   * GET /teams/{teamId}/members
   * Retrieves the member roster for a specific team.
   */
  listMembers: async (teamId: string, params?: ListTeamMembersParams): Promise<TeamMemberListResponse> => {
    const { data } = await apiClient.get(`/teams/${teamId}/members`, { params });
    return data;
  },

  /**
   * POST /teams/{teamId}/members
   * Adds existing users to the team with optional team role assignments.
   */
  addMembers: async (teamId: string, payload: AddTeamMembersRequest): Promise<void> => {
    await apiClient.post(`/teams/${teamId}/members`, payload);
  },

  /**
   * PUT /teams/{teamId}/members/{userId}
   * Updates the team-level roles for an existing member.
   */
  updateMemberRoles: async (teamId: string, userId: string, payload: UpdateTeamMemberRolesRequest): Promise<void> => {
    await apiClient.put(`/teams/${teamId}/members/${userId}`, payload);
  },

  /**
   * DELETE /teams/{teamId}/members/{userId}
   * Removes a member from the team.
   */
  removeMember: async (teamId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/teams/${teamId}/members/${userId}`);
  },
};
