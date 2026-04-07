export interface StandardError {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
}

export interface TagDTO {
  key: string;
  value: string;
}

export type OwnerType = 'USER' | 'SQUAD';

export interface OwnerSummary {
  id?: string;
  name?: string;
  type?: OwnerType;
}

export interface PolicySummary {
  id?: string;
  name?: string;
}

export interface ServiceMetrics {
  openIncidentsTriggered?: number;
  openIncidentsAcknowledged?: number;
  mttaMinutes?: number;
  mttrHours?: number;
}

export type HealthStatus = 'HEALTHY' | 'DEGRADED' | 'CRITICAL' | 'MAINTENANCE';

export interface ServiceResponse {
  id?: string;
  name?: string;
  description?: string;
  owner?: OwnerSummary;
  escalationPolicy?: PolicySummary;
  alertSources?: string[];
  tags?: TagDTO[];
  maintenanceEnabled?: boolean;
  metrics?: ServiceMetrics;
  healthStatus?: HealthStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicePageResponse {
  content?: ServiceResponse[];
  totalPages?: number;
  totalElements?: number;
  size?: number;
  number?: number;
}

export interface ServiceCreateRequest {
  name: string;
  description?: string;
  ownerId?: string;
  escalationPolicyId?: string;
}

export interface ServiceUpdateRequest {
  name?: string;
  description?: string;
  ownerId?: string;
  escalationPolicyId?: string;
}

export interface FeatureTagsUpdateRequest {
  tags?: TagDTO[];
}

export type RepeatType = 'NEVER' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface MaintenanceSchedule {
  id?: string;
  startDate: string; // date
  startTime: string; // time
  endDate?: string;  // date
  endTime?: string;  // time
  repeatsEvery: RepeatType;
}

export interface MaintenanceModeUpdateRequest {
  maintenanceEnabled: boolean;
  schedules?: MaintenanceSchedule[];
}

export interface MaintenanceModeResponse {
  maintenanceEnabled?: boolean;
  schedules?: MaintenanceSchedule[];
}

export interface GetServicesParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  ownerIds?: string;
}
