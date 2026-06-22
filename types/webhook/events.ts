export interface EventCategory {
  id: string;
  name: string;
  slug: string;
}

export interface EventLocation {
  name: string;
  address: string;
  coords?: {
    lng: number;
    lat: number;
  };
}

export interface EventGalleryItem {
  url: string;
  alt: string;
}

export interface EventCard {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  coverImage: string;
  coverImageAlt: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  capacity: number;
  seatsLeft: number;
  price: number;
  status: string;
  category: EventCategory;
  location: EventLocation;
}

export interface EventDetail extends EventCard {
  about: string;
  highlights: string[];
  gallery: EventGalleryItem[];
  galleryUpdatedAt?: string;
}

export type EventSort = "date_asc" | "date_desc";

export interface ListEventsQuery {
  page?: number;
  limit?: number;
  category?: string;
  date_from?: string;
  date_to?: string;
  sort?: EventSort;
  price_min?: number;
  price_max?: number;
}
