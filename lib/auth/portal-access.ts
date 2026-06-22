import { hasStudentProfile, isStudent } from "@/lib/auth/profile";
import { getStudentPortalUrl } from "@/lib/portal-url";
import type { WebhookUser } from "@/types/api";

export function canAccessStudentPortal(
  user: WebhookUser | null | undefined,
): boolean {
  if (!user) return false;
  return isStudent(user) || hasStudentProfile(user);
}

export function shouldShowStudentPortalLink(
  user: WebhookUser | null | undefined,
): boolean {
  return Boolean(getStudentPortalUrl()) && canAccessStudentPortal(user);
}
