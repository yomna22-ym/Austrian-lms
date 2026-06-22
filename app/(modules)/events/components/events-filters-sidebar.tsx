"use client";

import type { EventFilters, EventItem, EventTypeFilter, PriceRange } from "../types";
import { EVENT_TYPES } from "../utils";
import EventCalendar from "./filters/event-calendar";
import EventTypeChips from "./filters/event-type-chips";
import FilterSection from "./filters/filter-section";
import LocationSelect from "./filters/location-select";
import PriceRangeSlider from "./filters/price-range-slider";

interface EventsFiltersSidebarProps {
  filters: EventFilters;
  locations: readonly string[];
  eventDates: readonly Date[];
  priceRange: PriceRange;
  activeFilterCount: number;
  onDateChange: (date: Date | null) => void;
  onEventTypeChange: (type: EventTypeFilter) => void;
  onLocationChange: (location: string) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onMaxPriceCommit?: () => void;
  onClearAll: () => void;
  onClose?: () => void;
}

export default function EventsFiltersSidebar({
  filters,
  locations,
  eventDates,
  priceRange,
  activeFilterCount,
  onDateChange,
  onEventTypeChange,
  onLocationChange,
  onMaxPriceChange,
  onMaxPriceCommit,
  onClearAll,
}: EventsFiltersSidebarProps) {
  return (
    <aside className="flex flex-col gap-8">
      <div>
        <EventCalendar
          selectedDate={filters.selectedDate}
          eventDates={eventDates}
          onDateChange={onDateChange}
        />
        {filters.selectedDate && (
          <button
            type="button"
            onClick={() => onDateChange(null)}
            className="mt-2 w-full text-center text-xs font-medium text-secondary transition-opacity hover:opacity-70"
          >
            Clear date
          </button>
        )}
      </div>

      <FilterSection label="Event Type">
        <EventTypeChips
          options={EVENT_TYPES}
          selectedType={filters.eventType}
          onChange={onEventTypeChange}
        />
      </FilterSection>

      <FilterSection label="Location">
        <LocationSelect
          locations={locations}
          value={filters.location}
          onChange={onLocationChange}
        />
      </FilterSection>

      <PriceRangeSlider
        min={priceRange.min}
        max={priceRange.max}
        step={priceRange.step}
        value={filters.maxPrice}
        onChange={onMaxPriceChange}
        onCommit={onMaxPriceCommit}
      />

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          className="hidden rounded-full border border-secondary/30 py-2.5 text-sm font-semibold text-secondary transition-all hover:bg-secondary/5 lg:block"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </aside>
  );
}
