"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface EventCalendarProps {
  selectedDate: Date | null;
  eventDates: readonly Date[];
  onDateChange: (date: Date | null) => void;
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

function getCalendarRows(month: Date): Date[][] {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - startOffset);

  const allDays = Array.from({ length: 42 }, (_, i) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + i);
    return day;
  });

  const rows: Date[][] = [];
  for (let r = 0; r < 6; r++) {
    const row = allDays.slice(r * 7, r * 7 + 7);
    // Skip last row if entirely outside the current month
    const hasCurrentMonth = row.some((d) => d.getMonth() === month.getMonth());
    if (hasCurrentMonth) rows.push(row);
  }
  return rows;
}

export default function EventCalendar({
  selectedDate,
  eventDates,
  onDateChange,
}: EventCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => selectedDate ?? eventDates[0] ?? new Date(2025, 9, 1)
  );
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const prevMonth = useRef(visibleMonth);

  const rows = useMemo(() => getCalendarRows(visibleMonth), [visibleMonth]);

  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const hasEvent = (date: Date) =>
    eventDates.some((ed) => isSameDay(ed, date));

  const navigateMonth = (direction: -1 | 1) => {
    setSlideDir(direction === 1 ? "left" : "right");
    setAnimKey((k) => k + 1);
    prevMonth.current = visibleMonth;
    setVisibleMonth((current) => addMonths(current, direction));
  };

  useEffect(() => {
    if (slideDir) {
      const timer = setTimeout(() => setSlideDir(null), 350);
      return () => clearTimeout(timer);
    }
  }, [slideDir]);

  const handleDayClick = (day: Date) => {
    if (selectedDate && isSameDay(selectedDate, day)) {
      onDateChange(null);
    } else {
      onDateChange(day);
    }
  };

  const slideClass =
    slideDir === "left"
      ? "animate-events-slide-left"
      : slideDir === "right"
        ? "animate-events-slide-right"
        : "";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#f3dfdd] bg-white shadow-[0_8px_24px_rgba(17,19,21,0.06)]">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => navigateMonth(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-all duration-150 hover:bg-[#fff7f7] hover:text-text-primary active:scale-90"
        >
          <ChevronLeft size={17} />
        </button>
        <p className="text-sm font-semibold text-text-primary">{monthLabel}</p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => navigateMonth(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-all duration-150 hover:bg-[#fff7f7] hover:text-text-primary active:scale-90"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="px-4 pb-4">
        {/* Weekday headers — static */}
        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((wd) => (
            <span
              key={wd}
              className="pb-2 text-[11px] font-semibold uppercase tracking-wide text-text-secondary"
            >
              {wd}
            </span>
          ))}
        </div>

        {/* Animated day grid */}
        <div
          key={animKey}
          className={["grid grid-cols-7 gap-y-1 text-center", slideClass]
            .filter(Boolean)
            .join(" ")}
        >
          {rows.map((row, rowIdx) =>
            row.map((day) => {
              const inCurrentMonth = day.getMonth() === visibleMonth.getMonth();
              const isSelected = Boolean(selectedDate && isSameDay(selectedDate, day));
              const showDot = hasEvent(day) && inCurrentMonth && !isSelected;

              return (
                <button
                  key={`${rowIdx}-${day.toISOString()}`}
                  type="button"
                  onClick={() => inCurrentMonth && handleDayClick(day)}
                  disabled={!inCurrentMonth}
                  aria-pressed={isSelected}
                  aria-label={day.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                  className={[
                    "relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-150",
                    !inCurrentMonth && "cursor-default text-text-secondary/30",
                    inCurrentMonth && !isSelected && "cursor-pointer text-text-primary hover:bg-[#fff7f7] active:scale-95",
                    isSelected && "bg-secondary text-white shadow-[0_2px_8px_rgba(185,19,23,0.35)]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={showDot ? "mb-1.5" : ""}>{day.getDate()}</span>
                  {showDot && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1.5 h-1 w-1 rounded-full bg-secondary"
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
