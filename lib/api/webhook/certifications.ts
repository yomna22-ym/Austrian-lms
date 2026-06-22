import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { CertificationsPage } from "@/types/webhook/certifications";

export function getCertificationsPage(): Promise<CertificationsPage> {
  return webhookClient.get<CertificationsPage>("/certifications");
}
