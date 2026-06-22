import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { getCareer } from "@/lib/api/webhook/careers";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const data = await getCareer(id);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
