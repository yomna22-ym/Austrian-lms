"use client";

import { useCallback, useState } from "react";
import { branchesService } from "../services";
import { mapGlobalBranches, mapLocalBranches } from "../utils";
import { ApiError } from "@/lib/api/errors";
import type { BranchLocation } from "@/app/shared/LocationFrame/types";
import type { GlobalLocation } from "../types";

interface UseBranchesListOptions {
  initialGlobalLocations: GlobalLocation[];
  initialLocalBranches: BranchLocation[];
}

export function useBranchesList({
  initialGlobalLocations,
  initialLocalBranches,
}: UseBranchesListOptions) {
  const [globalLocations, setGlobalLocations] = useState(initialGlobalLocations);
  const [localBranches, setLocalBranches] = useState(initialLocalBranches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [globalData, localData] = await Promise.all([
        branchesService.listGlobalBranches(),
        branchesService.listLocalBranches(),
      ]);

      setGlobalLocations(mapGlobalBranches(globalData.items));
      setLocalBranches(mapLocalBranches(localData.items));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to load branches.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    globalLocations,
    localBranches,
    loading,
    error,
    refetch,
  };
}
