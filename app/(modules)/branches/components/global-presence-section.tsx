"use client";

import React from "react";
import SectionHeader from "@/app/shared/SectionHeader";
import { GLOBAL_LOCATIONS, GLOBAL_PRESENCE_COPY } from "../utils";
import GlobalLocationItem from "./global-location-item";
import { useReveal } from "../hooks";

const GlobalPresenceSection = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-16 lg:py-16">
      <div
        ref={ref}
        className="mx-auto max-w-7xl"
      >
        <div
          className={[
            "mb-8 sm:mb-10",
            isVisible ? "animate-branch-fade-up" : "opacity-0",
          ].join(" ")}
        >
          <SectionHeader
            label={GLOBAL_PRESENCE_COPY.label}
            title={GLOBAL_PRESENCE_COPY.title}
            description={GLOBAL_PRESENCE_COPY.description}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-8">
          {GLOBAL_LOCATIONS.map((location, index) => (
            <GlobalLocationItem
              key={location.id}
              location={location}
              isVisible={isVisible}
              animationDelay={`${index * 0.065 + 0.2}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
