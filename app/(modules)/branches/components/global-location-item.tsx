import React from "react";
import { MapPin } from "lucide-react";
import { MotionDiv } from "@/app/shared/Motion";
import type { GlobalLocation } from "../types";

interface GlobalLocationItemProps {
  location: GlobalLocation;
  animationDelay: number;
}

const content = (location: GlobalLocation) => (
  <>
    <MapPin className="h-4 w-4 text-secondary" aria-hidden="true" />
    <p className="font-bold text-secondary">{location.country}</p>
    <p className="text-sm leading-relaxed text-text-secondary">
      {location.cities}
    </p>
    {location.description ? (
      <p className="text-xs leading-relaxed text-text-secondary/80">
        {location.description}
      </p>
    ) : null}
  </>
);

const GlobalLocationItem = ({
  location,
  animationDelay,
}: GlobalLocationItemProps) => {
  const className =
    "group flex h-full flex-col gap-2 rounded-[18px] border border-[#ead8d8] bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition-colors duration-300 hover:border-secondary/30 hover:bg-[#fffafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25";

  if (location.addressLink) {
    return (
      <MotionDiv delay={animationDelay} hoverLift>
        <a
          href={location.addressLink}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content(location)}
          <span className="mt-auto text-xs font-semibold text-secondary opacity-0 transition-opacity group-hover:opacity-100">
            View location
          </span>
        </a>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv delay={animationDelay} hoverLift>
      <div className={className}>{content(location)}</div>
    </MotionDiv>
  );
};

export default GlobalLocationItem;
