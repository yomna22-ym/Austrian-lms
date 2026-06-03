"use client";

import type { EventTypeFilter, EventTypeOption } from "../../types";

interface EventTypeChipsProps {
  options: readonly EventTypeOption[];
  selectedType: EventTypeFilter;
  onChange: (type: EventTypeFilter) => void;
}

export default function EventTypeChips({
  options,
  selectedType,
  onChange,
}: EventTypeChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selectedType === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "border-secondary bg-secondary text-white shadow-[0_2px_8px_rgba(185,19,23,0.25)] scale-[1.03]"
                : "border-input-border bg-white text-text-primary hover:border-secondary/40 hover:shadow-sm active:scale-95",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
