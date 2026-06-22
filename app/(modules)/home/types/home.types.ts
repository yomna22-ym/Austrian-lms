import type { BlogArticle } from "@/app/(modules)/blogs/types";
import type { CareerJob } from "@/app/(modules)/careers/types";
import type { HomeHeroSlide } from "./home-hero.types";
import type { TeamMember } from "./team.types";

export interface HomePageData {
  heroSlides: HomeHeroSlide[];
  articles: BlogArticle[];
  jobs: CareerJob[];
  teamMembers: TeamMember[];
}
