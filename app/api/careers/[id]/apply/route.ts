import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { applyToCareer } from "@/lib/api/webhook/careers";
import type { CareerApplyBody } from "@/types/webhook/careers";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as CareerApplyBody;
    const data = await applyToCareer(id, body);
    return jsonData(data, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}
