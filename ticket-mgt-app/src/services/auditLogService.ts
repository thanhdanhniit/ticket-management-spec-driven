import apiClient from './apiClient';
import type {
  AuditLogListResponse,
  ListAuditLogsParams,
} from '../types/settings';

export const auditLogService = {
  /**
   * GET /audit-logs
   * Retrieves immutable audit logs with extensive filtering support.
   */
  listLogs: async (params?: ListAuditLogsParams): Promise<AuditLogListResponse> => {
    const { data } = await apiClient.get('/audit-logs', { params });
    return data;
  },
};
