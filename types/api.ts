export interface ApiMeta {
  timestamp: string;
  path: string;
}

export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiErrorBody {
  message?: string | string[];
  statusCode?: number;
  error?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface StudentProfile {
  type: "student";
  id: string;
  studentCode: string;
  branchId?: string;
  placementLevelId?: string;
  currentStudyLevelId?: string;
  lastCompletedLevelId?: string;
}

export interface WebhookUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  roleId: string;
  roleName: string;
  isActive: boolean;
  profile?: StudentProfile;
}

export interface AccessTokenData {
  accessToken: string;
}
