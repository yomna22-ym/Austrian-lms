import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { PaginatedResponse } from "@/types/api";
import type {
  HeroPageType,
  HeroSection,
  ListHomeHeroSectionsQuery,
} from "@/types/webhook/hero-sections";

export function getHeroSection(pageType: Exclude<HeroPageType, "home">): Promise<HeroSection> {
  return webhookClient.get<HeroSection>(`/hero-sections/${pageType}`);
}

export function listHomeHeroSections(
  query: ListHomeHeroSectionsQuery = {},
): Promise<PaginatedResponse<HeroSection>> {
  return webhookClient.get<PaginatedResponse<HeroSection>>("/hero-sections/home", {
    searchParams: query,
  });
}
