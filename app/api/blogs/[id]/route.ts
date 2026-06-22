import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { getBlog } from "@/lib/api/webhook/blogs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const data = await getBlog(id);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
