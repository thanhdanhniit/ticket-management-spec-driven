import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationRoleService } from '../services/organizationRoleService';
import type { UpdateOrganizationRoleRequest } from '../types/settings';

export const ORG_ROLE_KEYS = {
  all: ['organization-roles'] as const,
  list: () => ['organization-roles', 'list'] as const,
};

export function useOrganizationRoles() {
  return useQuery({
    queryKey: ORG_ROLE_KEYS.list(),
    queryFn: () => organizationRoleService.listRoles(),
  });
}

export function useUpdateOrganizationRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOrganizationRoleRequest }) =>
      organizationRoleService.updateRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORG_ROLE_KEYS.all });
    },
  });
}
