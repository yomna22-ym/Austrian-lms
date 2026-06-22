"use client";

import React from "react";
import SectionHeader from "@/app/shared/SectionHeader";
import { MotionSection } from "@/app/shared/Motion";
import { GLOBAL_PRESENCE_COPY } from "../utils";
import type { GlobalLocation } from "../types";
import GlobalLocationItem from "./global-location-item";

interface GlobalPresenceSectionProps {
  locations: readonly GlobalLocation[];
}

const GlobalPresenceSection = ({ locations }: GlobalPresenceSectionProps) => {
  return (
    <MotionSection className="w-full bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10">
          <SectionHeader
            label={GLOBAL_PRESENCE_COPY.label}
            title={GLOBAL_PRESENCE_COPY.title}
            description={GLOBAL_PRESENCE_COPY.description}
          />
        </div>

        {locations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-8">
            {locations.map((location, index) => (
              <GlobalLocationItem
                key={location.id}
                location={location}
                animationDelay={index * 0.05}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] border border-dashed border-[#ead8d8] bg-white px-6 py-10 text-center text-sm font-semibold text-text-secondary shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            Global locations will appear here once configured in the LMS.
          </div>
        )}
      </div>
    </MotionSection>
  );
};

export default GlobalPresenceSection;
