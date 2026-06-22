"use client";

import React, { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import type { BranchLocation } from "./types";
import {
  resolveBranchMapsUrl,
  toGoogleMapsEmbedUrl,
} from "@/app/shared/utils/location.utils";

export interface BranchMapViewProps {
  branch: BranchLocation;
  onLocate?: () => void;
  locateLabel?: string;
  className?: string;
  popupLabel?: string;
}

const DEFAULT_CONTAINER_CLASS =
  "h-[340px] rounded-[18px] border border-[#eadede] shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] sm:h-[420px] lg:h-[520px]";

const BranchMapView = ({
  branch,
  onLocate,
  locateLabel = "Find nearest branch",
  className = "",
  popupLabel,
}: BranchMapViewProps) => {
  const mapsUrl = useMemo(() => resolveBranchMapsUrl(branch), [branch]);
  const embedUrl = useMemo(
    () => (mapsUrl ? toGoogleMapsEmbedUrl(mapsUrl) : undefined),
    [mapsUrl],
  );

  const containerClassName = className || DEFAULT_CONTAINER_CLASS;

  if (!embedUrl) {
    return (
      <div
        className={[
          "relative flex w-full items-center justify-center bg-input-bg",
          containerClassName,
        ].join(" ")}
      >
        <p className="px-6 text-center text-sm text-text-secondary">
          Map unavailable for this branch.
        </p>
      </div>
    );
  }

  return (
    <div
      className={[
        "relative w-full overflow-hidden",
        containerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <iframe
        key={branch.id}
        title={`Map of ${branch.name}`}
        src={embedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <div className="pointer-events-none absolute bottom-4 left-4 z-[1] max-w-[min(280px,calc(100%-5rem))] rounded-[12px] border border-[#eadede] bg-white/95 p-3 shadow-[0_8px_24px_rgba(17,19,21,0.08)] backdrop-blur-sm">
        <p className="text-sm font-bold text-text-primary">
          {popupLabel ?? `${branch.name} Branch`}
        </p>
        {branch.address ? (
          <p className="mt-1 text-xs leading-relaxed text-text-secondary">
            {branch.address}
          </p>
        ) : null}
        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-2 inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
          >
            Open in Google Maps
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      {onLocate ? (
        <button
          type="button"
          aria-label={locateLabel}
          onClick={onLocate}
          className={
            "absolute bottom-4 right-4 z-[1] flex h-9 w-9 items-center justify-center rounded-full " +
            "bg-secondary text-white shadow-md transition-all duration-150 hover:brightness-110 " +
            "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary " +
            "focus-visible:ring-offset-2"
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default BranchMapView;
