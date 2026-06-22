"use client";

import type { BranchLocation } from "../LocationFrame";
import type { BranchMapViewProps } from "../LocationFrame/BranchMapView";
import BranchMapView from "../LocationFrame/BranchMapView";

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
