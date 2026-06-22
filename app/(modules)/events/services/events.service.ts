import { siteClient } from "@/lib/api/site-client";
import type { PaginatedResponse } from "@/types/api";
import type {
  EventCard,
  EventDetail,
  ListEventsQuery,
} from "@/types/webhook/events";

export const eventsService = {
  listEvents(query: ListEventsQuery = {}): Promise<PaginatedResponse<EventCard>> {
    return siteClient.get<PaginatedResponse<EventCard>>("/events", {
      searchParams: query,
    });
  },

  getEvent(id: string): Promise<EventDetail> {
    return siteClient.get<EventDetail>(`/events/${id}`);
  },
};
