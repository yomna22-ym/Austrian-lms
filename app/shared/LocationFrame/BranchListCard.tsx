"use client";

import React from "react";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import type { BranchLocation } from "./types";

export interface BranchListCardProps {
  branch: BranchLocation;
  isActive: boolean;
  onSelect: (branchId: string) => void;
}

const BranchListCard = ({ branch, isActive, onSelect }: BranchListCardProps) => {
  const hasDetails = Boolean(branch.address || branch.phone || branch.addressLink);

  return (
    <div
      className={[
        "group w-full rounded-[14px] border bg-white text-left",
        "transition-all duration-300 ease-out",
        isActive
          ? "border-[#eadede] border-l-4 border-l-secondary shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)]"
          : "border-[#eadede] shadow-[0_1px_2px_rgba(17,19,21,0.04)] hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_18px_40px_rgba(185,19,23,0.08)]",
      ].join(" ")}
    >
      <button
        type="button"
        aria-pressed={isActive}
        onClick={() => onSelect(branch.id)}
        className="flex min-h-[60px] w-full items-center gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        <MapPin
          className={[
            "h-4 w-4 shrink-0 transition-colors duration-300",
            isActive
              ? "text-secondary"
              : "text-text-secondary group-hover:text-secondary/60",
          ].join(" ")}
          aria-hidden="true"
        />
        <p className="font-bold text-text-primary">{branch.name}</p>
      </button>

      {hasDetails && (
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
              {branch.address ? (
                branch.addressLink ? (
                  <a
                    href={branch.addressLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pl-7 text-sm leading-relaxed text-text-secondary underline-offset-2 hover:text-secondary hover:underline"
                  >
                    {branch.address}
                  </a>
                ) : (
                  <p className="pl-7 text-sm leading-relaxed text-text-secondary">
                    {branch.address}
                  </p>
                )
              ) : null}
              {branch.phone ? (
                <p className="mt-2 flex items-center gap-1.5 pl-7 text-sm font-medium text-secondary">
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <a href={`tel:${branch.phone}`} className="hover:underline">
                    {branch.phone}
                  </a>
                </p>
              ) : null}
              {branch.addressLink ? (
                <a
                  href={branch.addressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 pl-7 text-sm font-semibold text-secondary hover:underline"
                >
                  Open in Maps
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchListCard;
