import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { escalationPolicyService } from '../services/escalationPolicyService';
import type {
  EscalationPolicyListParams,
  EscalationPolicyMutationRequest,
} from '../types/escalationPolicy';

// ─── Query Key Factory ────────────────────────────────────────────────────────

/**
 * Centralised query key definitions for the Escalation Policy domain.
 * Using a key factory ensures cache invalidation is surgical and consistent.
 *
 * Key hierarchy:
 *   all                          → invalidates every escalation policy query
 *   list(params)                 → the paginated / searched list
 *   detail(id)                   → a single policy fetched by id
 */
export const ESCALATION_POLICY_KEYS = {
  all: ['escalation-policies'] as const,
  list: (params?: EscalationPolicyListParams) =>
    ['escalation-policies', 'list', params] as const,
  detail: (id: string) =>
    ['escalation-policies', 'detail', id] as const,
};

// ─── Query Hooks ──────────────────────────────────────────────────────────────

/**
 * Fetches the paginated list of escalation policies.
 * Re-fetches automatically when `params` changes (search, page, size, sort).
 *
 * @example
 * const { data, isLoading, isError } = useEscalationPolicies({ search: 'on-call', page: 0 });
 */
export function useEscalationPolicies(params?: EscalationPolicyListParams) {
  return useQuery({
    queryKey: ESCALATION_POLICY_KEYS.list(params),
    queryFn: () => escalationPolicyService.listPolicies(params),
  });
}

/**
 * Fetches a single escalation policy by id.
 * Only runs when `id` is a non-empty string (enabled guard prevents spurious requests
 * when the Edit modal is closed and id is undefined).
 *
 * @example
 * const { data: policy, isLoading } = useEscalationPolicy(selectedId);
 */
export function useEscalationPolicy(id: string | undefined) {
  return useQuery({
    queryKey: ESCALATION_POLICY_KEYS.detail(id ?? ''),
    queryFn: () => escalationPolicyService.getById(id!),
    enabled: !!id,
  });
}

// ─── Mutation Hooks ───────────────────────────────────────────────────────────

/**
 * Creates a new escalation policy.
 * Invalidates the full list cache on success so the new row appears immediately.
 *
 * @example
 * const { mutate, isPending } = useCreateEscalationPolicy();
 * mutate({ name: 'On-Call', steps: [...] });
 */
export function useCreateEscalationPolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: EscalationPolicyMutationRequest) =>
      escalationPolicyService.createPolicy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESCALATION_POLICY_KEYS.all });
    },
  });
}

/**
 * Updates an existing escalation policy.
 * Invalidates both the list cache and the specific detail cache on success.
 *
 * @example
 * const { mutate, isPending } = useUpdateEscalationPolicy();
 * mutate({ id: '...', payload: { name: 'Updated', steps: [...] } });
 */
export function useUpdateEscalationPolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EscalationPolicyMutationRequest }) =>
      escalationPolicyService.updatePolicy(id, payload),
    onSuccess: (_data, { id }) => {
      // Invalidate the full list so the updated row reflects immediately
      queryClient.invalidateQueries({ queryKey: ESCALATION_POLICY_KEYS.all });
      // Also invalidate the specific detail cache to keep the Edit modal fresh
      queryClient.invalidateQueries({ queryKey: ESCALATION_POLICY_KEYS.detail(id) });
    },
  });
}

/**
 * Deletes an escalation policy by id.
 * Invalidates the full list cache on success so the deleted row is removed immediately.
 * The caller should handle 409 Conflict errors (policy assigned to an active service).
 *
 * @example
 * const { mutate, isPending } = useDeleteEscalationPolicy();
 * mutate('policy-uuid');
 */
export function useDeleteEscalationPolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => escalationPolicyService.deletePolicy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESCALATION_POLICY_KEYS.all });
    },
  });
}
