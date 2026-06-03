"use client";

import React from "react";
import SectionHeader from "@/app/shared/SectionHeader";
import LocationFrame from "@/app/shared/LocationFrame";
import type { BranchLocation } from "../types";
import { EGYPT_BRANCHES_COPY } from "../utils";
import { useReveal } from "../hooks";

interface EgyptBranchesSectionProps {
  branches: readonly BranchLocation[];
}

const EgyptBranchesSection = ({ branches }: EgyptBranchesSectionProps) => {
  const { ref, isVisible } = useReveal();

  return (
    <section className="w-full bg-white px-4 pb-14 pt-0 sm:px-6 sm:pb-16 lg:px-16 lg:pb-20">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div
          className={[
            "mb-8 sm:mb-10",
            isVisible ? "animate-branch-fade-up" : "opacity-0",
          ].join(" ")}
        >
          <SectionHeader
            label={EGYPT_BRANCHES_COPY.label}
            title={EGYPT_BRANCHES_COPY.title}
            description={EGYPT_BRANCHES_COPY.description}
          />
        </div>

        <div
          className={isVisible ? "animate-branch-fade-up" : "opacity-0"}
          style={{ animationDelay: "0.22s" }}
        >
          <LocationFrame branches={branches} defaultBranchId="heliopolis" />
        </div>
      </div>
    </section>
  );
};

export default EgyptBranchesSection;
