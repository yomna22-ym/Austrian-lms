export interface TeamCard {
  id: string;
  companyId: string;
  fullName: string;
  role: string;
  profileImage: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListTeamsQuery {
  page?: number;
  limit?: number;
}
