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
        onChange={(event) => onChange(event.target.value)}
        className="input-base w-full appearance-none rounded-input border border-input-border bg-white py-3 pl-4 pr-10 text-sm text-text-primary"
      >
        <option value="all">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
      />
    </div>
  );
}
