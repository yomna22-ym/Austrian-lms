import { siteClient } from "@/lib/api/site-client";
import type { HeroPageType, HeroSection } from "@/types/webhook/hero-sections";

export const heroSectionsService = {
  getHeroSection(pageType: HeroPageType): Promise<HeroSection> {
    return siteClient.get<HeroSection>(`/hero-sections/${pageType}`);
  },
};
