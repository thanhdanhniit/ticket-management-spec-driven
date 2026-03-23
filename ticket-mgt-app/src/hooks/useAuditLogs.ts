import { useQuery } from '@tanstack/react-query';
import { auditLogService } from '../services/auditLogService';
import type { ListAuditLogsParams } from '../types/settings';

export const AUDIT_LOG_KEYS = {
  all: ['audit-logs'] as const,
  list: (params?: ListAuditLogsParams) => ['audit-logs', 'list', params] as const,
};

export function useAuditLogs(params?: ListAuditLogsParams) {
  return useQuery({
    queryKey: AUDIT_LOG_KEYS.list(params),
    queryFn: () => auditLogService.listLogs(params),
  });
}
