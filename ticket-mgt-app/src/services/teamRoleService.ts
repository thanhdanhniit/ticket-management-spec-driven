import apiClient from './apiClient';
import type {
  TeamRole,
  CreateTeamRoleRequest,
  UpdateTeamRoleRequest,
} from '../types/settings';

export const teamRoleService = {
  /**
   * GET /teams/{teamId}/roles
   * Lists all roles scoped to a specific team.
   */
  listRoles: async (teamId: string): Promise<TeamRole[]> => {
    const { data } = await apiClient.get(`/teams/${teamId}/roles`);
    return data;
  },

  /**
   * POST /teams/{teamId}/roles
   * Creates a new custom team role with a permission matrix.
   */
  createRole: async (teamId: string, payload: CreateTeamRoleRequest): Promise<void> => {
    await apiClient.post(`/teams/${teamId}/roles`, payload);
  },

  /**
   * PUT /teams/{teamId}/roles/{roleId}
   * Edits an existing custom team role's permission matrix.
   */
  updateRole: async (teamId: string, roleId: string, payload: UpdateTeamRoleRequest): Promise<void> => {
    await apiClient.put(`/teams/${teamId}/roles/${roleId}`, payload);
  },

  /**
   * DELETE /teams/{teamId}/roles/{roleId}
   * Deletes a custom team role (blocked for immutable system roles).
   */
  deleteRole: async (teamId: string, roleId: string): Promise<void> => {
    await apiClient.delete(`/teams/${teamId}/roles/${roleId}`);
  },
};
