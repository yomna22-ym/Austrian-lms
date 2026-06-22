import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { getCertificationsPage } from "@/lib/api/webhook/certifications";

export async function GET() {
  try {
    const data = await getCertificationsPage();
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
