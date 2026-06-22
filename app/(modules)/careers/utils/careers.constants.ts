import {
  Globe2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type {
  ApplicationStep,
  CareerBenefit,
  CareerRole,
  CareerRoleFilter,
  CareerTypeFilter,
} from "../types";

export const CAREER_BENEFITS: CareerBenefit[] = [
  {
    title: "Cultural Environment",
    description:
      "Work in a bridge between Egyptian and Austrian cultures. Engage with diverse viewpoints and contribute to international understanding through language.",
    Icon: Globe2,
  },
  {
    title: "Career Growth",
    description:
      "Regular workshops, internal training programs, and clear pathways to seniority.",
    Icon: TrendingUp,
  },
  {
    title: "Official Recognition",
    description:
      "Join an institution recognized by the Austrian Ministry of Education.",
    Icon: ShieldCheck,
  },
];

export const APPLICATION_STEPS: ApplicationStep[] = [
  {
    number: "1",
    title: "Browse Roles",
    description:
      "Explore open positions that match your expertise and passion.",
  },
  {
    number: "2",
    title: "Submit Application",
    description:
      "Share your CV and professional background via our online form.",
  },
  {
    number: "3",
    title: "The Interview",
    description:
      "Meet our academic directors and discuss your pedagogical approach.",
  },
  {
    number: "4",
    title: "Join the Team",
    description:
      "Welcome to the Osterreich Institut family. Orientation begins.",
  },
];

export const CAREER_ROLE_FILTERS: CareerRoleFilter[] = [
  "All Roles",
  "Academic",
  "Professional",
  "Operations",
];

export const CAREER_TYPE_FILTERS: CareerTypeFilter[] = [
  "Job Type",
  "Full Time",
  "Part Time",
  "Project Based",
];

export const ROLE_TO_CATEGORY: Record<
  Exclude<CareerRoleFilter, "All Roles">,
  "academic" | "professional" | "operations"
> = {
  Academic: "academic",
  Professional: "professional",
  Operations: "operations",
};

export const TYPE_TO_EMPLOYMENT: Record<
  Exclude<CareerTypeFilter, "Job Type">,
  "full_time" | "part_time" | "project_based"
> = {
  "Full Time": "full_time",
  "Part Time": "part_time",
  "Project Based": "project_based",
};

export const CATEGORY_TO_ROLE: Record<
  "academic" | "professional" | "operations",
  CareerRole
> = {
  academic: "Academic",
  professional: "Professional",
  operations: "Operations",
};

export const EMPLOYMENT_TO_TYPE: Record<
  "full_time" | "part_time" | "project_based",
  Exclude<CareerTypeFilter, "Job Type">
> = {
  full_time: "Full Time",
  part_time: "Part Time",
  project_based: "Project Based",
};

export const CAREERS_PAGE_LIMIT = 12;

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

/** Static teaser data for the home page until it is wired to the API. */
export const CAREER_JOBS: import("../types").CareerJob[] = [
  {
    id: "german-instructor-a1-a2",
    role: "Academic",
    title: "German Instructor - A1-A2 Levels",
    description:
      "Join our prestigious academic team. You will be responsible for guiding beginner students through their initial language acquisition phases with engaging lessons.",
    type: "Full Time",
    branch: "Garden City",
    branchId: "",
    salary: "3,200 - 3,800 EGP",
  },
  {
    id: "senior-german-instructor-b1-c1",
    role: "Professional",
    title: "Senior German Instructor - B1-C1 Levels",
    description:
      "Expert role for seasoned educators. Focus on advanced business German and university preparation for international professionals working in German-speaking contexts.",
    type: "Full Time",
    branch: "Heliopolis",
    branchId: "",
    salary: "4,500 - 5,500 EGP",
  },
];
