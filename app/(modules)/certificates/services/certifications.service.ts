import { siteClient } from "@/lib/api/site-client";
import type { CertificationsPage } from "@/types/webhook/certifications";

export const certificationsService = {
  getPage(): Promise<CertificationsPage> {
    return siteClient.get<CertificationsPage>("/certifications");
  },
};
