import type { BranchLocation } from "@/app/shared/LocationFrame";

export type EventType = "workshop" | "language-cafe" | "culture-night";

export type EventTypeFilter = "all" | EventType;

export interface EventDateBadge {
  day: number;
  month: string;
}

export interface EventItem {
  id: string;
  title: string;
  detailTitle?: string;
  description: string;
  image: string;
  gallery?: readonly string[];
  location: string;
  locationDetails?: BranchLocation;
  type: EventType;
  price: number;
  date: Date;
  dateBadge: EventDateBadge;
  timeRange?: string;
  timezone?: string;
  room?: string;
  capacity?: number;
  seatsLeft?: number;
  tags?: readonly string[];
  about?: readonly string[];
  lastUpdated?: string;
}

export interface EventsHeroContent {
  title: string;
  description: string;
  imageAlt: string;
}

export interface PriceRange {
  min: number;
  max: number;
  step: number;
}

export interface EventFilters {
  selectedDate: Date | null;
  eventType: EventTypeFilter;
  location: string;
  maxPrice: number;
}

export interface EventTypeOption {
  value: EventTypeFilter;
  label: string;
}
