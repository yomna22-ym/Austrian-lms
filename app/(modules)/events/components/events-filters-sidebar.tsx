"use client";

import type { EventFilters, EventTypeFilter } from "../types";
import { EVENT_TYPES, PRICE_RANGE } from "../utils";
import EventCalendar from "./filters/event-calendar";
import EventTypeChips from "./filters/event-type-chips";
import FilterSection from "./filters/filter-section";
import LocationSelect from "./filters/location-select";
import PriceRangeSlider from "./filters/price-range-slider";

interface EventsFiltersSidebarProps {
  filters: EventFilters;
  locations: readonly string[];
  eventDates: readonly Date[];
  onDateChange: (date: Date | null) => void;
  onEventTypeChange: (type: EventTypeFilter) => void;
  onLocationChange: (location: string) => void;
  onMaxPriceChange: (maxPrice: number) => void;
}

export default function EventsFiltersSidebar({
  filters,
  locations,
  eventDates,
  onDateChange,
  onEventTypeChange,
  onLocationChange,
  onMaxPriceChange,
}: EventsFiltersSidebarProps) {
  return (
    <aside className="flex flex-col gap-8">
      <EventCalendar
        selectedDate={filters.selectedDate}
        eventDates={eventDates}
        onDateChange={onDateChange}
      />

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
        min={PRICE_RANGE.min}
        max={PRICE_RANGE.max}
        step={PRICE_RANGE.step}
        value={filters.maxPrice}
        onChange={onMaxPriceChange}
      />
    </aside>
  );
}
