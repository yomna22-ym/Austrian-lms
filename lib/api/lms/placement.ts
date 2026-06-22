import "server-only";

import { lmsClient } from "@/lib/api/lms-client";
import type { PlacementAttemptStatus } from "@/types/placement";

export function startOrResumePlacementAttempt(
  token: string,
): Promise<PlacementAttemptStatus> {
  return lmsClient.post<PlacementAttemptStatus>("/students/me/placement/start", {
    token,
  });
}

export function getCurrentPlacementAttempt(
  token: string,
): Promise<PlacementAttemptStatus> {
  return lmsClient.get<PlacementAttemptStatus>("/students/me/placement/current", {
    token,
  });
}
