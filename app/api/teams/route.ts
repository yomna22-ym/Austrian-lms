import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { parseNumericParam, parseSearchParams } from "@/lib/api/query";
import { listTeams } from "@/lib/api/webhook/teams";
import type { ListTeamsQuery } from "@/types/webhook/teams";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const query: ListTeamsQuery = {
      page: parseNumericParam(params.page),
      limit: parseNumericParam(params.limit),
    };
    const data = await listTeams(query);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
