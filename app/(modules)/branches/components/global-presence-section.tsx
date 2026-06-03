import React from "react";
import SectionHeader from "@/app/shared/SectionHeader";
import { GLOBAL_LOCATIONS, GLOBAL_PRESENCE_COPY } from "../utils";
import GlobalLocationItem from "./global-location-item";

const GlobalPresenceSection = () => {
  return (
    <section className="w-full bg-[#fff7f7] px-4 py-12 sm:px-6 sm:py-14 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={GLOBAL_PRESENCE_COPY.label}
          title={GLOBAL_PRESENCE_COPY.title}
          description={GLOBAL_PRESENCE_COPY.description}
          className="mb-8 sm:mb-10"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-8">
          {GLOBAL_LOCATIONS.map((location) => (
            <GlobalLocationItem key={location.id} location={location} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
