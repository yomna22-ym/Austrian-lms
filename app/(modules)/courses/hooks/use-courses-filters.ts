"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  courseMatchesBranchFilter,
  resolveCourseBranch,
} from "@/app/(modules)/home/utils/branch-filter.utils";
import type { ActiveFilterChip } from "@/app/shared/types/filter.types";
import type {
  CourseFilters,
  CourseItem,
  CourseSchedule,
  DayAbbrev,
} from "../types/course.types";

const DEFAULT_DAYS: DayAbbrev[] = ["Mon", "Tue", "Wed"];

const DEFAULT_FILTERS: CourseFilters = {
  selectedDays: DEFAULT_DAYS,
  category: "all",
  branch: "all",
  level: "all",
  schedules: [],
  startMonth: "all",
  format: "all",
};

function hasDayOverlap(
  courseDays: readonly DayAbbrev[],
  selectedDays: DayAbbrev[],
): boolean {
  if (selectedDays.length === 0) return true;
  return courseDays.some((day) => selectedDays.includes(day));
}

function filterCourses(
  courses: readonly CourseItem[],
  filters: CourseFilters,
  branchQuery: string | null,
): CourseItem[] {
  return courses.filter((course) => {
    if (!hasDayOverlap(course.daysList, filters.selectedDays)) return false;
    if (filters.category !== "all" && course.category !== filters.category) {
      return false;
    }
    if (
      !courseMatchesBranchFilter(course.branch, filters.branch, branchQuery)
    ) {
      return false;
    }
    if (filters.level !== "all" && course.level !== filters.level) return false;
    if (
      filters.schedules.length > 0 &&
      !filters.schedules.some((schedule) => course.schedules.includes(schedule))
    ) {
      return false;
    }
    if (
      filters.startMonth !== "all" &&
      course.startMonth !== filters.startMonth
    ) {
      return false;
    }
    if (filters.format !== "all" && course.format !== filters.format) {
      return false;
    }
    return true;
  });
}

function getActiveFilterCount(filters: CourseFilters): number {
  let count = 0;
  const defaultDaysKey = DEFAULT_DAYS.join(",");
  const selectedDaysKey = [...filters.selectedDays].sort().join(",");
  if (selectedDaysKey !== defaultDaysKey) count++;
  if (filters.category !== "all") count++;
  if (filters.branch !== "all") count++;
  if (filters.level !== "all") count++;
  if (filters.schedules.length > 0) count++;
  if (filters.startMonth !== "all") count++;
  if (filters.format !== "all") count++;
  return count;
}

interface UseCoursesFiltersOptions {
  initialBranch?: string | null;
}

export function useCoursesFilters(
  courses: readonly CourseItem[],
  options: UseCoursesFiltersOptions = {},
) {
  const branchQuery = options.initialBranch?.trim() || null;

  const initialBranchFilter = useMemo(() => {
    if (!branchQuery) return DEFAULT_FILTERS.branch;
    return resolveCourseBranch(branchQuery) ?? DEFAULT_FILTERS.branch;
  }, [branchQuery]);

  const [filters, setFilters] = useState<CourseFilters>(() => ({
    ...DEFAULT_FILTERS,
    branch: initialBranchFilter,
  }));
  const [appliedBranchQuery, setAppliedBranchQuery] = useState<string | null>(
    branchQuery,
  );
  const filterKeyRef = useRef(0);
  const [filterKey, setFilterKey] = useState(0);

  const bumpFilterKey = () => {
    filterKeyRef.current += 1;
    setFilterKey(filterKeyRef.current);
  };

  useEffect(() => {
    if (!branchQuery) return;

    setAppliedBranchQuery(branchQuery);
    const resolvedBranch = resolveCourseBranch(branchQuery);

    setFilters((current) => {
      const nextBranch = resolvedBranch ?? "all";
      if (current.branch === nextBranch) return current;
      return { ...current, branch: nextBranch };
    });
    bumpFilterKey();
  }, [branchQuery]);

  const filteredCourses = useMemo(
    () => filterCourses(courses, filters, appliedBranchQuery),
    [appliedBranchQuery, courses, filters],
  );

  const activeFilterCount = useMemo(
    () => getActiveFilterCount(filters),
    [filters],
  );

  const setSelectedDays = (selectedDays: DayAbbrev[]) => {
    setFilters((current) => ({ ...current, selectedDays }));
    bumpFilterKey();
  };

  const setCategory = (category: CourseFilters["category"]) => {
    setFilters((current) => ({ ...current, category }));
    bumpFilterKey();
  };

  const setBranch = (branch: CourseFilters["branch"]) => {
    if (branch !== "all") {
      setAppliedBranchQuery(null);
    }
    setFilters((current) => ({ ...current, branch }));
    bumpFilterKey();
  };

  const setLevel = (level: CourseFilters["level"]) => {
    setFilters((current) => ({ ...current, level }));
    bumpFilterKey();
  };

  const toggleSchedule = (schedule: CourseSchedule) => {
    setFilters((current) => {
      const exists = current.schedules.includes(schedule);
      return {
        ...current,
        schedules: exists
          ? current.schedules.filter((item) => item !== schedule)
          : [...current.schedules, schedule],
      };
    });
    bumpFilterKey();
  };

  const setStartMonth = (startMonth: CourseFilters["startMonth"]) => {
    setFilters((current) => ({ ...current, startMonth }));
    bumpFilterKey();
  };

  const setFormat = (format: CourseFilters["format"]) => {
    setFilters((current) => ({ ...current, format }));
    bumpFilterKey();
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setAppliedBranchQuery(null);
    bumpFilterKey();
  };

  const activeChips = useMemo((): ActiveFilterChip[] => {
    const chips: ActiveFilterChip[] = [];
    const defaultDaysKey = DEFAULT_DAYS.join(",");
    const selectedDaysKey = [...filters.selectedDays].sort().join(",");

    if (selectedDaysKey !== defaultDaysKey) {
      chips.push({
        id: "days",
        label: `Days: ${filters.selectedDays.join(", ")}`,
        onRemove: () => setSelectedDays(DEFAULT_DAYS),
      });
    }
    if (filters.category !== "all") {
      chips.push({
        id: "category",
        label: filters.category,
        onRemove: () => setCategory("all"),
      });
    }
    if (filters.branch !== "all") {
      chips.push({
        id: "branch",
        label: filters.branch,
        onRemove: () => setBranch("all"),
      });
    }
    if (filters.level !== "all") {
      chips.push({
        id: "level",
        label: filters.level,
        onRemove: () => setLevel("all"),
      });
    }
    for (const schedule of filters.schedules) {
      chips.push({
        id: `schedule-${schedule}`,
        label: schedule.includes("Morning") ? "Morning" : "Evening",
        onRemove: () => toggleSchedule(schedule),
      });
    }
    if (filters.startMonth !== "all") {
      chips.push({
        id: "month",
        label: `Starts ${filters.startMonth}`,
        onRemove: () => setStartMonth("all"),
      });
    }
    if (filters.format !== "all") {
      chips.push({
        id: "format",
        label: filters.format,
        onRemove: () => setFormat("all"),
      });
    }
    return chips;
  }, [filters]);

  return {
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
  };
}
