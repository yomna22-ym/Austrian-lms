"use client";

import { X } from "lucide-react";
import type { ActiveFilterChip } from "@/app/shared/types/filter.types";

interface ActiveFilterChipsProps {
  chips: readonly ActiveFilterChip[];
  onClearAll?: () => void;
  className?: string;
}

export default function ActiveFilterChips({
  chips,
  onClearAll,
  className = "",
}: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div
      className={[
        "animate-events-fade-in flex flex-wrap items-center gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          className="group inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/5 py-1.5 pl-3 pr-2 text-xs font-semibold text-secondary transition-all duration-200 hover:border-secondary/40 hover:bg-secondary/10 active:scale-95"
          aria-label={`Remove filter: ${chip.label}`}
        >
          <span>{chip.label}</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary/15 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
            <X size={10} strokeWidth={3} aria-hidden="true" />
          </span>
        </button>
      ))}
      {onClearAll && chips.length > 1 ? (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-text-secondary underline-offset-2 transition-colors hover:text-secondary hover:underline"
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
