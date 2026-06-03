"use client";

import { useMemo, useState } from "react";
import type { EventFilters, EventItem, EventTypeFilter } from "../types";
import { DEFAULT_MAX_PRICE } from "../utils";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getUniqueLocations(events: readonly EventItem[]): string[] {
  return [...new Set(events.map((event) => event.location))].sort();
}

function getEventDates(events: readonly EventItem[]): Date[] {
  const seen = new Set<string>();
  const dates: Date[] = [];

  for (const event of events) {
    const key = event.date.toDateString();
    if (!seen.has(key)) {
      seen.add(key);
      dates.push(event.date);
    }
  }

  return dates;
}

function filterEvents(
  events: readonly EventItem[],
  filters: EventFilters
): EventItem[] {
  return events.filter((event) => {
    if (filters.selectedDate && !isSameDay(event.date, filters.selectedDate)) {
      return false;
    }

    if (filters.eventType !== "all" && event.type !== filters.eventType) {
      return false;
    }

    if (filters.location !== "all" && event.location !== filters.location) {
      return false;
    }

    if (event.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

export function useEventsFilters(events: readonly EventItem[]) {
  const [filters, setFilters] = useState<EventFilters>({
    selectedDate: null,
    eventType: "all",
    location: "all",
    maxPrice: DEFAULT_MAX_PRICE,
  });

  const locations = useMemo(() => getUniqueLocations(events), [events]);
  const eventDates = useMemo(() => getEventDates(events), [events]);
  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );

  const setSelectedDate = (selectedDate: Date | null) => {
    setFilters((current) => ({ ...current, selectedDate }));
  };

  const setEventType = (eventType: EventTypeFilter) => {
    setFilters((current) => ({ ...current, eventType }));
  };

  const setLocation = (location: string) => {
    setFilters((current) => ({ ...current, location }));
  };

  const setMaxPrice = (maxPrice: number) => {
    setFilters((current) => ({ ...current, maxPrice }));
  };

  return {
    filters,
    locations,
    eventDates,
    filteredEvents,
    setSelectedDate,
    setEventType,
    setLocation,
    setMaxPrice,
  };
}
