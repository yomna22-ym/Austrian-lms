"use client";

import GenericCard from "@/app/shared/GenericCard";
import { useRouter } from "next/navigation";
import type { EventItem } from "../types";

interface EventsGridProps {
  events: readonly EventItem[];
  filterKey: number;
}

export default function EventsGrid({ events, filterKey }: EventsGridProps) {
  const router = useRouter();

  if (events.length === 0) {
    return (
      <div className="animate-events-fade-in flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#e7c5c2] bg-white px-6 py-12 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#e7c5c2]">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-base font-semibold text-text-primary">No events found</p>
        <p className="max-w-xs text-sm text-text-secondary">
          Try adjusting your filters or clearing the date selection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {events.map((event, index) => (
        <div
          key={`${filterKey}-${event.id}`}
          className="animate-event-card-in"
          style={{ animationDelay: `${index * 55}ms` }}
        >
          <GenericCard
            variant="event"
            width="100%"
            image={event.image}
            dateBadge={event.dateBadge}
            location={event.location}
            title={event.title}
            description={event.description}
            price={`${event.price} EGP`}
            onCtaClick={() => router.push(`/events/${event.id}`)}
          />
        </div>
      ))}
    </div>
  );
}
