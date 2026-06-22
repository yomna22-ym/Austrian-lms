"use client";

import { useCallback, useEffect, useState } from "react";
import { placementTestService } from "@/app/(modules)/placement-test/services/placement-test.service";
import { useAuthStore, type AuthState } from "@/stores/auth.store";
import type { PlacementAttemptStatus } from "@/types/placement";

export function useAccountData() {
  const user = useAuthStore((state: AuthState) => state.user);
  const refreshUser = useAuthStore((state: AuthState) => state.refreshUser);
  const isStudent = useAuthStore((state: AuthState) => state.isStudent);
  const hasStudentProfile = useAuthStore((state: AuthState) => state.hasStudentProfile);
  const studentProfile = useAuthStore((state: AuthState) => state.studentProfile);

  const [placementStatus, setPlacementStatus] =
    useState<PlacementAttemptStatus | null>(null);
  const [placementLoading, setPlacementLoading] = useState(false);
  const [placementError, setPlacementError] = useState<string | null>(null);
  const [refreshingProfile, setRefreshingProfile] = useState(false);

  const loadPlacementStatus = useCallback(async () => {
    if (!isStudent()) {
      setPlacementStatus(null);
      setPlacementError(null);
      return;
    }

    setPlacementLoading(true);
    setPlacementError(null);
    try {
      const status = await placementTestService.getCurrent();
      setPlacementStatus(status);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load placement status";
      if (message.includes("404") || message.includes("No placement attempt")) {
        setPlacementStatus(null);
      } else {
        setPlacementError(message);
      }
    } finally {
      setPlacementLoading(false);
    }
  }, [isStudent]);

  useEffect(() => {
    void loadPlacementStatus();
  }, [loadPlacementStatus, user?.id, user?.profile?.id]);

  const refreshProfile = useCallback(async () => {
    setRefreshingProfile(true);
    try {
      await refreshUser();
      await loadPlacementStatus();
    } finally {
      setRefreshingProfile(false);
    }
  }, [refreshUser, loadPlacementStatus]);

  return {
    user,
    isStudent: isStudent(),
    hasStudentProfile: hasStudentProfile(),
    studentProfile: studentProfile(),
    placementStatus,
    placementLoading,
    placementError,
    refreshingProfile,
    refreshProfile,
    reloadPlacement: loadPlacementStatus,
  };
}
