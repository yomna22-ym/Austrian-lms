import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { PaginatedResponse } from "@/types/api";
import type {
  CareerApplicationResult,
  CareerApplyBody,
  CareerOpening,
  CareerStatistics,
  ListCareersQuery,
  ResumeUploadResult,
} from "@/types/webhook/careers";

export function listCareers(
  query: ListCareersQuery = {},
): Promise<PaginatedResponse<CareerOpening>> {
  return webhookClient.get<PaginatedResponse<CareerOpening>>("/careers", {
    searchParams: query,
  });
}

export function getCareerStatistics(): Promise<CareerStatistics> {
  return webhookClient.get<CareerStatistics>("/careers/statistics");
}

export function getCareer(id: string): Promise<CareerOpening> {
  return webhookClient.get<CareerOpening>(`/careers/${id}`);
}

export function uploadResume(formData: FormData): Promise<ResumeUploadResult> {
  return webhookClient.post<ResumeUploadResult>(
    "/careers/upload-resume",
    formData,
  );
}

export function applyToCareer(
  id: string,
  body: CareerApplyBody,
): Promise<CareerApplicationResult> {
  return webhookClient.post<CareerApplicationResult>(
    `/careers/${id}/apply`,
    body,
  );
}
