import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { getEvent } from "@/lib/api/webhook/events";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const data = await getEvent(id);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
