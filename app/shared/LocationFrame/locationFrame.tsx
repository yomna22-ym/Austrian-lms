"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { BranchLocation } from "./types";
import { findNearestBranch } from "@/app/(modules)/branches/utils";
import BranchListCard from "./BranchListCard";

const BranchMapView = dynamic(() => import("./BranchMapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] w-full items-center justify-center rounded-2xl bg-input-bg ring-1 ring-input-border sm:h-[400px] lg:h-[520px]">
      <p className="text-sm text-text-secondary">Loading map…</p>
    </div>
  ),
});

export interface LocationFrameProps {
  branches: readonly BranchLocation[];
  defaultBranchId?: string;
  selectedBranchId?: string;
  onBranchSelect?: (branchId: string) => void;
  className?: string;
}

const LocationFrame = ({
  branches,
  defaultBranchId,
  selectedBranchId: controlledSelectedBranchId,
  onBranchSelect,
  className = "",
}: LocationFrameProps) => {
  const initialBranchId = defaultBranchId ?? branches[0]?.id ?? "";
  const [uncontrolledSelectedBranchId, setUncontrolledSelectedBranchId] =
    useState(initialBranchId);
  const selectedBranchId = controlledSelectedBranchId ?? uncontrolledSelectedBranchId;
  const setSelectedBranchId = (branchId: string) => {
    if (controlledSelectedBranchId === undefined) {
      setUncontrolledSelectedBranchId(branchId);
    }
    onBranchSelect?.(branchId);
  };

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === selectedBranchId) ?? branches[0],
    [branches, selectedBranchId]
  );

  const handleLocate = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = findNearestBranch(
          branches,
          position.coords.latitude,
          position.coords.longitude
        );
        if (nearest) setSelectedBranchId(nearest.id);
      },
      () => {
        /* user denied or unavailable — no-op */
      }
    );
  };

  if (!selectedBranch) return null;

  return (
    <div
      className={[
        "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col gap-3">
        {branches.map((branch) => (
          <BranchListCard
            key={branch.id}
            branch={branch}
            isActive={branch.id === selectedBranchId}
            onSelect={setSelectedBranchId}
          />
        ))}
      </div>

      <BranchMapView
        branch={selectedBranch}
        onLocate={handleLocate}
        locateLabel="Find nearest branch"
      />
    </div>
  );
};

export default LocationFrame;
