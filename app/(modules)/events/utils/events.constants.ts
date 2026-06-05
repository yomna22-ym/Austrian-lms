import type {
  EventItem,
  EventTypeOption,
  EventsHeroContent,
  PriceRange,
} from "../types";

export const EVENTS_HERO: EventsHeroContent = {
  title: "Events & Workshops",
  description: "Connect. Practice. Experience Austrian culture.",
  imageAlt: "Events and workshops at Österreich Institut",
};

export const PRICE_RANGE: PriceRange = {
  min: 0,
  max: 6000,
  step: 10,
};

export const DEFAULT_MAX_PRICE = 2230;

export const EVENT_TYPES: readonly EventTypeOption[] = [
  { value: "all", label: "All" },
  { value: "workshop", label: "Workshop" },
  { value: "language-cafe", label: "Language Café" },
  { value: "culture-night", label: "Culture Night" },
];

export const MOCK_EVENTS: readonly EventItem[] = [
  {
    id: "1",
    title: "Viennese Language Café",
    detailTitle: "Viennese Language Café: Cultural Exchange",
    description:
      "Enhance your conversational German in an authentic, relaxed atmosphere with native speakers and traditional delicacies.",
    image: "/event.png",
    gallery: ["/jornal2.png", "/event.png", "/CULTURE.png"],
    location: "Campus Vienna",
    locationDetails: {
      id: "campus-vienna",
      name: "Campus Vienna",
      address: "Schwarzenbergplatz 16, 1010 Wien",
      lat: 48.2019,
      lng: 16.3743,
    },
    type: "language-cafe",
    price: 300,
    date: new Date(2024, 9, 24),
    dateBadge: { day: 24, month: "OCT" },
    timeRange: "18:00 - 20:30",
    timezone: "CET",
    room: "Room 402",
    capacity: 25,
    seatsLeft: 8,
    tags: ["Language Café", "Beginner Friendly", "Networking"],
    about: [
      "Join us for an evening of lively discussion and cultural immersion. The Viennese Language Café is designed for learners of all levels who want to practice their German skills in a low-pressure environment. We provide the coffee and cake; you bring the conversation!",
      "Each table will be hosted by a native-speaking moderator from the Österreich-Institut, ensuring that everyone gets a chance to participate. We'll cover topics ranging from Viennese history to modern day life in Austria's capital.",
    ],
    lastUpdated: "26.07.24",
  },
  {
    id: "2",
    title: "German Pronunciation Workshop",
    description:
      "Master Austrian German sounds with guided exercises and personalized feedback from certified instructors.",
    image: "/event.png",
    location: "Heliopolis",
    type: "workshop",
    price: 450,
    date: new Date(2025, 9, 6),
    dateBadge: { day: 6, month: "OCT" },
  },
  {
    id: "3",
    title: "Austrian Culture Night",
    description:
      "An evening of music, film, and culinary traditions celebrating the rich heritage of Austria.",
    image: "/event.png",
    location: "Maadi",
    type: "culture-night",
    price: 500,
    date: new Date(2025, 9, 10),
    dateBadge: { day: 10, month: "OCT" },
  },
  {
    id: "4",
    title: "Business German Intensive",
    description:
      "Develop professional communication skills for meetings, emails, and workplace interactions in German.",
    image: "/event.png",
    location: "Campus Vienna",
    type: "workshop",
    price: 800,
    date: new Date(2025, 9, 12),
    dateBadge: { day: 12, month: "OCT" },
  },
  {
    id: "5",
    title: "Coffee & Conversation",
    description:
      "Relax with fellow learners over coffee while practicing everyday German in a friendly atmosphere.",
    image: "/event.png",
    location: "Garden City",
    type: "language-cafe",
    price: 250,
    date: new Date(2025, 9, 14),
    dateBadge: { day: 14, month: "OCT" },
  },
  {
    id: "6",
    title: "Viennese Waltz Evening",
    description:
      "Learn the basics of the waltz while discovering the cultural significance of this iconic Austrian dance.",
    image: "/event.png",
    location: "5th Settlement",
    type: "culture-night",
    price: 600,
    date: new Date(2025, 9, 16),
    dateBadge: { day: 16, month: "OCT" },
  },
  {
    id: "7",
    title: "Grammar Refresher Workshop",
    description:
      "Strengthen your foundation with focused sessions on cases, verb conjugation, and sentence structure.",
    image: "/event.png",
    location: "Alexandria",
    type: "workshop",
    price: 400,
    date: new Date(2025, 9, 24),
    dateBadge: { day: 24, month: "OCT" },
  },
  {
    id: "8",
    title: "Holiday Traditions Night",
    description:
      "Explore Austrian Christmas markets, customs, and festive vocabulary through interactive activities.",
    image: "/event.png",
    location: "Mall of Arabia",
    type: "culture-night",
    price: 350,
    date: new Date(2025, 9, 24),
    dateBadge: { day: 24, month: "OCT" },
  },
];
