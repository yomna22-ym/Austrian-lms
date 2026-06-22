import "server-only";

import { listBranches } from "@/lib/api/webhook/branches";
import { getHeroSection } from "@/lib/api/webhook/hero-sections";
import type { BranchLocation } from "@/app/shared/LocationFrame/types";
import type { GlobalLocation } from "../types";
import {
  BRANCHES_HERO,
  EGYPT_BRANCHES,
  EGYPT_BRANCHES_COPY,
  GLOBAL_LOCATIONS,
  GLOBAL_PRESENCE_COPY,
  mapGlobalBranches,
  mapLocalBranches,
} from "../utils";

const BRANCHES_FETCH_LIMIT = 100;

export interface BranchesPageData {
  intro: { title: string; description: string };
  globalLocations: GlobalLocation[];
  localBranches: BranchLocation[];
  egyptCopy: typeof EGYPT_BRANCHES_COPY;
}

export async function loadBranchesPageData(): Promise<BranchesPageData> {
  const [globalResult, localResult, heroResult] = await Promise.allSettled([
    listBranches({ type: "global", limit: BRANCHES_FETCH_LIMIT }),
    listBranches({ type: "local", limit: BRANCHES_FETCH_LIMIT }),
    getHeroSection("branch"),
  ]);

  const globalBranches =
    globalResult.status === "fulfilled" ? globalResult.value.items : [];
  const localBranchItems =
    localResult.status === "fulfilled" ? localResult.value.items : [];
  const hero = heroResult.status === "fulfilled" ? heroResult.value : null;

  const globalLocations =
    globalBranches.length > 0
      ? mapGlobalBranches(globalBranches)
      : [...GLOBAL_LOCATIONS];

  const localBranches =
    localBranchItems.length > 0
      ? mapLocalBranches(localBranchItems)
      : [...EGYPT_BRANCHES];

  const branchCount = localBranches.length;

  return {
    intro: hero
      ? { title: hero.title, description: hero.description }
      : BRANCHES_HERO,
    globalLocations,
    localBranches,
    egyptCopy: {
      ...EGYPT_BRANCHES_COPY,
      description:
        branchCount > 0
          ? `${branchCount} branch${branchCount === 1 ? "" : "es"} across Egypt — same high standards of Austrian German education. Choose a location to see details.`
          : EGYPT_BRANCHES_COPY.description,
    },
  };
}
