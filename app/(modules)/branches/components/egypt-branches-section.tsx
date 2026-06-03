import React from "react";
import SectionHeader from "@/app/shared/SectionHeader";
import LocationFrame from "@/app/shared/LocationFrame";
import type { BranchLocation } from "../types";
import { EGYPT_BRANCHES_COPY } from "../utils";

interface EgyptBranchesSectionProps {
  branches: readonly BranchLocation[];
}

const EgyptBranchesSection = ({ branches }: EgyptBranchesSectionProps) => {
  return (
    <section className="w-full bg-[#fff7f7] px-4 pb-12 pt-0 sm:px-6 sm:pb-14 lg:px-16 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={EGYPT_BRANCHES_COPY.label}
          title={EGYPT_BRANCHES_COPY.title}
          description={EGYPT_BRANCHES_COPY.description}
          className="mb-8 sm:mb-10"
        />

        <LocationFrame branches={branches} defaultBranchId="heliopolis" />
      </div>
    </section>
  );
};

export default EgyptBranchesSection;
