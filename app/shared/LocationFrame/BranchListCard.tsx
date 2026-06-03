"use client";

import React from "react";
import { MapPin, Phone } from "lucide-react";
import type { BranchLocation } from "./types";

export interface BranchListCardProps {
  branch: BranchLocation;
  isActive: boolean;
  onSelect: (branchId: string) => void;
}

const BranchListCard = ({ branch, isActive, onSelect }: BranchListCardProps) => {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onSelect(branch.id)}
      className={[
        "w-full rounded-input border bg-white p-4 text-left transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        isActive
          ? "border-input-border border-l-4 border-l-secondary shadow-sm"
          : "border-input-border hover:border-secondary/30",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <MapPin
          className={[
            "mt-0.5 h-4 w-4 shrink-0",
            isActive ? "text-secondary" : "text-text-secondary",
          ].join(" ")}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-text-primary">{branch.name}</p>
          {isActive && branch.address && (
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              {branch.address}
            </p>
          )}
          {isActive && branch.phone && (
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-secondary">
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{branch.phone}</span>
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default BranchListCard;
