"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  } = useEventsFilters(events);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const sidebar = (
    <EventsFiltersSidebar
      filters={filters}
      locations={locations}
      eventDates={eventDates}
      onDateChange={setSelectedDate}
      onEventTypeChange={setEventType}
      onLocationChange={setLocation}
      onMaxPriceChange={setMaxPrice}
      onClearAll={clearAllFilters}
      activeFilterCount={activeFilterCount}
      onClose={() => setDrawerOpen(false)}
    />
  );

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 nav:px-8 lg:px-16 lg:py-14">

        {/* Mobile top bar */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm font-medium text-text-secondary">
            <span className="font-bold text-text-primary">{filteredEvents.length}</span>{" "}
            {filteredEvents.length === 1 ? "event" : "events"} found
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-input-border bg-white px-4 py-2 text-sm font-medium text-text-primary shadow-sm transition-all hover:border-secondary/40 hover:shadow-md active:scale-95"
          >
            <SlidersHorizontal size={16} className="text-secondary" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(260px,300px)_1fr] lg:gap-12">
          {/* Desktop sidebar — always visible */}
          <div className="hidden lg:block">
            {sidebar}
          </div>

          {/* Grid + result count */}
          <div className="flex flex-col gap-6">
            <div className="hidden items-center justify-between lg:flex">
              <p className="text-sm font-medium text-text-secondary">
                <span className="font-bold text-text-primary">{filteredEvents.length}</span>{" "}
                {filteredEvents.length === 1 ? "event" : "events"} found
              </p>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 text-sm font-medium text-secondary transition-opacity hover:opacity-70"
                >
                  <X size={14} />
                  Clear filters
                </button>
              )}
            </div>
            <EventsGrid events={filteredEvents} filterKey={filterKey} />
          </div>
        </div>
      </div>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="animate-events-backdrop-in fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Event filters"
          className="animate-events-drawer-in fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
        >
          {/* Drawer header */}
          <div className="flex shrink-0 items-center justify-between border-b border-input-border px-5 py-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-secondary" />
              <span className="text-base font-semibold text-text-primary">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[#fff7f7] hover:text-text-primary"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable filter content */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            {sidebar}
          </div>

          {/* Drawer footer */}
          <div className="shrink-0 border-t border-input-border px-5 py-4">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="w-full rounded-full bg-secondary py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Show {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
