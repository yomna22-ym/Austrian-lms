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
  const hasDetails = Boolean(branch.address || branch.phone);

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onSelect(branch.id)}
      className={[
        "group w-full rounded-input border bg-white text-left",
        "transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        isActive
          ? "border border-input-border border-l-4 border-l-secondary shadow-sm"
          : "border border-input-border hover:border-secondary/30 hover:shadow-sm hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Always-visible header row */}
      <div className="flex items-center gap-3 px-4 py-4">
        <MapPin
          className={[
            "h-4 w-4 shrink-0 transition-colors duration-300",
            isActive ? "text-secondary" : "text-text-secondary group-hover:text-secondary/60",
          ].join(" ")}
          aria-hidden="true"
        />
        <p
          className={[
            "font-bold transition-colors duration-200",
            isActive ? "text-text-primary" : "text-text-primary",
          ].join(" ")}
        >
          {branch.name}
        </p>
      </div>

      {/* Expandable details — uses grid-rows trick for smooth height animation */}
      {hasDetails && (
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
              {branch.address && (
                <p className="pl-7 text-sm leading-relaxed text-text-secondary">
                  {branch.address}
                </p>
              )}
              {branch.phone && (
                <p className="mt-2 flex items-center gap-1.5 pl-7 text-sm font-medium text-secondary">
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{branch.phone}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default BranchListCard;
