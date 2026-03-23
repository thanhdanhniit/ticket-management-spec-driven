import apiClient from './apiClient';
import type {
  Team,
  TeamListResponse,
  CreateTeamRequest,
  PaginationParams,
} from '../types/settings';

export const teamService = {
  /**
   * GET /teams
   * Retrieves a paginated list of active teams.
   */
  listTeams: async (params?: PaginationParams): Promise<TeamListResponse> => {
    const { data } = await apiClient.get('/teams', { params });
    return data;
  },

  /**
   * POST /teams
   * Creates a new team.
   */
  createTeam: async (payload: CreateTeamRequest): Promise<Team> => {
    const { data } = await apiClient.post('/teams', payload);
    return data;
  },
};
