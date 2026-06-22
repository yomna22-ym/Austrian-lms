import { siteClient } from "@/lib/api/site-client";
import type { PaginatedResponse } from "@/types/api";
import type { Branch, BranchType, ListBranchesQuery } from "@/types/webhook/branches";

export const branchesService = {
  listBranches(
    query: ListBranchesQuery = {},
  ): Promise<PaginatedResponse<Branch>> {
    return siteClient.get<PaginatedResponse<Branch>>("/branches", {
      searchParams: query,
    });
  },

  listGlobalBranches(limit = 100): Promise<PaginatedResponse<Branch>> {
    return this.listBranches({ type: "global" as BranchType, limit });
  },

  listLocalBranches(limit = 100): Promise<PaginatedResponse<Branch>> {
    return this.listBranches({ type: "local" as BranchType, limit });
  },
};
