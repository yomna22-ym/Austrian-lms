import "server-only";

import { loadFeaturedBlogArticles } from "@/app/(modules)/blogs/utils/blogs.loader";
import { mapCareerOpeningsToJobs } from "@/app/(modules)/careers/utils/careers.mapper";
import { CAREER_JOBS } from "@/app/(modules)/careers/utils/careers.constants";
import { listCareers } from "@/lib/api/webhook/careers";
import { listHomeHeroSections } from "@/lib/api/webhook/hero-sections";
import { listTeams } from "@/lib/api/webhook/teams";
import { HOME_HERO_SLIDES } from "./home-hero.constants";
import { mapHeroSectionsToSlides } from "./home-hero.mapper";
import { TEAM_MEMBERS } from "./teams.constants";
import { mapTeamCardsToMembers } from "./teams.mapper";
import type { HomePageData } from "../types/home.types";

const HOME_CAREERS_LIMIT = 2;
const HOME_BLOGS_LIMIT = 3;
const HOME_TEAMS_LIMIT = 5;
const HOME_HERO_SLIDES_LIMIT = 10;

export async function loadHomePageData(): Promise<HomePageData> {
  const [careersResult, articlesResult, teamsResult, heroResult] =
    await Promise.allSettled([
      listCareers({ page: 1, limit: HOME_CAREERS_LIMIT }),
      loadFeaturedBlogArticles(HOME_BLOGS_LIMIT),
      listTeams({ page: 1, limit: HOME_TEAMS_LIMIT }),
      listHomeHeroSections({ page: 1, limit: HOME_HERO_SLIDES_LIMIT }),
    ]);

  const careersPayload =
    careersResult.status === "fulfilled" ? careersResult.value : null;
  const articles =
    articlesResult.status === "fulfilled" ? articlesResult.value : [];

  const jobs =
    careersPayload?.items.length
      ? mapCareerOpeningsToJobs(careersPayload.items).slice(
          0,
          HOME_CAREERS_LIMIT,
        )
      : CAREER_JOBS.slice(0, HOME_CAREERS_LIMIT);

  const teamsPayload =
    teamsResult.status === "fulfilled" ? teamsResult.value : null;

  const teamMembers =
    teamsPayload?.items.length
      ? mapTeamCardsToMembers(teamsPayload.items).slice(0, HOME_TEAMS_LIMIT)
      : TEAM_MEMBERS.slice(0, HOME_TEAMS_LIMIT);

  const heroPayload =
    heroResult.status === "fulfilled" ? heroResult.value : null;

  const heroSlides =
    heroPayload?.items.length
      ? mapHeroSectionsToSlides(heroPayload.items).slice(0, HOME_HERO_SLIDES_LIMIT)
      : HOME_HERO_SLIDES;

  return { heroSlides, articles, jobs, teamMembers };
}
