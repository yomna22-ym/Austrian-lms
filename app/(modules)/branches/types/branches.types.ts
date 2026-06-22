import type { BranchLocation } from "@/app/shared/LocationFrame/types";

export type { BranchLocation };

export interface GlobalLocation {
  id: string;
  country: string;
  cities: string;
  addressLink?: string;
  description?: string;
}

export interface BranchesHeroContent {
  title: string;
  description: string;
}
