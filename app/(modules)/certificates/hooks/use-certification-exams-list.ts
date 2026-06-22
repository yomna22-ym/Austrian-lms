"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { matchesBranchName } from "@/app/(modules)/home/utils/branch-filter.utils";
import { ApiError } from "@/lib/api/errors";
import type {
  CertificationExam,
  CertificationExamsPaginatedResponse,
} from "@/types/webhook/certification-exams";
import { certificationExamsService } from "../services/certification-exams.service";

const PAGE_LIMIT = 6;

interface UseCertificationExamsListOptions {
  initialExams: CertificationExam[];
  initialPagination: CertificationExamsPaginatedResponse["pagination"] | null;
  officialCertOptions: Array<{ id: string; label: string }>;
  initialBranch?: string | null;
}

export function useCertificationExamsList({
  initialExams,
  initialPagination,
  officialCertOptions,
  initialBranch = null,
}: UseCertificationExamsListOptions) {
  const [exams, setExams] = useState(initialExams);
  const [pagination, setPagination] = useState(initialPagination);
  const [certFilter, setCertFilter] = useState<string>("");
  const [branchFilter, setBranchFilter] = useState(initialBranch ?? "");
  const [page, setPage] = useState(initialPagination?.page ?? 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const skipInitialFetch = useRef(true);

  useEffect(() => {
    setBranchFilter(initialBranch ?? "");
  }, [initialBranch]);

  const filteredExams = useMemo(() => {
    if (!branchFilter) return exams;
    return exams.filter((exam) =>
      matchesBranchName(exam.addressName, branchFilter),
    );
  }, [branchFilter, exams]);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await certificationExamsService.listExams({
        officialCertificationId: certFilter || undefined,
        page,
        limit: PAGE_LIMIT,
      });
      setExams(data.items);
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Failed to load exam sessions.",
      );
      setExams([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [certFilter, page]);

  useEffect(() => {
    const isDefault =
      certFilter === "" && page === (initialPagination?.page ?? 1);

    if (skipInitialFetch.current && isDefault) {
      skipInitialFetch.current = false;
      return;
    }

    skipInitialFetch.current = false;
    void fetchExams();
  }, [certFilter, fetchExams, initialPagination?.page, page]);

  const setCertFilterReset = (value: string) => {
    setCertFilter(value);
    setPage(1);
  };

  return {
    exams: filteredExams,
    allExams: exams,
    pagination,
    certFilter,
    branchFilter,
    setBranchFilter,
    setCertFilter: setCertFilterReset,
    page,
    setPage,
    loading,
    error,
    officialCertOptions,
    goToPreviousPage: () => {
      if (pagination?.hasPrevPage) setPage((p) => Math.max(1, p - 1));
    },
    goToNextPage: () => {
      if (pagination?.hasNextPage) setPage((p) => p + 1);
    },
  };
}
