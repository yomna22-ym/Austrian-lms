import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { PaginatedResponse } from "@/types/api";
import type {
  EventCard,
  EventDetail,
  ListEventsQuery,
} from "@/types/webhook/events";

export function listEvents(
  query: ListEventsQuery = {},
): Promise<PaginatedResponse<EventCard>> {
  return webhookClient.get<PaginatedResponse<EventCard>>("/events", {
    searchParams: query,
  });
}

export function getEvent(id: string): Promise<EventDetail> {
  return webhookClient.get<EventDetail>(`/events/${id}`);
}
