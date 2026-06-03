"use client";

import { ChevronDown } from "lucide-react";

interface LocationSelectProps {
  locations: readonly string[];
  value: string;
  onChange: (location: string) => void;
}

export default function LocationSelect({
  locations,
  value,
  onChange,
}: LocationSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-input border border-input-border bg-white py-3 pl-4 pr-10 text-sm text-text-primary outline-none transition-all duration-150 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/10"
      >
        <option value="all">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <ChevronDown
        size={17}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
      />
    </div>
  );
}
