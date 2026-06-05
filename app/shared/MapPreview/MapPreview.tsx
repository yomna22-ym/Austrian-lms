"use client";

import dynamic from "next/dynamic";
import type { BranchLocation } from "../LocationFrame";
import type { BranchMapViewProps } from "../LocationFrame/BranchMapView";

const BranchMapView = dynamic(() => import("../LocationFrame/BranchMapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center rounded-[8px] bg-input-bg ring-1 ring-input-border">
      <p className="text-sm text-text-secondary">Loading map...</p>
    </div>
  ),
});

export interface MapPreviewProps
  extends Pick<BranchMapViewProps, "className" | "popupLabel"> {
  location: BranchLocation;
}

export default function MapPreview({
  location,
  className,
  popupLabel,
}: MapPreviewProps) {
  return (
    <BranchMapView
      branch={location}
      className={className}
      popupLabel={popupLabel}
    />
  );
}
