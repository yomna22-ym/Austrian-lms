"use client";

import React from "react";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
import LocationFrame from "@/app/shared/LocationFrame";
import type { BranchLocation } from "../types";

interface EgyptBranchesSectionProps {
  branches: readonly BranchLocation[];
  copy: {
    label: string;
    title: string;
    description: string;
  };
  selectedBranchId?: string;
  onBranchSelect?: (branchId: string) => void;
}

const EgyptBranchesSection = ({
  branches,
  copy,
  selectedBranchId,
  onBranchSelect,
}: EgyptBranchesSectionProps) => {
  return (
    <MotionSection className="w-full bg-white px-4 pb-14 pt-0 sm:px-6 sm:pb-16 lg:px-16 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10">
          <SectionHeader
            label={copy.label}
            title={copy.title}
            description={copy.description}
          />
        </div>

        {branches.length > 0 ? (
          <MotionDiv delay={0.08}>
            <LocationFrame
              branches={branches}
              defaultBranchId={branches[0]?.id}
              selectedBranchId={selectedBranchId}
              onBranchSelect={onBranchSelect}
            />
          </MotionDiv>
        ) : (
          <div className="rounded-[18px] border border-dashed border-[#eadede] bg-white px-6 py-12 text-center text-sm text-text-secondary shadow-[0_1px_2px_rgba(17,19,21,0.04),0_16px_36px_rgba(17,19,21,0.055)]">
            Local branches will appear here once configured in the LMS.
          </div>
        )}
      </div>
    </MotionSection>
  );
};

export default EgyptBranchesSection;
