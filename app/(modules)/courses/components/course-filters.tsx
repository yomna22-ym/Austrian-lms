import {
  Banknote,
  BarChart3,
  CalendarClock,
  ChevronDown,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  COURSE_FORMATS,
  COURSE_LEVEL_FILTERS,
  COURSE_MONTHS,
} from "../utils";

const chipBase =
  "inline-flex h-8 min-w-0 items-center justify-center rounded-md border px-3 text-[12px] font-bold transition-colors";

const SectionTitle = ({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 text-[13px] font-bold text-text-primary">
    <span className="flex h-4 w-4 items-center justify-center text-text-primary">
      {icon}
    </span>
    <span>{label}</span>
  </div>
);

export default function CourseFilters() {
  return (
    <aside className="w-full nav:w-[248px] nav:shrink-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[20px] font-bold text-text-primary">Filters</h2>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[11px] font-bold text-secondary transition-opacity hover:opacity-75"
        >
          Reset Filters
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-11 flex flex-col gap-8">
        <section className="border-b border-[#eeeeee] pb-8">
          <div className="flex items-center justify-between">
            <SectionTitle icon={<BarChart3 size={15} />} label="Level" />
            <ChevronDown size={16} className="text-text-secondary" aria-hidden="true" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {COURSE_LEVEL_FILTERS.map((level) => (
              <button
                key={level}
                type="button"
                aria-pressed={level === "A1-A2"}
                className={[
                  chipBase,
                  level === "A1-A2"
                    ? "border-secondary bg-secondary text-white"
                    : "border-transparent bg-[#e9e7e7] text-[#6f6262]",
                ].join(" ")}
              >
                {level}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label
            htmlFor="course-branch"
            className="text-[13px] font-bold text-text-primary"
          >
            Branchs
          </label>
          <div className="relative mt-4">
            <select
              id="course-branch"
              defaultValue=""
              className="h-12 w-full appearance-none rounded-input border border-[#e6e6e6] bg-[#eeeeee] px-4 text-[15px] font-medium text-[#9b9b9b] outline-none transition-colors focus:border-secondary"
            >
              <option value="">All Locations</option>
            </select>
          </div>
        </section>

        <section className="border-b border-[#eeeeee] pb-6">
          <SectionTitle
            icon={<CalendarClock size={16} />}
            label="Schedule"
          />
          <div className="mt-4 flex flex-col gap-3">
            {["Morning (9:00 - 12:00)", "Evening (18:00 - 21:00)", "Weekends Only"].map(
              (schedule) => (
                <label
                  key={schedule}
                  className="flex items-center gap-3 text-[14px] font-semibold text-[#6d5f5f]"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#dcdcdc] accent-secondary"
                  />
                  {schedule}
                </label>
              )
            )}
          </div>
        </section>

        <section>
          <h3 className="text-[16px] font-bold text-text-primary">Start Month</h3>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {COURSE_MONTHS.map((month) => (
              <button
                key={month}
                type="button"
                aria-pressed={month === "Feb"}
                className={[
                  "h-8 rounded-md border text-[13px] font-bold transition-colors",
                  month === "Feb"
                    ? "border-secondary bg-secondary text-white"
                    : "border-[#dddddd] bg-white text-text-primary",
                ].join(" ")}
              >
                {month}
              </button>
            ))}
          </div>
        </section>

        <section className="border-b border-[#eeeeee] pb-7">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle icon={<Banknote size={16} />} label="Price Range" />
            <span className="text-[15px] font-bold text-secondary">2230 EGP</span>
          </div>
          <input
            type="range"
            min="0"
            max="6000"
            defaultValue="2230"
            className="mt-5 h-2 w-full accent-secondary"
            aria-label="Price range"
          />
          <div className="mt-2 flex justify-between text-[13px] font-semibold text-[#8a8a8a]">
            <span>0 EGP</span>
            <span>6000 EGP</span>
          </div>
        </section>

        <section>
          <SectionTitle icon={<SlidersHorizontal size={16} />} label="Format" />
          <div className="mt-4 grid grid-cols-3 rounded-lg bg-[#eeeeee] p-1">
            {COURSE_FORMATS.map((format) => (
              <button
                key={format}
                type="button"
                aria-pressed={format === "All"}
                className={[
                  "h-9 rounded-md text-[12px] font-bold transition-colors",
                  format === "All"
                    ? "bg-secondary text-white shadow-sm"
                    : "text-[#777777] hover:text-text-primary",
                ].join(" ")}
              >
                {format}
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
