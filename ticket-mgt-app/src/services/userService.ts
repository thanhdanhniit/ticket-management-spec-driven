import apiClient from './apiClient';
import type {
  UserListResponse,
  AddUsersRequest,
  ListUsersParams,
} from '../types/settings';

export const userService = {
  /**
   * GET /users
   * Retrieves a paginated, searchable list of organizational users.
   */
  listUsers: async (params?: ListUsersParams): Promise<UserListResponse> => {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },

  /**
   * POST /users
   * Invite one or multiple users to the organization.
   */
  addUsers: async (payload: AddUsersRequest): Promise<void> => {
    await apiClient.post('/users', payload);
  },
};
