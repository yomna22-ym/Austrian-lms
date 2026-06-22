import type { CareerOpening, CareerSalary } from "@/types/webhook/careers";
import type { CareerJob } from "../types";
import { CATEGORY_TO_ROLE, EMPLOYMENT_TO_TYPE } from "./careers.constants";

function formatSalary(salary: CareerSalary): string {
  if (salary.type === "range" && salary.min != null && salary.max != null) {
    const fmt = (value: number) =>
      value.toLocaleString("en-US", { maximumFractionDigits: 0 });
    return `${fmt(salary.min)} - ${fmt(salary.max)} ${salary.currency}`;
  }

  if (salary.min != null) {
    return `${salary.min.toLocaleString("en-US")}+ ${salary.currency}`;
  }

  return "Competitive";
}

export function mapCareerOpeningToJob(opening: CareerOpening): CareerJob {
  return {
    id: opening._id,
    role: CATEGORY_TO_ROLE[opening.category],
    title: opening.title,
    description: opening.summary || opening.description,
    type: EMPLOYMENT_TO_TYPE[opening.employmentType],
    branch: opening.branch.name,
    branchId: opening.branchId,
    salary: formatSalary(opening.salary),
    applicationUrl: opening.applicationUrl,
  };
}

export function mapCareerOpeningsToJobs(openings: CareerOpening[]): CareerJob[] {
  return openings.map(mapCareerOpeningToJob);
}
