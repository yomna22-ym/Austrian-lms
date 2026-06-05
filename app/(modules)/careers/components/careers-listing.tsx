"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "@/app/shared/Dropdown";
import {
  CAREER_BRANCH_FILTERS,
  CAREER_JOBS,
  CAREER_ROLE_FILTERS,
  CAREER_TYPE_FILTERS,
} from "../utils";
import CareerJobCard from "./career-job-card";

type RoleFilter = (typeof CAREER_ROLE_FILTERS)[number];
type BranchFilter = (typeof CAREER_BRANCH_FILTERS)[number];
type TypeFilter = (typeof CAREER_TYPE_FILTERS)[number];

const FILTER_DROPDOWN_CLASS =
  "h-[36px] border-[#efcaca] text-[12px] font-medium sm:w-[185px]";

export default function CareersListing() {
  const [role, setRole] = useState<RoleFilter>("All Roles");
  const [branch, setBranch] = useState<BranchFilter>("All Branches");
  const [type, setType] = useState<TypeFilter>("Job Type");

  const filteredJobs = useMemo(
    () =>
      CAREER_JOBS.filter((job) => {
        const roleMatches = role === "All Roles" || job.role === role;
        const branchMatches =
          branch === "All Branches" || job.branch === branch;
        const typeMatches = type === "Job Type" || job.type === type;

        return roleMatches && branchMatches && typeMatches;
      }),
    [branch, role, type]
  );

  return (
    <section
      id="open-positions"
      className="w-full px-4 pb-14 pt-16 sm:px-6 lg:px-16 lg:pb-18 lg:pt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-[#efd7d7] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {CAREER_ROLE_FILTERS.map((item) => {
              const active = role === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={[
                    "h-[36px] rounded-full border px-5 text-[12px] font-semibold transition-all",
                    active
                      ? "border-secondary bg-secondary text-white shadow-[0_8px_18px_rgba(185,19,23,0.18)]"
                      : "border-[#efcaca] bg-white text-text-secondary hover:border-secondary/60 hover:text-secondary",
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
              options={CAREER_BRANCH_FILTERS}
              onChange={setBranch}
              ariaLabel="Filter by branch"
              buttonClassName={FILTER_DROPDOWN_CLASS}
              menuClassName="sm:w-[185px]"
            />
            <Dropdown
              value={type}
              options={CAREER_TYPE_FILTERS}
              onChange={setType}
              ariaLabel="Filter by job type"
              buttonClassName={FILTER_DROPDOWN_CLASS}
              menuClassName="sm:w-[185px]"
            />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredJobs.map((job) => (
            <CareerJobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="mt-14 rounded-[12px] border border-dashed border-[#efd7d7] bg-white px-6 py-12 text-center text-sm text-text-secondary">
            No open roles match these filters.
          </div>
        )}

        <div className="mt-10 flex items-center justify-end gap-5">
          <div className="hidden items-center gap-3 sm:flex">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  dot === 0 ? "bg-secondary" : "bg-[#dfe5e5]",
                ].join(" ")}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous roles"
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ead4d4] bg-white text-text-secondary shadow-sm transition-colors hover:text-secondary"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next roles"
              className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-secondary text-white shadow-sm transition-all hover:brightness-110"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
