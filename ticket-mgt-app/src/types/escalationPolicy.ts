// ─── Escalation Policy Types ──────────────────────────────────────────────────
// Aligned to: specs/escalation-policies-api-spec.yaml
// API base:   /v1/escalation-policies

// ─── Target Type ─────────────────────────────────────────────────────────────

/** Discriminates whether the notification target is an individual user or a team. */
export type EscalationTargetType = 'USER' | 'TEAM';

// ─── Step ─────────────────────────────────────────────────────────────────────

/**
 * A single step in an escalation sequence.
 * Returned by the API as part of EscalationPolicyDTO.
 * stepOrder is 1-based and assigned server-side from the array position.
 */
export interface EscalationStepDTO {
  /** UUID assigned by the server. */
  id: string;
  /** 1-based position in the escalation sequence. */
  stepOrder: number;
  /**
   * Minutes to wait after the previous step fired before this step is triggered.
   * 0 means notify immediately (typically used for Step 1).
   */
  waitTimeMinutes: number;
  /** UUID referencing a User or Team from the settings domain. */
  targetId: string;
  /** Determines whether targetId resolves to a User or a Team. */
  targetType: EscalationTargetType;
  /** Enriched target name by backend */
  targetName?: string;
}

/**
 * Payload for a single step submitted in a create or update request.
 * stepOrder is NOT sent by the client — it is derived from the array index server-side.
 * id is NOT sent by the client on create; on update all steps are fully replaced.
 */
export interface EscalationStepRequest {
  /** Minimum 0. 0 = fire immediately. */
  waitTimeMinutes: number;
  /** UUID of the User or Team to notify. */
  targetId: string;
  targetType: EscalationTargetType;
}

// ─── Policy ───────────────────────────────────────────────────────────────────

/**
 * Full escalation policy as returned by GET /escalation-policies and
 * GET /escalation-policies/{id}.
 * Steps are always ordered by stepOrder ASC by the server.
 */
export interface EscalationPolicyDTO {
  /** UUID assigned by the server. */
  id: string;
  /** Human-readable policy name. Required, must not be blank. */
  name: string;
  /** Optional free-text description. */
  description?: string;
  /** Ordered list of escalation steps (at least 1 guaranteed by the server). */
  steps: EscalationStepDTO[];
  /** ISO 8601 timestamp — set by the server on creation. */
  createdAt: string;
  /** ISO 8601 timestamp — updated on every mutation. */
  updatedAt: string;
}

// ─── Paginated List Response ──────────────────────────────────────────────────

/**
 * Paginated envelope returned by GET /escalation-policies.
 * Matches EscalationPolicyPaginatedResource in the OpenAPI spec.
 */
export interface EscalationPolicyListResponse {
  content: EscalationPolicyDTO[];
  /** 0-based page index. */
  page: number;
  /** Number of items per page. */
  size: number;
  /** Total number of policies matching the current query. */
  totalElements: number;
  /** Total number of pages. */
  totalPages: number;
}

// ─── Mutation Request ─────────────────────────────────────────────────────────

/**
 * Request body for POST /escalation-policies and PUT /escalation-policies/{id}.
 * Used for both create and update — the server performs a full step replacement on update.
 * Validated server-side: name required, steps array minItems=1.
 */
export interface EscalationPolicyMutationRequest {
  /** Required. Minimum length of 1 character. */
  name: string;
  description?: string;
  /** At least one step is required. Array order determines step_order on the server. */
  steps: EscalationStepRequest[];
}

// ─── Query Params ─────────────────────────────────────────────────────────────

/**
 * Query parameters accepted by GET /escalation-policies.
 * Follows the same optional-field pattern as PaginationParams in settings.ts.
 */
export interface EscalationPolicyListParams {
  /** 0-based page index. Server default: 0. */
  page?: number;
  /** Items per page. Server default: 20. */
  size?: number;
  /** Sort expression, e.g. "name,asc" or "createdAt,desc". Server default: "name,asc". */
  sort?: string;
  /**
   * Live search string matched against policy name (case-insensitive, contains).
   * Powers the search bar in the List UI view.
   */
  search?: string;
}
