"use client";

import { useMemo, useRef, useState } from "react";
import type { ActiveFilterChip } from "@/app/shared/types/filter.types";
import type { EventFilters, EventItem, EventTypeFilter } from "../types";
import { DEFAULT_MAX_PRICE, EVENT_TYPES } from "../utils";

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

export function useEventsFilters(
  events: readonly EventItem[],
  defaultMaxPrice: number = DEFAULT_MAX_PRICE,
) {
  const [filters, setFilters] = useState<EventFilters>({
    selectedDate: null,
    eventType: "all",
    location: "all",
    maxPrice: defaultMaxPrice,
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
    () => getActiveFilterCount(filters, defaultMaxPrice),
    [filters, defaultMaxPrice]
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

  const commitMaxPrice = () => {
    bumpFilterKey();
  };

  const clearAllFilters = () => {
    setFilters({
      selectedDate: null,
      eventType: "all",
      location: "all",
      maxPrice: defaultMaxPrice,
    });
    bumpFilterKey();
  };

  const activeChips = useMemo((): ActiveFilterChip[] => {
    const chips: ActiveFilterChip[] = [];

    if (filters.selectedDate) {
      chips.push({
        id: "date",
        label: filters.selectedDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
        onRemove: () => setSelectedDate(null),
      });
    }

    if (filters.eventType !== "all") {
      const typeLabel =
        EVENT_TYPES.find((option) => option.value === filters.eventType)
          ?.label ?? filters.eventType;
      chips.push({
        id: "type",
        label: typeLabel,
        onRemove: () => setEventType("all"),
      });
    }

    if (filters.location !== "all") {
      chips.push({
        id: "location",
        label: filters.location,
        onRemove: () => setLocation("all"),
      });
    }

    if (filters.maxPrice < defaultMaxPrice) {
      chips.push({
        id: "price",
        label: `Up to ${filters.maxPrice.toLocaleString()} EGP`,
        onRemove: () => {
          setMaxPrice(defaultMaxPrice);
          bumpFilterKey();
        },
      });
    }

    return chips;
  }, [filters, defaultMaxPrice]);

  return {
    filters,
    filterKey,
    locations,
    eventDates,
    filteredEvents,
    activeFilterCount,
    activeChips,
    setSelectedDate,
    setEventType,
    setLocation,
    setMaxPrice,
    commitMaxPrice,
    clearAllFilters,
  };
}
