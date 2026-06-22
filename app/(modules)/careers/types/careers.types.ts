export type CareerRole = "Academic" | "Professional" | "Operations";
export type CareerJobType = "Full Time" | "Part Time" | "Project Based";

export interface CareerJob {
  id: string;
  role: CareerRole;
  title: string;
  description: string;
  type: CareerJobType;
  branch: string;
  branchId: string;
  salary: string;
  applicationUrl?: string;
}

export interface CareerBranchOption {
  id: string;
  name: string;
}

export interface CareerBenefit {
  title: string;
  description: string;
  Icon: import("lucide-react").LucideIcon;
}

export interface ApplicationStep {
  number: string;
  title: string;
  description: string;
}

export type CareerRoleFilter = "All Roles" | CareerRole;
export type CareerBranchFilter = "All Branches" | string;
export type CareerTypeFilter =
  | "Job Type"
  | "Full Time"
  | "Part Time"
  | "Project Based";
