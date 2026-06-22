import type { StudentProfile, WebhookUser } from "@/types/api";

export function isStudent(user: WebhookUser | null | undefined): boolean {
  return user?.roleName?.toLowerCase() === "student";
}

export function studentProfile(
  user: WebhookUser | null | undefined,
): StudentProfile | undefined {
  if (!user?.profile || user.profile.type !== "student") {
    return undefined;
  }
  return user.profile;
}

export function hasStudentProfile(user: WebhookUser | null | undefined): boolean {
  return studentProfile(user) !== undefined;
}
