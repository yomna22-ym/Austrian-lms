import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { parseNumericParam, parseSearchParams } from "@/lib/api/query";
import { listEvents } from "@/lib/api/webhook/events";
import type { ListEventsQuery } from "@/types/webhook/events";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const query: ListEventsQuery = {
      page: parseNumericParam(params.page),
      limit: parseNumericParam(params.limit),
      category: params.category,
      date_from: params.date_from,
      date_to: params.date_to,
      sort: params.sort as ListEventsQuery["sort"],
      price_min: parseNumericParam(params.price_min),
      price_max: parseNumericParam(params.price_max),
    };
    const data = await listEvents(query);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
