import type { BranchLocation } from "@/app/shared/LocationFrame/types";
import type { BranchesHeroContent, GlobalLocation } from "../types";

export const BRANCHES_HERO: BranchesHeroContent = {
  title: "Our Branches",
  description:
    "Find the nearest institute — same Austrian German quality, everywhere. Experience the prestige of Austrian Language education across Egypt.",
};

export const GLOBAL_LOCATIONS: readonly GlobalLocation[] = [
  { id: "austria", country: "Austria", cities: "Vienna (Headquarters)" },
  { id: "italia", country: "Italia", cities: "Rome" },
  { id: "poland", country: "Poland", cities: "Warsaw, Krakow, Wroclaw" },
  { id: "slovakia", country: "Slovakia", cities: "Bratislava" },
  { id: "hungary", country: "Hungary", cities: "Budapest" },
  { id: "egypt", country: "Egypt", cities: "Cairo, Alexandria" },
  { id: "serbia", country: "Serbia", cities: "Belgrade" },
  { id: "bosnia", country: "Bosnia and Herzegovina", cities: "Sarajevo" },
  { id: "russia", country: "Russia", cities: "Moscow" },
  { id: "czech", country: "Czech Republic", cities: "Brno" },
];

export const EGYPT_BRANCHES: readonly BranchLocation[] = [
  {
    id: "heliopolis",
    name: "Heliopolis",
    address: "15 El-Khalifa El-Maamoun St, Roxy Cairo, Egypt",
    phone: "+20 2 2450 1234",
    lat: 30.0875,
    lng: 31.324,
  },
  {
    id: "maadi",
    name: "Maadi",
    lat: 29.9602,
    lng: 31.2569,
  },
  {
    id: "garden-city",
    name: "Garden City",
    lat: 30.0426,
    lng: 31.2243,
  },
  {
    id: "5th-settlement",
    name: "5th Settlement",
    lat: 30.0131,
    lng: 31.4289,
  },
  {
    id: "alexandria",
    name: "Alexandria",
    lat: 31.2001,
    lng: 29.9187,
  },
  {
    id: "mall-of-arabia",
    name: "Mall of Arabia",
    lat: 30.0131,
    lng: 30.9746,
  },
];

export const GLOBAL_PRESENCE_COPY = {
  label: "OUR NETWORK",
  title: "Our Global Presence",
  description:
    "Discover our network of official institutes across the globe. From Europe to Asia, we provide the same high standards of Austrian German education.",
};

export const EGYPT_BRANCHES_COPY = {
  label: "OUR NETWORK",
  title: "Find Your Nearest Branch In Egypt",
  description:
    "6 branches across Egypt — same high standards of Austrian German education. Choose a location to see details.",
};
