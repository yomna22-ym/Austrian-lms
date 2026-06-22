"use client";

import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  Globe2,
  SlidersHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import type {
  CourseFilters,
  CourseSchedule,
  DayAbbrev,
} from "../types/course.types";
import {
  COURSE_CATEGORIES,
  COURSE_BRANCHES,
  COURSE_DAYS,
  COURSE_FORMATS,
  COURSE_MONTHS,
  COURSE_SCHEDULES,
} from "../utils";

interface CourseFiltersSidebarProps {
  filters: CourseFilters;
  activeFilterCount: number;
  onDaysChange: (days: DayAbbrev[]) => void;
  onCategoryChange: (category: CourseFilters["category"]) => void;
  onBranchChange: (branch: CourseFilters["branch"]) => void;
  onLevelChange: (level: CourseFilters["level"]) => void;
  onScheduleToggle: (schedule: CourseSchedule) => void;
  onMonthChange: (month: CourseFilters["startMonth"]) => void;
  onFormatChange: (format: CourseFilters["format"]) => void;
  onClearAll: () => void;
  onClose?: () => void;
}

const SelectBox = ({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon?: ReactNode;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? value;

  return (
    <section>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
        {icon}
        <span>{label}</span>
      </div>
      <div className="relative mt-3">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen((current) => !current)}
          className={[
            "flex h-11 w-full items-center justify-between rounded-input border bg-white px-4 text-left text-sm font-medium text-text-primary outline-none transition-all duration-150",
            dropdownOpen
              ? "border-secondary/50 ring-2 ring-secondary/10"
              : "border-input-border hover:border-secondary/30",
          ].join(" ")}
        >
          <span>{selectedLabel}</span>
          <ChevronDown
            className={[
              "h-4 w-4 text-text-secondary transition-transform duration-200",
              dropdownOpen ? "rotate-180" : "",
            ].join(" ")}
            strokeWidth={2.1}
            aria-hidden="true"
          />
        </button>

        {dropdownOpen ? (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-xl border border-input-border bg-white shadow-[0_12px_28px_rgba(17,19,21,0.1)]"
          >
            {options.map((option) => {
              const active = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(option.value);
                    setDropdownOpen(false);
                  }}
                  className={[
                    "flex h-10 w-full items-center px-4 text-left text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-white"
                      : "text-text-primary hover:bg-[#fff7f7]",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

function daysSummary(days: DayAbbrev[]): string {
  if (days.length === 0) return "None";
  if (days.length === 7) return "All days";
  if (days.length <= 3) return days.join(" → ");
  return `${days.length} days`;
}

export default function CourseFiltersSidebar({
  filters,
  activeFilterCount,
  onDaysChange,
  onCategoryChange,
  onBranchChange,
  onLevelChange,
  onScheduleToggle,
  onMonthChange,
  onFormatChange,
  onClearAll,
}: CourseFiltersSidebarProps) {
  const toggleDay = (day: DayAbbrev) => {
    const exists = filters.selectedDays.includes(day);
    onDaysChange(
      exists
        ? filters.selectedDays.filter((item) => item !== day)
        : [...filters.selectedDays, day],
    );
  };

  return (
    <aside className="flex flex-col gap-8">
      <div className="hidden items-center gap-2 lg:flex">
        <SlidersHorizontal size={18} className="text-secondary" />
        <h2 className="text-lg font-bold text-text-primary">Filters</h2>
      </div>

      <section>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            <CalendarDays className="h-4 w-4" strokeWidth={2.1} aria-hidden="true" />
            <span>Available Days</span>
          </div>
          <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold text-secondary">
            {daysSummary(filters.selectedDays)}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {COURSE_DAYS.map((day) => {
            const active = filters.selectedDays.includes(day);

            return (
              <button
                key={day}
                type="button"
                aria-pressed={active}
                onClick={() => toggleDay(day)}
                className={[
                  "h-9 rounded-lg text-[11px] font-bold transition-all duration-200",
                  active
                    ? "bg-secondary text-white shadow-[0_2px_8px_rgba(185,19,23,0.25)] scale-[1.02]"
                    : "border border-input-border bg-white text-text-primary hover:border-secondary/30 active:scale-95",
                ].join(" ")}
              >
                {day}
              </button>
            );
          })}
        </div>
      </section>

      <SelectBox
        label="Course Category"
        value={filters.category}
        options={[
          { value: "all", label: "All categories" },
          ...COURSE_CATEGORIES.map((item) => ({ value: item, label: item })),
        ]}
        onChange={(value) =>
          onCategoryChange(value as CourseFilters["category"])
        }
      />

      <SelectBox
        label="Branch"
        value={filters.branch}
        options={[
          { value: "all", label: "All branches" },
          ...COURSE_BRANCHES.map((item) => ({ value: item, label: item })),
        ]}
        onChange={(value) => onBranchChange(value as CourseFilters["branch"])}
      />

      <SelectBox
        label="Level"
        icon={<BarChart3 className="h-4 w-4" strokeWidth={2.3} aria-hidden="true" />}
        value={filters.level}
        options={[
          { value: "all", label: "All levels" },
          { value: "A1-A2", label: "A1-A2" },
          { value: "B1-B2", label: "B1-B2" },
          { value: "C1-C2", label: "C1-C2" },
        ]}
        onChange={(value) => onLevelChange(value as CourseFilters["level"])}
      />

      <section>
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          Schedule
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          {COURSE_SCHEDULES.map((schedule) => (
            <label
              key={schedule}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-1 py-0.5 text-sm text-text-primary transition-colors hover:border-secondary/10"
            >
              <input
                type="checkbox"
                checked={filters.schedules.includes(schedule)}
                onChange={() => onScheduleToggle(schedule)}
                className="h-4 w-4 rounded border-input-border accent-secondary"
              />
              <span className="font-medium group-hover:text-secondary">
                {schedule}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          Start Month
        </h3>
        <div className="mt-4 grid grid-cols-4 gap-2">
          <button
            type="button"
            aria-pressed={filters.startMonth === "all"}
            onClick={() => onMonthChange("all")}
            className={[
              "col-span-4 h-9 rounded-lg border text-xs font-bold transition-all duration-200",
              filters.startMonth === "all"
                ? "border-secondary bg-secondary text-white"
                : "border-input-border bg-white text-text-primary hover:border-secondary/30",
            ].join(" ")}
          >
            Any month
          </button>
          {COURSE_MONTHS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filters.startMonth === item}
              onClick={() => onMonthChange(item)}
              className={[
                "h-9 rounded-lg border text-xs font-bold transition-all duration-200",
                filters.startMonth === item
                  ? "border-secondary bg-secondary text-white shadow-[0_2px_6px_rgba(185,19,23,0.2)]"
                  : "border-input-border bg-white text-text-primary hover:border-secondary/30 active:scale-95",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          <Globe2 className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          <span>Format</span>
        </div>
        <div className="mt-4 grid grid-cols-3 rounded-xl bg-[#f8f4f4] p-1">
          {COURSE_FORMATS.map((item) => {
            const value = item === "All" ? "all" : item;
            const active = filters.format === value;

            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  onFormatChange(value as CourseFilters["format"])
                }
                className={[
                  "h-9 rounded-lg text-[11px] font-bold transition-all duration-200",
                  active
                    ? "bg-secondary text-white shadow-sm"
                    : "text-text-primary hover:bg-white",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {activeFilterCount > 0 ? (
        <button
          type="button"
          onClick={onClearAll}
          className="hidden rounded-full border border-secondary/30 py-2.5 text-sm font-semibold text-secondary transition-all hover:bg-secondary/5 lg:block"
        >
          Clear all filters ({activeFilterCount})
        </button>
      ) : null}
    </aside>
  );
}
