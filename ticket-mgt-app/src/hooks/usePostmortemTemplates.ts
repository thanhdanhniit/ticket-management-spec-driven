import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postmortemTemplateService } from '../services/postmortemTemplateService';
import type { CreateTemplateRequest } from '../types/settings';

export const TEMPLATE_KEYS = {
  all: ['postmortem-templates'] as const,
  list: () => ['postmortem-templates', 'list'] as const,
};

export function usePostmortemTemplates() {
  return useQuery({
    queryKey: TEMPLATE_KEYS.list(),
    queryFn: () => postmortemTemplateService.listTemplates(),
  });
}

export function useCreatePostmortemTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTemplateRequest) =>
      postmortemTemplateService.createTemplate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all });
    },
  });
}

export function useUpdatePostmortemTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateTemplateRequest }) =>
      postmortemTemplateService.updateTemplate(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all });
    },
  });
}

export function useDeletePostmortemTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postmortemTemplateService.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all });
    },
  });
}
