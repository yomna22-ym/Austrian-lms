"use client";

import PageIntro from "@/app/shared/PageIntro";
import { EventsListing } from "../components";
import type { EventsPageData } from "../utils/events.loader";

interface EventsPageClientProps {
  data: EventsPageData;
}

export default function EventsPageClient({ data }: EventsPageClientProps) {
  return (
    <div className="flex w-full flex-col">
      <PageIntro title={data.intro.title} description={data.intro.description} />
      <EventsListing
        initialEvents={data.events}
        defaultMaxPrice={data.defaultMaxPrice}
        priceRange={data.priceRange}
      />
    </div>
  );
}
