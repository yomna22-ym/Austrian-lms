import { getCertificationsPage } from "@/lib/api/webhook/certifications";
import { listCertificationExams } from "@/lib/api/webhook/certification-exams";
import type { CertificationsPage } from "@/types/webhook/certifications";
import type { CertificationExam } from "@/types/webhook/certification-exams";

const PAGE_LIMIT = 6;

export interface CertificatesPageData {
  certPage: CertificationsPage | null;
  exams: CertificationExam[];
  examsPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null;
}

export async function loadCertificatesPageData(): Promise<CertificatesPageData> {
  const [certPageResult, examsResult] = await Promise.allSettled([
    getCertificationsPage(),
    listCertificationExams({ page: 1, limit: PAGE_LIMIT }),
  ]);

  const certPage =
    certPageResult.status === "fulfilled" ? certPageResult.value : null;

  const exams =
    examsResult.status === "fulfilled" ? examsResult.value.items : [];

  const examsPagination =
    examsResult.status === "fulfilled"
      ? examsResult.value.pagination
      : null;

  return { certPage, exams, examsPagination };
}
