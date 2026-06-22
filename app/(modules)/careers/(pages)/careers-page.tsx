import PageIntro from "@/app/shared/PageIntro";
import { listBranches } from "@/lib/api/webhook/branches";
import {
  getCareerStatistics,
  listCareers,
} from "@/lib/api/webhook/careers";
import { getHeroSection } from "@/lib/api/webhook/hero-sections";
import type { PaginationMeta } from "@/types/api";
import type { CareerStatistics } from "@/types/webhook/careers";
import {
  ApplicationJourneySection,
  CareersBenefitsSection,
  CareersListing,
} from "../components";
import type { CareerBranchOption, CareerJob } from "../types";
import { CAREERS_PAGE_LIMIT } from "../utils";
import { mapCareerOpeningsToJobs } from "../utils/careers.mapper";

const DEFAULT_INTRO = {
  title: "Join Our Professional Academic Team",
  description:
    "Experience a collaborative, innovative environment where German academic quality meets cultural passion. Help us shape the future of language education in Egypt.",
};

const EMPTY_STATISTICS: CareerStatistics = {
  nationalitiesCount: 0,
  workshopsCount: 0,
};

async function loadCareersPageData(): Promise<{
  jobs: CareerJob[];
  pagination: PaginationMeta | null;
  branchOptions: CareerBranchOption[];
  statistics: CareerStatistics;
  intro: { title: string; description: string };
}> {
  const [careersResult, statisticsResult, branchesResult, heroResult] =
    await Promise.allSettled([
      listCareers({ page: 1, limit: CAREERS_PAGE_LIMIT }),
      getCareerStatistics(),
      listBranches({ limit: 100 }),
      getHeroSection("careers"),
    ]);

  const careers =
    careersResult.status === "fulfilled" ? careersResult.value : null;
  const statistics =
    statisticsResult.status === "fulfilled"
      ? statisticsResult.value
      : EMPTY_STATISTICS;
  const branches =
    branchesResult.status === "fulfilled" ? branchesResult.value : null;
  const hero = heroResult.status === "fulfilled" ? heroResult.value : null;

  return {
    jobs: careers ? mapCareerOpeningsToJobs(careers.items) : [],
    pagination: careers?.pagination ?? null,
    branchOptions:
      branches?.items.map((branch) => ({
        id: branch._id,
        name: branch.name,
      })) ?? [],
    statistics,
    intro: hero
      ? { title: hero.title, description: hero.description }
      : DEFAULT_INTRO,
  };
}

export default async function CareersPage() {
  const { jobs, pagination, branchOptions, statistics, intro } =
    await loadCareersPageData();

  return (
    <div className="w-full overflow-hidden bg-white">
      <PageIntro
        eyebrow="Careers"
        title={intro.title}
        description={intro.description}
      />
      <CareersListing
        initialJobs={jobs}
        initialPagination={pagination}
        branchOptions={branchOptions}
      />
      <CareersBenefitsSection statistics={statistics} />
      <ApplicationJourneySection />
    </div>
  );
}
