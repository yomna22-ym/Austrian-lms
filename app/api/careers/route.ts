import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { parseNumericParam, parseSearchParams } from "@/lib/api/query";
import { listCareers } from "@/lib/api/webhook/careers";
import type { ListCareersQuery } from "@/types/webhook/careers";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const query: ListCareersQuery = {
      page: parseNumericParam(params.page),
      limit: parseNumericParam(params.limit),
      search: params.search,
      category: params.category as ListCareersQuery["category"],
      employmentType: params.employmentType as ListCareersQuery["employmentType"],
      branchId: params.branchId,
    };
    const data = await listCareers(query);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
