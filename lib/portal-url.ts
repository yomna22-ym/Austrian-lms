/** Client-safe student portal URL (external LMS app). */
export function getStudentPortalUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL?.trim();
  if (!url) return null;
  return url.replace(/\/$/, "");
}
