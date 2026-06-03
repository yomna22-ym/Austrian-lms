import React from "react";
import { MapPin } from "lucide-react";
import type { GlobalLocation } from "../types";

interface GlobalLocationItemProps {
  location: GlobalLocation;
  isVisible: boolean;
  animationDelay: string;
}

const GlobalLocationItem = ({
  location,
  isVisible,
  animationDelay,
}: GlobalLocationItemProps) => {
  return (
    <div
      className={[
        "flex flex-col gap-1.5 transition-opacity",
        isVisible ? "animate-branch-fade-up" : "opacity-0",
      ].join(" ")}
      style={{ animationDelay }}
    >
      <MapPin className="h-4 w-4 text-secondary" aria-hidden="true" />
      <p className="font-bold text-secondary">{location.country}</p>
      <p className="text-sm leading-relaxed text-text-secondary">
        {location.cities}
      </p>
    </div>
  );
};

export default GlobalLocationItem;
