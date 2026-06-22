"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import Dropdown from "@/app/shared/Dropdown";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
import {
  CAREER_ROLE_FILTERS,
  CAREER_TYPE_FILTERS,
} from "../utils";
import { useCareersList } from "../hooks";
import type { CareerBranchOption, CareerJob } from "../types";
import type { PaginationMeta } from "@/types/api";
import CareerApplyModal from "./career-apply-modal";
import CareerJobCard from "./career-job-card";

const FILTER_DROPDOWN_CLASS =
  "h-11 border-[#eadede] text-[12px] font-semibold shadow-[0_1px_2px_rgba(17,19,21,0.04)] sm:w-[190px]";

interface CareersListingProps {
  initialJobs: CareerJob[];
  initialPagination: PaginationMeta | null;
  branchOptions: CareerBranchOption[];
}

export default function CareersListing({
  initialJobs,
  initialPagination,
  branchOptions,
}: CareersListingProps) {
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const {
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
  } = useCareersList({ initialJobs, initialPagination, branchOptions });

  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;

  return (
    <>
      <MotionSection
        id="open-positions"
        className="w-full px-4 pb-14 pt-16 sm:px-6 lg:px-16 lg:pb-20 lg:pt-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeader
              align="left"
              eyebrow="Open roles"
              title="Find the role that fits your next step"
              description="Filter by team, branch, and work type to get to the right opportunity quickly."
            />
            {pagination ? (
              <MotionDiv
                delay={0.08}
                className="rounded-[14px] border border-[#eadede] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)]"
              >
                <span className="block text-[12px] font-semibold text-text-secondary">
                  Available positions
                </span>
                <strong className="mt-1 block text-3xl font-bold leading-none text-secondary">
                  {pagination.total}
                </strong>
              </MotionDiv>
            ) : null}
          </div>

          <MotionDiv
            delay={0.12}
            className="mt-8 rounded-[18px] border border-[#eadede] bg-white p-4 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] sm:p-5"
          >
            <div className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-text-secondary">
              <SlidersHorizontal
                className="h-4 w-4 text-secondary"
                aria-hidden="true"
              />
              Refine results
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {CAREER_ROLE_FILTERS.map((item) => {
                  const active = role === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRoleFilter(item)}
                      className={[
                        "h-11 rounded-full border px-5 text-[12px] font-semibold shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:ring-offset-2",
                        active
                          ? "border-secondary bg-secondary text-white shadow-[0_8px_18px_rgba(185,19,23,0.18)]"
                          : "border-[#eadede] bg-white text-text-secondary hover:border-secondary/60 hover:text-secondary",
                      ].join(" ")}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Dropdown
                  value={branch}
                  options={branchFilters}
                  onChange={setBranchFilter}
                  ariaLabel="Filter by branch"
                  buttonClassName={FILTER_DROPDOWN_CLASS}
                  menuClassName="sm:w-[185px]"
                />
                <Dropdown
                  value={type}
                  options={CAREER_TYPE_FILTERS}
                  onChange={setTypeFilter}
                  ariaLabel="Filter by job type"
                  buttonClassName={FILTER_DROPDOWN_CLASS}
                  menuClassName="sm:w-[185px]"
                />
              </div>
            </div>
          </MotionDiv>

          {error ? (
            <div className="mt-14 rounded-[12px] border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div
            className={[
              "mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2",
              loading ? "opacity-60" : "",
            ].join(" ")}
            aria-busy={loading}
          >
            {jobs.map((job) => (
              <CareerJobCard
                key={job.id}
                job={job}
                onApply={setSelectedJob}
              />
            ))}
          </div>

          {!loading && jobs.length === 0 && !error ? (
            <div className="mt-10 rounded-[18px] border border-dashed border-[#eadede] bg-white px-6 py-14 text-center shadow-[0_1px_2px_rgba(17,19,21,0.04),0_16px_36px_rgba(17,19,21,0.055)]">
              <h3 className="text-lg font-bold text-text-primary">
                No roles match these filters
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-secondary">
                Try broadening the role, branch, or job type filters to see more opportunities.
              </p>
            </div>
          ) : null}

          {pagination && totalPages > 1 ? (
            <div className="mt-10 flex items-center justify-between gap-5">
              <p className="text-sm text-text-secondary">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  aria-label="Previous page"
                  onClick={goToPreviousPage}
                  disabled={!pagination.hasPrevPage || loading}
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ead4d4] bg-white text-text-secondary shadow-sm transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next page"
                  onClick={goToNextPage}
                  disabled={!pagination.hasNextPage || loading}
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-secondary text-white shadow-sm transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </MotionSection>

      <CareerApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </>
  );
}
