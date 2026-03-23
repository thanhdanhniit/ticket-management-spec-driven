import apiClient from './apiClient';
import type {
  OrganizationRole,
  UpdateOrganizationRoleRequest,
} from '../types/settings';

export const organizationRoleService = {
  /**
   * GET /organization-roles
   * Retrieves the full matrix of org roles and their capabilities.
   */
  listRoles: async (): Promise<OrganizationRole[]> => {
    const { data } = await apiClient.get('/organization-roles');
    return data;
  },

  /**
   * PUT /organization-roles/{id}
   * Updates the permission matrix for a specific org role.
   */
  updateRole: async (id: string, payload: UpdateOrganizationRoleRequest): Promise<void> => {
    await apiClient.put(`/organization-roles/${id}`, payload);
  },
};
