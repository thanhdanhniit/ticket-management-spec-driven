import apiClient from './apiClient';
import type {
  ServicePageResponse,
  ServiceResponse,
  ServiceCreateRequest,
  ServiceUpdateRequest,
  FeatureTagsUpdateRequest,
  MaintenanceModeUpdateRequest,
  MaintenanceModeResponse,
  GetServicesParams,
  TagDTO,
} from '../types';

export const serviceService = {
  /**
   * Retrieve a paginated list of services
   */
  getServices: async (params?: GetServicesParams): Promise<ServicePageResponse> => {
    const response = await apiClient.get<ServicePageResponse>('/services', { params });
    return response.data;
  },

  /**
   * Define a new service
   */
  createService: async (data: ServiceCreateRequest): Promise<ServiceResponse> => {
    const response = await apiClient.post<ServiceResponse>('/services', data);
    return response.data;
  },

  /**
   * Retrieve a single service
   */
  getServiceById: async (id: string): Promise<ServiceResponse> => {
    const response = await apiClient.get<ServiceResponse>(`/services/${id}`);
    return response.data;
  },

  /**
   * Update a service
   */
  updateService: async (id: string, data: ServiceUpdateRequest): Promise<ServiceResponse> => {
    const response = await apiClient.put<ServiceResponse>(`/services/${id}`, data);
    return response.data;
  },

  /**
   * Delete a service
   */
  deleteService: async (id: string): Promise<void> => {
    await apiClient.delete(`/services/${id}`);
  },

  /**
   * Update service metadata tags
   */
  updateServiceTags: async (id: string, data: FeatureTagsUpdateRequest): Promise<TagDTO[]> => {
    const response = await apiClient.put<TagDTO[]>(`/services/${id}/tags`, data);
    return response.data;
  },

  /**
   * Manage Maintenance Mode schedules
   */
  updateMaintenanceMode: async (
    id: string,
    data: MaintenanceModeUpdateRequest
  ): Promise<MaintenanceModeResponse> => {
    const response = await apiClient.put<MaintenanceModeResponse>(
      `/services/${id}/maintenance-windows`,
      data
    );
    return response.data;
  },
};
