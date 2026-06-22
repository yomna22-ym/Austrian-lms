import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { parseNumericParam, parseSearchParams } from "@/lib/api/query";
import { listBranches } from "@/lib/api/webhook/branches";
import { hasLmsWebhookSecret } from "@/lib/env";
import { EGYPT_BRANCHES } from "@/app/(modules)/branches/utils";
import type { PaginatedResponse } from "@/types/api";
import type { Branch, ListBranchesQuery } from "@/types/webhook/branches";

function getLocalBranchFallback(
  query: ListBranchesQuery,
): PaginatedResponse<Branch> {
  const search = query.search?.trim().toLowerCase();
  const items = EGYPT_BRANCHES.map((branch) => ({
    _id: branch.id,
    id: branch.id,
    companyId: "local-development",
    name: branch.name,
    description: "",
    lat: branch.lat,
    lng: branch.lng,
    type: "local" as const,
    phone: branch.phone ?? "",
    address: branch.address ?? "",
    addressLink: "",
    city: branch.name,
    country: "Egypt",
    isActive: true,
  })).filter((branch) => {
    if (query.type === "global") return false;
    if (!search) return true;
    return `${branch.name} ${branch.address}`.toLowerCase().includes(search);
  });

  const page = Math.max(query.page ?? 1, 1);
  const limit = Math.max(query.limit ?? (items.length || 1), 1);
  const start = (page - 1) * limit;
  const pageItems = items.slice(start, start + limit);
  const totalPages = Math.max(Math.ceil(items.length / limit), 1);

  return {
    items: pageItems,
    pagination: {
      total: items.length,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const query: ListBranchesQuery = {
      page: parseNumericParam(params.page),
      limit: parseNumericParam(params.limit),
      search: params.search,
      type: params.type as ListBranchesQuery["type"],
    };

    if (!hasLmsWebhookSecret()) {
      return jsonData(getLocalBranchFallback(query));
    }

    const data = await listBranches(query);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
