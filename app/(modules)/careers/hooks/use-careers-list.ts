"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { careersService } from "../services";
import type {
  CareerBranchFilter,
  CareerBranchOption,
  CareerJob,
  CareerRoleFilter,
  CareerTypeFilter,
} from "../types";
import {
  CAREERS_PAGE_LIMIT,
  ROLE_TO_CATEGORY,
  TYPE_TO_EMPLOYMENT,
} from "../utils";
import { mapCareerOpeningsToJobs } from "../utils/careers.mapper";
import { ApiError } from "@/lib/api/errors";
import type { PaginationMeta } from "@/types/api";

interface UseCareersListOptions {
  initialJobs: CareerJob[];
  initialPagination: PaginationMeta | null;
  branchOptions: CareerBranchOption[];
}

export function useCareersList({
  initialJobs,
  initialPagination,
  branchOptions,
}: UseCareersListOptions) {
  const [jobs, setJobs] = useState(initialJobs);
  const [pagination, setPagination] = useState<PaginationMeta | null>(
    initialPagination,
  );
  const [role, setRole] = useState<CareerRoleFilter>("All Roles");
  const [branch, setBranch] = useState<CareerBranchFilter>("All Branches");
  const [type, setType] = useState<CareerTypeFilter>("Job Type");
  const [page, setPage] = useState(initialPagination?.page ?? 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const skipInitialFetch = useRef(true);

  const branchFilters: CareerBranchFilter[] = [
    "All Branches",
    ...branchOptions.map((item) => item.name),
  ];

  const fetchCareers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const branchId =
        branch === "All Branches"
          ? undefined
          : branchOptions.find((item) => item.name === branch)?.id;

      const data = await careersService.listCareers({
        page,
        limit: CAREERS_PAGE_LIMIT,
        category: role === "All Roles" ? undefined : ROLE_TO_CATEGORY[role],
        employmentType:
          type === "Job Type" ? undefined : TYPE_TO_EMPLOYMENT[type],
        branchId,
      });

      setJobs(mapCareerOpeningsToJobs(data.items));
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to load career openings.",
      );
      setJobs([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [branch, branchOptions, page, role, type]);

  useEffect(() => {
    const isDefaultQuery =
      role === "All Roles" &&
      branch === "All Branches" &&
      type === "Job Type" &&
      page === (initialPagination?.page ?? 1);

    if (skipInitialFetch.current && isDefaultQuery) {
      skipInitialFetch.current = false;
      return;
    }

    skipInitialFetch.current = false;
    void fetchCareers();
  }, [branch, fetchCareers, initialPagination?.page, page, role, type]);

  const setRoleFilter = (value: CareerRoleFilter) => {
    setRole(value);
    setPage(1);
  };

  const setBranchFilter = (value: CareerBranchFilter) => {
    setBranch(value);
    setPage(1);
  };

  const setTypeFilter = (value: CareerTypeFilter) => {
    setType(value);
    setPage(1);
  };

  const goToPreviousPage = () => {
    if (pagination?.hasPrevPage) {
      setPage((current) => Math.max(1, current - 1));
    }
  };

  const goToNextPage = () => {
    if (pagination?.hasNextPage) {
      setPage((current) => current + 1);
    }
  };

  return {
    jobs,
    pagination,
    role,
    branch,
    type,
    branchFilters,
    loading,
    error,
    setRoleFilter,
    setBranchFilter,
    setTypeFilter,
    goToPreviousPage,
    goToNextPage,
    refetch: fetchCareers,
  };
}
