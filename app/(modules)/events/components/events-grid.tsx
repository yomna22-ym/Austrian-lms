"use client";

import GenericCard from "@/app/shared/GenericCard";
import { useRouter } from "next/navigation";
import type { EventItem } from "../types";

interface EventsGridProps {
  events: readonly EventItem[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  const router = useRouter();

  if (events.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-input-border bg-[#fff7f7] px-6 py-12 text-center">
        <p className="text-base text-text-secondary">
          No events match your filters. Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {events.map((event) => (
        <GenericCard
          key={event.id}
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
      ))}
    </div>
  );
}
