export type CareerCategory = "academic" | "professional" | "operations";
export type EmploymentType = "full_time" | "part_time" | "project_based";

export interface CareerBranchSummary {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  addressLink: string;
}

export interface CareerSalary {
  type: "range" | "fixed" | string;
  min?: number;
  max?: number;
  currency: string;
  period: string;
}

export interface CareerOpening {
  _id: string;
  companyId: string;
  branchId: string;
  title: string;
  category: CareerCategory;
  employmentType: EmploymentType;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  branch: CareerBranchSummary;
  salary: CareerSalary;
  applicationUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CareerStatistics {
  nationalitiesCount: number;
  workshopsCount: number;
}

export interface CareerApplyBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  resume?: string;
}

export interface CareerApplicationResult {
  id: string;
  companyId: string;
  careerId: string;
  careerTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  resume?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeUploadResult {
  url: string;
}

export interface ListCareersQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: CareerCategory;
  employmentType?: EmploymentType;
  branchId?: string;
}
