import { siteClient } from "@/lib/api/site-client";
import type {
  CertificationExamsPaginatedResponse,
  ListCertificationExamsQuery,
} from "@/types/webhook/certification-exams";

export const certificationExamsService = {
  listExams(
    query: ListCertificationExamsQuery = {},
  ): Promise<CertificationExamsPaginatedResponse> {
    return siteClient.get<CertificationExamsPaginatedResponse>(
      "/certification-exams",
      { searchParams: query },
    );
  },
};
