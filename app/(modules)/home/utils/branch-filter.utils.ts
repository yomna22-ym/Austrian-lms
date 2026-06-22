import type { CourseBranch } from "@/app/(modules)/courses/types/course.types";
import { COURSE_BRANCHES } from "@/app/(modules)/courses/utils/course.constants";
import type { Branch } from "@/types/webhook/branches";

export function formatBranchLabel(branch: Branch): string {
  return branch.name;
}

function normalizeBranchName(branchName: string): string {
  return branchName
    .trim()
    .replace(/\s+branch$/i, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

const WEBHOOK_BRANCH_ALIASES: Record<string, CourseBranch> = {
  "5th settlement": "New Cairo",
  "5th statment": "New Cairo",
  "fifth settlement": "New Cairo",
  "garden city": "Zamalek",
  "mall of arabia": "New Cairo",
};

export function resolveCourseBranch(branchName: string): CourseBranch | null {
  const normalized = normalizeBranchName(branchName);
  if (!normalized) return null;

  const alias = WEBHOOK_BRANCH_ALIASES[normalized];
  if (alias) return alias;

  const exact = COURSE_BRANCHES.find(
    (branch) => normalizeBranchName(branch) === normalized,
  );
  if (exact) return exact;

  const partial = COURSE_BRANCHES.find(
    (branch) =>
      normalized.includes(normalizeBranchName(branch)) ||
      normalizeBranchName(branch).includes(normalized),
  );
  return partial ?? null;
}

export function matchesBranchName(
  locationText: string,
  branchName: string,
): boolean {
  const haystack = normalizeBranchName(locationText);
  const needle = normalizeBranchName(branchName);
  if (!haystack || !needle) return false;

  return haystack.includes(needle) || needle.includes(haystack);
}

export function courseMatchesBranchFilter(
  courseBranch: CourseBranch,
  filterBranch: CourseBranch | "all",
  branchQuery: string | null,
): boolean {
  if (filterBranch !== "all") {
    return courseBranch === filterBranch;
  }

  if (!branchQuery) return true;

  const resolved = resolveCourseBranch(branchQuery);
  if (resolved) return courseBranch === resolved;

  return matchesBranchName(courseBranch, branchQuery);
}
