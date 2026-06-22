"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import ActiveFilterChips from "@/app/shared/ActiveFilterChips";
import type { CourseFilters, CourseItem } from "../types/course.types";
import { useCoursesFilters } from "../hooks/use-courses-filters";
import { COURSES, TOTAL_COURSE_COUNT } from "../utils";
import CourseCardGrid from "./course-card-grid";
import CourseFiltersSidebar from "./course-filters";

interface CoursesListingProps {
  initialBranch?: string | null;
}

export default function CoursesListing({ initialBranch }: CoursesListingProps) {
  const {
    filters,
    filterKey,
    filteredCourses,
    activeFilterCount,
    activeChips,
    setSelectedDays,
    setCategory,
    setBranch,
    setLevel,
    toggleSchedule,
    setStartMonth,
    setFormat,
    clearAllFilters,
  } = useCoursesFilters(COURSES, { initialBranch });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const sidebar = (
    <CourseFiltersSidebar
      filters={filters}
      activeFilterCount={activeFilterCount}
      onDaysChange={setSelectedDays}
      onCategoryChange={setCategory}
      onBranchChange={setBranch}
      onLevelChange={setLevel}
      onScheduleToggle={toggleSchedule}
      onMonthChange={setStartMonth}
      onFormatChange={setFormat}
      onClearAll={clearAllFilters}
      onClose={() => setDrawerOpen(false)}
    />
  );

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 nav:px-8 lg:px-16 lg:py-14">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm font-medium text-text-secondary">
            <span className="font-bold text-text-primary tabular-nums">
              {filteredCourses.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-text-primary tabular-nums">
              {TOTAL_COURSE_COUNT}
            </span>{" "}
            courses
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-input-border bg-white px-4 py-2 text-sm font-medium text-text-primary shadow-sm transition-all hover:border-secondary/40 hover:shadow-md active:scale-95"
          >
            <SlidersHorizontal size={16} className="text-secondary" />
            Filters
            {activeFilterCount > 0 ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(260px,300px)_1fr] lg:gap-12">
          <div className="hidden lg:block">{sidebar}</div>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="hidden flex-col gap-4 lg:flex">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-text-secondary">
                  Showing{" "}
                  <span className="font-bold text-text-primary tabular-nums">
                    {filteredCourses.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-text-primary tabular-nums">
                    {TOTAL_COURSE_COUNT}
                  </span>{" "}
                  courses
                </p>
                {activeFilterCount > 0 ? (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="flex items-center gap-1.5 text-sm font-medium text-secondary transition-opacity hover:opacity-70"
                  >
                    <X size={14} />
                    Clear filters
                  </button>
                ) : null}
              </div>
              <ActiveFilterChips
                chips={activeChips}
                onClearAll={clearAllFilters}
              />
            </div>

            {activeFilterCount > 0 ? (
              <div className="lg:hidden">
                <ActiveFilterChips
                  chips={activeChips}
                  onClearAll={clearAllFilters}
                />
              </div>
            ) : null}

            <CourseCardGrid
              courses={filteredCourses}
              filterKey={filterKey}
              totalCount={TOTAL_COURSE_COUNT}
              activeBranch={filters.branch}
            />
          </div>
        </div>
      </div>

      {drawerOpen ? (
        <div
          className="animate-events-backdrop-in fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      {drawerOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Course filters"
          className="animate-events-drawer-in fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-input-border px-5 py-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-secondary" />
              <span className="text-base font-semibold text-text-primary">
                Filters
              </span>
              {activeFilterCount > 0 ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[#fff7f7] hover:text-text-primary"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">{sidebar}</div>

          <div className="shrink-0 border-t border-input-border px-5 py-4">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="w-full rounded-full bg-secondary py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Show {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "Course" : "Courses"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
