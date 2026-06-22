import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { getCareerStatistics } from "@/lib/api/webhook/careers";

export async function GET() {
  try {
    const data = await getCareerStatistics();
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
