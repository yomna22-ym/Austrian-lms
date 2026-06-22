import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type {
  CertificationExamsPaginatedResponse,
  ListCertificationExamsQuery,
} from "@/types/webhook/certification-exams";

export function listCertificationExams(
  query: ListCertificationExamsQuery = {},
): Promise<CertificationExamsPaginatedResponse> {
  const search = new URLSearchParams();
  if (query.officialCertificationId)
    search.set("officialCertificationId", query.officialCertificationId);
  if (query.page) search.set("page", String(query.page));
  if (query.limit) search.set("limit", String(query.limit));
  const qs = search.toString();
  return webhookClient.get<CertificationExamsPaginatedResponse>(
    `/certification-exams${qs ? `?${qs}` : ""}`,
  );
}
