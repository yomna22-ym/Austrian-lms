import { resolveLmsAssetUrl } from "@/lib/media";
import type { HeroSection } from "@/types/webhook/hero-sections";
import type { HomeHeroSlide } from "../types/home-hero.types";

export function mapHeroSectionToSlide(section: HeroSection): HomeHeroSlide {
  return {
    id: section._id,
    title: section.title,
    highlight: section.description,
    image: resolveLmsAssetUrl(section.image) || "/hero.jpg",
  };
}

export function mapHeroSectionsToSlides(sections: HeroSection[]): HomeHeroSlide[] {
  return sections.map(mapHeroSectionToSlide);
}
