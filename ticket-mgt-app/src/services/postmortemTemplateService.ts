import apiClient from './apiClient';
import type {
  PostmortemTemplate,
  CreateTemplateRequest,
} from '../types/settings';

export const postmortemTemplateService = {
  /**
   * GET /postmortem-templates
   * Lists all postmortem templates for the organization.
   */
  listTemplates: async (): Promise<PostmortemTemplate[]> => {
    const { data } = await apiClient.get('/postmortem-templates');
    return data;
  },

  /**
   * POST /postmortem-templates
   * Creates a new postmortem template.
   */
  createTemplate: async (payload: CreateTemplateRequest): Promise<void> => {
    await apiClient.post('/postmortem-templates', payload);
  },

  /**
   * PUT /postmortem-templates/{id}
   * Updates an existing postmortem template.
   */
  updateTemplate: async (id: string, payload: CreateTemplateRequest): Promise<void> => {
    await apiClient.put(`/postmortem-templates/${id}`, payload);
  },

  /**
   * DELETE /postmortem-templates/{id}
   * Deletes a postmortem template.
   */
  deleteTemplate: async (id: string): Promise<void> => {
    await apiClient.delete(`/postmortem-templates/${id}`);
  },
};
