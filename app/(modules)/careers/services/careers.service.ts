import { siteClient } from "@/lib/api/site-client";
import type { PaginatedResponse } from "@/types/api";
import type {
  CareerApplicationResult,
  CareerApplyBody,
  CareerOpening,
  CareerStatistics,
  ListCareersQuery,
  ResumeUploadResult,
} from "@/types/webhook/careers";

export const careersService = {
  listCareers(
    query: ListCareersQuery = {},
  ): Promise<PaginatedResponse<CareerOpening>> {
    return siteClient.get<PaginatedResponse<CareerOpening>>("/careers", {
      searchParams: query,
    });
  },

  getStatistics(): Promise<CareerStatistics> {
    return siteClient.get<CareerStatistics>("/careers/statistics");
  },

  getCareer(id: string): Promise<CareerOpening> {
    return siteClient.get<CareerOpening>(`/careers/${id}`);
  },

  uploadResume(resume: File): Promise<ResumeUploadResult> {
    const formData = new FormData();
    formData.append("resume", resume);
    return siteClient.post<ResumeUploadResult>(
      "/careers/upload-resume",
      formData,
    );
  },

  apply(id: string, body: CareerApplyBody): Promise<CareerApplicationResult> {
    return siteClient.post<CareerApplicationResult>(`/careers/${id}/apply`, body);
  },
};
