import escalationApiClient from './escalationPolicyApiClient';
import type {
  EscalationPolicyDTO,
  EscalationPolicyListResponse,
  EscalationPolicyMutationRequest,
  EscalationPolicyListParams,
} from '../types/escalationPolicy';

/**
 * Service layer for the Escalation Policy API.
 * All methods map 1-to-1 to endpoints defined in specs/escalation-policies-api-spec.yaml.
 *
 * Components must never call this service directly — use the React Query hooks
 * in hooks/useEscalationPolicies.ts instead.
 */
export const escalationPolicyService = {
  /**
   * GET /v1/escalation-policies
   * Returns a paginated, optionally filtered list of escalation policies.
   * Powers the main list view and the live search bar.
   */
  listPolicies: async (
    params?: EscalationPolicyListParams
  ): Promise<EscalationPolicyListResponse> => {
    const { data } = await escalationApiClient.get('', { params });
    return data;
  },

  /**
   * GET /v1/escalation-policies/{id}
   * Fetches a single policy with its full step list.
   * Used to pre-populate the Edit overlay.
   */
  getById: async (id: string): Promise<EscalationPolicyDTO> => {
    const { data } = await escalationApiClient.get(`/${id}`);
    return data;
  },

  /**
   * POST /v1/escalation-policies
   * Creates a new escalation policy.
   * Server validates: name required, steps minItems=1.
   * Returns the created policy with server-assigned id, stepOrder, and timestamps.
   */
  createPolicy: async (
    payload: EscalationPolicyMutationRequest
  ): Promise<EscalationPolicyDTO> => {
    const { data } = await escalationApiClient.post('/', payload);
    return data;
  },

  /**
   * PUT /v1/escalation-policies/{id}
   * Fully replaces an existing policy.
   * The server performs a complete step replacement — all old steps are deleted
   * and re-inserted from the request array. stepOrder is derived from array index.
   */
  updatePolicy: async (
    id: string,
    payload: EscalationPolicyMutationRequest
  ): Promise<EscalationPolicyDTO> => {
    const { data } = await escalationApiClient.put(`/${id}`, payload);
    return data;
  },

  /**
   * DELETE /v1/escalation-policies/{id}
   * Deletes a policy. Returns 204 No Content on success.
   * Returns 409 Conflict if the policy is still assigned to an active service.
   */
  deletePolicy: async (id: string): Promise<void> => {
    await escalationApiClient.delete(`/${id}`);
  },
};
