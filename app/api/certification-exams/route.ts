import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { parseNumericParam, parseSearchParams } from "@/lib/api/query";
import { listCertificationExams } from "@/lib/api/webhook/certification-exams";
import type { ListCertificationExamsQuery } from "@/types/webhook/certification-exams";

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const query: ListCertificationExamsQuery = {
      page: parseNumericParam(params.page),
      limit: parseNumericParam(params.limit),
      officialCertificationId: params.officialCertificationId,
    };
    const data = await listCertificationExams(query);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
