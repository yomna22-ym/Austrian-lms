"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

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

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

function getCalendarDays(month: Date): Date[] {
  const firstDay = startOfMonth(month);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

export default function EventCalendar({
  selectedDate,
  eventDates,
  onDateChange,
}: EventCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => selectedDate ?? eventDates[0] ?? new Date(2025, 9, 1)
  );

  const days = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);

  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const hasEvent = (date: Date) =>
    eventDates.some((eventDate) => isSameDay(eventDate, date));

  const handleDayClick = (day: Date) => {
    if (selectedDate && isSameDay(selectedDate, day)) {
      onDateChange(null);
      return;
    }
    onDateChange(day);
  };

  return (
    <div className="rounded-2xl border border-[#f3dfdd] bg-white p-4 shadow-[0_8px_24px_rgba(17,19,21,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[#fff7f7] hover:text-text-primary"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="text-sm font-semibold text-text-primary">{monthLabel}</p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[#fff7f7] hover:text-text-primary"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((weekday) => (
          <span
            key={weekday}
            className="pb-2 text-[11px] font-medium uppercase text-text-secondary"
          >
            {weekday}
          </span>
        ))}

        {days.map((day) => {
          const inCurrentMonth = day.getMonth() === visibleMonth.getMonth();
          const isSelected = selectedDate ? isSameDay(selectedDate, day) : false;
          const showEventDot = hasEvent(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => handleDayClick(day)}
              className={[
                "relative mx-auto flex h-9 w-9 flex-col items-center justify-center rounded-full text-sm transition-colors",
                !inCurrentMonth && "text-text-secondary/40",
                inCurrentMonth && !isSelected && "text-text-primary hover:bg-[#fff7f7]",
                isSelected && "bg-secondary text-primary",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>{day.getDate()}</span>
              {showEventDot && !isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 h-1 w-1 rounded-full bg-secondary"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
