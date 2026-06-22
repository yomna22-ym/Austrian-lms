import { WEBSITE_ROUTES } from "@/app/constants/routes";

export const HOME_HERO_INTERESTS = [
  "Courses",
  "Certificates",
  "Placement Test",
  "Events",
] as const;

export type HomeHeroInterest = (typeof HOME_HERO_INTERESTS)[number];

export function buildHomeHeroDestination(
  interest: HomeHeroInterest,
  branchName: string,
): string {
  const encodedBranch = encodeURIComponent(branchName);

  switch (interest) {
    case "Courses":
      return `${WEBSITE_ROUTES.courses}?branch=${encodedBranch}`;
    case "Certificates":
      return `${WEBSITE_ROUTES.certificates}?branch=${encodedBranch}`;
    case "Placement Test":
      return WEBSITE_ROUTES.placementTest;
    case "Events":
      return WEBSITE_ROUTES.events;
    default:
      return WEBSITE_ROUTES.courses;
  }
}

export function interestRequiresBranchFilter(
  interest: HomeHeroInterest,
): boolean {
  return interest === "Courses" || interest === "Certificates";
}
