import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { PaginatedResponse } from "@/types/api";
import type { Branch, ListBranchesQuery } from "@/types/webhook/branches";

export function listBranches(
  query: ListBranchesQuery = {},
): Promise<PaginatedResponse<Branch>> {
  return webhookClient.get<PaginatedResponse<Branch>>("/branches", {
    searchParams: query,
  });
}
