// ─── Shared primitives ───────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface EntityPermissions {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

/** Dynamic map: entity name → CRUD permissions */
export type EntityPermissionMatrix = Record<string, EntityPermissions>;

export interface StandardErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  fullName: string;
  email: string;
  organizationRole: string;
  status: 'ACTIVE' | 'INVITATION_PENDING' | 'INACTIVE';
}

export interface UserListResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
}

export interface UserInvite {
  email: string;
  role: string;
}

export interface AddUsersRequest {
  users: UserInvite[];
}

export interface ListUsersParams extends PaginationParams {
  query?: string;
  status?: 'ACTIVE' | 'INVITATION_PENDING' | 'INACTIVE';
}

// ─── Organization Roles ───────────────────────────────────────────────────────

export interface OrganizationRole {
  id: string;
  name: string;
  isImmutable: boolean;
  permissions: EntityPermissionMatrix;
}

export interface UpdateOrganizationRoleRequest {
  permissions: EntityPermissionMatrix;
}

// ─── Teams ────────────────────────────────────────────────────────────────────

export interface Team {
  id: string;
  name: string;
  description?: string;
  defaultUserId: string;
  isImmutable: boolean;
}

export interface TeamListResponse {
  content: Team[];
  totalElements: number;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
  defaultUserId: string;
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export interface TeamMember {
  userId: string;
  user: User;
  isDefaultUser: boolean;
  teamRoles: string[]; // Array of role UUIDs
}

export interface TeamMemberListResponse {
  content: TeamMember[];
  totalElements: number;
}

export interface AddTeamMembersRequest {
  userIds: string[];
  teamRoleIds?: string[];
}

export interface UpdateTeamMemberRolesRequest {
  teamRoleIds: string[];
}

export interface ListTeamMembersParams extends PaginationParams {
  query?: string;
}

// ─── Team Roles ───────────────────────────────────────────────────────────────

export interface TeamRole {
  id: string;
  name: string;
  isImmutable: boolean;
  permissions: EntityPermissionMatrix;
}

export interface CreateTeamRoleRequest {
  name: string;
  permissions: EntityPermissionMatrix;
}

export interface UpdateTeamRoleRequest {
  name?: string;
  permissions: EntityPermissionMatrix;
}

// ─── Postmortem Templates ─────────────────────────────────────────────────────

export interface PostmortemTemplate {
  id: string;
  name: string;
  content: string;
}

export interface CreateTemplateRequest {
  name: string;
  content: string;
}

// ─── Audit Logs ───────────────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  action: string;
  actee: string;
  details: Record<string, unknown>;
}

export interface AuditLogListResponse {
  content: AuditLog[];
  totalElements: number;
  totalPages: number;
}

export interface ListAuditLogsParams extends PaginationParams {
  actee?: string;
  actor?: string;
  action?: string;
  startTime?: string;
  endTime?: string;
}
