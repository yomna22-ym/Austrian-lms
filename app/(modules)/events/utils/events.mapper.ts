import { resolveLmsAssetUrl } from "@/lib/media";
import type { EventCard, EventDetail } from "@/types/webhook/events";
import type { EventDateBadge, EventItem, EventType } from "../types";
import {
  buildMapsUrl,
  stripMapsUrlFromText,
} from "@/app/shared/utils/location.utils";

const CATEGORY_TO_TYPE: Record<string, EventType> = {
  workshop: "workshop",
  "language-cafe": "language-cafe",
  "language_cafe": "language-cafe",
  "culture-night": "culture-night",
  "culture_night": "culture-night",
  conference: "workshop",
};

function mapCategoryToType(categorySlug: string): EventType {
  return CATEGORY_TO_TYPE[categorySlug.toLowerCase()] ?? "workshop";
}

function buildDateBadge(date: Date): EventDateBadge {
  return {
    day: date.getDate(),
    month: new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(date)
      .toUpperCase(),
  };
}

function buildTimeRange(timeStart: string, timeEnd: string): string {
  return `${timeStart} - ${timeEnd}`;
}

function mapBaseEvent(card: EventCard): EventItem {
  const date = new Date(card.date);

  return {
    id: card.id,
    title: card.title,
    description: card.shortDesc,
    image: resolveLmsAssetUrl(card.coverImage) || "/event.png",
    imageAlt: card.coverImageAlt,
    location: card.location.name,
    type: mapCategoryToType(card.category.slug),
    price: card.price,
    date,
    dateBadge: buildDateBadge(date),
    timeRange: buildTimeRange(card.timeStart, card.timeEnd),
    capacity: card.capacity,
    seatsLeft: card.seatsLeft,
    tags: [card.category.name],
  };
}

export function mapEventCardToItem(card: EventCard): EventItem {
  return mapBaseEvent(card);
}

export function mapEventDetailToItem(detail: EventDetail): EventItem {
  const item = mapBaseEvent(detail);
  const displayAddress = stripMapsUrlFromText(detail.location.address);
  const mapsUrl = buildMapsUrl(detail.location.address, detail.location.coords);

  if (detail.location.coords || mapsUrl) {
    item.locationDetails = {
      id: detail.id,
      name: detail.location.name,
      address: displayAddress || undefined,
      addressLink: mapsUrl,
      lat: detail.location.coords?.lat ?? 0,
      lng: detail.location.coords?.lng ?? 0,
      hasCoordinates: Boolean(detail.location.coords),
    };
  }

  item.location = detail.location.name;

  item.about = detail.about
    ? detail.about.split(/\n\s*\n/).filter(Boolean)
    : detail.highlights?.length
      ? detail.highlights
      : [detail.shortDesc];

  if (detail.highlights?.length) {
    item.tags = detail.highlights;
  }

  if (detail.gallery?.length) {
    item.gallery = detail.gallery.map(
      (entry) => resolveLmsAssetUrl(entry.url) || entry.url,
    );
  }

  if (detail.galleryUpdatedAt) {
    item.lastUpdated = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(detail.galleryUpdatedAt));
  }

  return item;
}

export function mapEventCardsToItems(cards: EventCard[]): EventItem[] {
  return cards.map(mapEventCardToItem);
}
