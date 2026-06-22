import type { PlacementAttemptStatus } from "@/types/placement";

export const placementTestService = {
  async startOrResume(): Promise<PlacementAttemptStatus> {
    const response = await fetch("/api/students/me/placement/start", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(
        (body as { message?: string }).message ?? "Failed to start placement attempt",
      );
    }
    const json = await response.json();
    return (json as { data: PlacementAttemptStatus }).data;
  },

  async getCurrent(): Promise<PlacementAttemptStatus> {
    const response = await fetch("/api/students/me/placement/current", {
      credentials: "include",
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(
        (body as { message?: string }).message ?? "Failed to get placement status",
      );
    }
    const json = await response.json();
    return (json as { data: PlacementAttemptStatus }).data;
  },
};
