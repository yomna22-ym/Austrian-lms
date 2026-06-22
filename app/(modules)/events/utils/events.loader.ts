import "server-only";

import { ApiError } from "@/lib/api/errors";
import { getEvent, listEvents } from "@/lib/api/webhook/events";
import { getHeroSection } from "@/lib/api/webhook/hero-sections";
import type { EventItem, PriceRange } from "../types";
import {
  DEFAULT_MAX_PRICE,
  EVENTS_HERO,
  MOCK_EVENTS,
  PRICE_RANGE,
} from "./events.constants";
import {
  mapEventCardsToItems,
  mapEventDetailToItem,
} from "./events.mapper";

const EVENTS_FETCH_LIMIT = 100;

export interface EventsPageData {
  intro: { title: string; description: string };
  events: EventItem[];
  priceRange: PriceRange;
  defaultMaxPrice: number;
}

function computePriceRange(events: EventItem[]): {
  priceRange: PriceRange;
  defaultMaxPrice: number;
} {
  if (events.length === 0) {
    return { priceRange: PRICE_RANGE, defaultMaxPrice: DEFAULT_MAX_PRICE };
  }

  const maxPrice = Math.max(...events.map((event) => event.price));
  const roundedMax = Math.ceil(maxPrice / 10) * 10;

  return {
    priceRange: {
      min: PRICE_RANGE.min,
      max: Math.max(roundedMax, PRICE_RANGE.max),
      step: PRICE_RANGE.step,
    },
    defaultMaxPrice: roundedMax,
  };
}

export async function loadEventsPageData(): Promise<EventsPageData> {
  const [eventsResult, heroResult] = await Promise.allSettled([
    listEvents({ page: 1, limit: EVENTS_FETCH_LIMIT, sort: "date_asc" }),
    getHeroSection("events"),
  ]);

  const eventsPayload =
    eventsResult.status === "fulfilled" ? eventsResult.value : null;
  const hero = heroResult.status === "fulfilled" ? heroResult.value : null;

  const events = eventsPayload?.items.length
    ? mapEventCardsToItems(eventsPayload.items)
    : [...MOCK_EVENTS];

  const { priceRange, defaultMaxPrice } = computePriceRange(events);

  return {
    intro: hero
      ? { title: hero.title, description: hero.description }
      : { title: EVENTS_HERO.title, description: EVENTS_HERO.description },
    events,
    priceRange,
    defaultMaxPrice,
  };
}

export async function loadEventDetail(id: string): Promise<EventItem | null> {
  try {
    const detail = await getEvent(id);
    return mapEventDetailToItem(detail);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
