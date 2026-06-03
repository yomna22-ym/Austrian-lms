"use client";

import type { EventItem } from "../types";
import { useEventsFilters } from "../hooks/use-events-filters";
import EventsFiltersSidebar from "./events-filters-sidebar";
import EventsGrid from "./events-grid";

interface EventsListingProps {
  events: readonly EventItem[];
}

export default function EventsListing({ events }: EventsListingProps) {
  const {
    filters,
    locations,
    eventDates,
    filteredEvents,
    setSelectedDate,
    setEventType,
    setLocation,
    setMaxPrice,
  } = useEventsFilters(events);

  return (
    <section className="w-full px-4 py-10 sm:px-6 nav:px-8 lg:px-16 lg:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(260px,320px)_1fr] lg:gap-12">
        <EventsFiltersSidebar
          filters={filters}
          locations={locations}
          eventDates={eventDates}
          onDateChange={setSelectedDate}
          onEventTypeChange={setEventType}
          onLocationChange={setLocation}
          onMaxPriceChange={setMaxPrice}
        />
        <EventsGrid events={filteredEvents} />
      </div>
    </section>
  );
}
