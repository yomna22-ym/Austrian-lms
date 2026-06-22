"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { branchesService } from "@/app/(modules)/branches/services/branches.service";
import { ApiError } from "@/lib/api/errors";
import type { Branch } from "@/types/webhook/branches";
import { formatBranchLabel } from "../utils/branch-filter.utils";
import {
  buildHomeHeroDestination,
  HOME_HERO_INTERESTS,
  type HomeHeroInterest,
} from "../utils/home-hero-navigation";

export function useHomeHeroForm() {
  const router = useRouter();
  const [interest, setInterest] = useState<HomeHeroInterest>("Courses");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchesError, setBranchesError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    branchesService
      .listLocalBranches()
      .then((data) => {
        if (cancelled) return;

        const items = data.items ?? [];
        setBranches(items);
        setBranchesError(items.length ? null : "No branches available.");

        if (items.length > 0) {
          setSelectedBranchId(items[0].id ?? items[0]._id);
        }
      })
      .catch((error) => {
        if (cancelled) return;
        setBranches([]);
        setBranchesError(
          error instanceof ApiError
            ? error.message
            : "Unable to load branches.",
        );
      })
      .finally(() => {
        if (!cancelled) setBranchesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const branchOptions = useMemo(
    () =>
      branches.map((branch) => ({
        value: branch.id ?? branch._id,
        label: formatBranchLabel(branch),
      })),
    [branches],
  );

  const selectedBranch = useMemo(
    () =>
      branches.find((branch) => (branch.id ?? branch._id) === selectedBranchId),
    [branches, selectedBranchId],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!selectedBranch) {
      setFormError("Please select a branch.");
      return;
    }

    setIsSubmitting(true);
    const destination = buildHomeHeroDestination(interest, selectedBranch.name);
    router.push(destination);
  };

  return {
    interest,
    setInterest,
    interestOptions: HOME_HERO_INTERESTS,
    selectedBranchId,
    setSelectedBranchId,
    branchOptions,
    branchesLoading,
    branchesError,
    formError,
    isSubmitting,
    handleSubmit,
    canSubmit: Boolean(selectedBranch) && !branchesLoading && !branchesError,
  };
}
