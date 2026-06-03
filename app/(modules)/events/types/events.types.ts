export type EventType = "workshop" | "language-cafe" | "culture-night";

export type EventTypeFilter = "all" | EventType;

export interface EventDateBadge {
  day: number;
  month: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  type: EventType;
  price: number;
  date: Date;
  dateBadge: EventDateBadge;
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
