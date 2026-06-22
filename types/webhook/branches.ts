export type BranchType = "local" | "global";

export interface Branch {
  _id: string;
  id?: string;
  companyId: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  type: BranchType;
  phone: string;
  address: string;
  addressLink: string;
  city: string;
  country: string;
  isActive: boolean;
}

export interface ListBranchesQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: BranchType;
}
