"use client";

import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  Trash2,
  X,
} from "lucide-react";
import { COURSE_MONTHS } from "../utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const schedules = ["Morning (9:00 - 12:00)", "Evening (18:00 - 21:00)"] as const;

const SelectBox = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section>
      {label ? (
        <label className="text-[13px] font-bold tracking-[0.02em] text-[#242424]">
          {label}
        </label>
      ) : null}
      <div className="relative mt-3">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen((current) => !current)}
          className={[
            "flex h-11 w-full items-center justify-between rounded-[10px] border bg-[#f1f1f3] px-4 text-left text-[14px] font-semibold text-[#777777] outline-none transition-colors",
            dropdownOpen ? "border-[#d10012]" : "border-[#e3e3e3] hover:border-[#d5d5d5]",
          ].join(" ")}
        >
          <span>{value}</span>
          <ChevronDown
            className={[
              "h-5 w-5 text-[#666666] transition-transform",
              dropdownOpen ? "rotate-180" : "",
            ].join(" ")}
            strokeWidth={2.1}
            aria-hidden="true"
          />
        </button>

        {dropdownOpen ? (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[12px] border border-[#dedede] bg-white shadow-[0_12px_24px_rgba(17,19,21,0.12)]"
          >
            {options.map((option) => {
              const active = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(option);
                    setDropdownOpen(false);
                  }}
                  className={[
                    "flex h-9 w-full items-center px-4 text-left text-[14px] font-semibold transition-colors",
                    active
                      ? "bg-[#777777] text-white"
                      : "bg-white text-[#777777] hover:bg-[#f1f1f3]",
                  ].join(" ")}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

const LevelSelectBox = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <section>
    <div className="flex items-center gap-2 text-[13px] font-bold text-[#242424]">
      <BarChart3 className="h-4 w-4" strokeWidth={2.3} aria-hidden="true" />
      <span>Level</span>
    </div>
    <SelectBox
      label=""
      value={value}
      options={["All level", "A1-A2", "B1-B2", "C1-C2"]}
      onChange={onChange}
    />
  </section>
);

export default function CourseFilters() {
  const [open, setOpen] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Tue", "Wed"]);
  const [category, setCategory] = useState("Standard");
  const [branch, setBranch] = useState("Maadi");
  const [level, setLevel] = useState("All level");
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [month, setMonth] = useState("Feb");

  const resetFilters = () => {
    setSelectedDays(["Mon", "Tue", "Wed"]);
    setCategory("Standard");
    setBranch("Maadi");
    setLevel("All level");
    setSelectedSchedules([]);
    setMonth("Feb");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-12 w-full items-center justify-center rounded-[12px] bg-[#c90f18] text-[15px] font-bold text-white nav:w-[300px] nav:shrink-0"
      >
        Open Filters
      </button>
    );
  }

  return (
    <aside className="w-full overflow-hidden rounded-[18px] border border-[#eeeeee] bg-white shadow-[0_12px_32px_rgba(17,19,21,0.08)] nav:w-[300px] nav:shrink-0">
      <div className="flex h-[64px] items-center justify-end border-b border-[#ececec] px-5">
        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f0f0] text-[#1f1f1f] transition-colors hover:bg-[#e5e5e5]"
        >
          <X className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
        </button>
      </div>

      <div className="px-5 py-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[20px] font-bold text-[#242424]">Filters</h2>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#d10012] transition-opacity hover:opacity-75"
          >
            Reset Filters
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-9 flex flex-col gap-7">
          <section className="border-b border-[#eeeeee] pb-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[13px] font-bold text-[#242424]">
                <CalendarDays className="h-4 w-4" strokeWidth={2.1} aria-hidden="true" />
                <span>Available Days</span>
              </div>
              <span className="rounded-full bg-[#c90f18] px-2.5 py-1 text-[10px] font-bold text-white">
                Mon -&gt; Wed
              </span>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1.5">
              {days.map((day) => {
                const active = selectedDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedDays((current) =>
                        active
                          ? current.filter((item) => item !== day)
                          : [...current, day]
                      )
                    }
                    className={[
                      "h-8 rounded-[4px] text-[11px] font-bold transition-colors",
                      active
                        ? "bg-[#c90f18] text-white"
                        : "bg-[#efefef] text-[#242424] hover:bg-[#e5e5e5]",
                    ].join(" ")}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </section>

          <SelectBox
            label="Course category"
            value={category}
            options={["Standard", "Intensive", "Conversation"]}
            onChange={setCategory}
          />
          <SelectBox
            label="Branchs"
            value={branch}
            options={["Maadi", "Zamalek", "New Cairo"]}
            onChange={setBranch}
          />

          <LevelSelectBox value={level} onChange={setLevel} />

          <section>
            <h3 className="text-[15px] font-bold text-[#242424]">Schedule</h3>
            <div className="mt-4 flex flex-col gap-3">
              {schedules.map((schedule) => (
                <label
                  key={schedule}
                  className="flex cursor-pointer items-center gap-3 text-[14px] font-normal text-[#242424]"
                >
                  <input
                    type="checkbox"
                    checked={selectedSchedules.includes(schedule)}
                    onChange={(event) =>
                      setSelectedSchedules((current) =>
                        event.target.checked
                          ? [...current, schedule]
                          : current.filter((item) => item !== schedule)
                      )
                    }
                    className="h-4 w-4 rounded-[4px] border border-[#e2e2e2] accent-[#c90f18]"
                  />
                  {schedule}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[15px] font-bold text-[#242424]">Start Month</h3>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {COURSE_MONTHS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={month === item}
                  onClick={() => setMonth(item)}
                  className={[
                    "h-8 rounded-[7px] border text-[12px] font-bold transition-colors",
                    month === item
                      ? "border-[#c90f18] bg-[#c90f18] text-white"
                      : "border-[#e4e4e4] bg-white text-[#242424] hover:bg-[#f5f5f5]",
                  ].join(" ")}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-[#ececec] bg-white/95 px-5 pb-5 pt-5 backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex h-12 w-full items-center justify-center rounded-[10px] bg-[#a90012] text-[16px] font-bold text-white shadow-[0_10px_18px_rgba(169,0,18,0.18)] transition-colors hover:bg-[#c90f18]"
        >
          Show 24 Courses
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="mt-4 flex w-full items-center justify-center text-[14px] font-bold text-[#6d6d6d] transition-colors hover:text-[#242424]"
        >
          Reset All
        </button>
      </div>
    </aside>
  );
}
