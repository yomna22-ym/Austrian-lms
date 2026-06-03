"use client";

import { useMemo, useRef, useState } from "react";
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

function getActiveFilterCount(filters: EventFilters, defaultMaxPrice: number): number {
  let count = 0;
  if (filters.selectedDate) count++;
  if (filters.eventType !== "all") count++;
  if (filters.location !== "all") count++;
  if (filters.maxPrice < defaultMaxPrice) count++;
  return count;
}

export function useEventsFilters(events: readonly EventItem[]) {
  const [filters, setFilters] = useState<EventFilters>({
    selectedDate: null,
    eventType: "all",
    location: "all",
    maxPrice: DEFAULT_MAX_PRICE,
  });

  const filterKeyRef = useRef(0);
  const [filterKey, setFilterKey] = useState(0);

  const bumpFilterKey = () => {
    filterKeyRef.current += 1;
    setFilterKey(filterKeyRef.current);
  };

  const locations = useMemo(() => getUniqueLocations(events), [events]);
  const eventDates = useMemo(() => getEventDates(events), [events]);
  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );
  const activeFilterCount = useMemo(
    () => getActiveFilterCount(filters, DEFAULT_MAX_PRICE),
    [filters]
  );

  const setSelectedDate = (selectedDate: Date | null) => {
    setFilters((current) => ({ ...current, selectedDate }));
    bumpFilterKey();
  };

  const setEventType = (eventType: EventTypeFilter) => {
    setFilters((current) => ({ ...current, eventType }));
    bumpFilterKey();
  };

  const setLocation = (location: string) => {
    setFilters((current) => ({ ...current, location }));
    bumpFilterKey();
  };

  const setMaxPrice = (maxPrice: number) => {
    setFilters((current) => ({ ...current, maxPrice }));
  };

  const clearAllFilters = () => {
    setFilters({
      selectedDate: null,
      eventType: "all",
      location: "all",
      maxPrice: DEFAULT_MAX_PRICE,
    });
    bumpFilterKey();
  };

  return {
    filters,
    filterKey,
    locations,
    eventDates,
    filteredEvents,
    activeFilterCount,
    setSelectedDate,
    setEventType,
    setLocation,
    setMaxPrice,
    clearAllFilters,
  };
}
