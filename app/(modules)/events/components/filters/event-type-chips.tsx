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
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-secondary bg-secondary text-primary"
                : "border-input-border bg-white text-text-primary hover:border-secondary/40",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
