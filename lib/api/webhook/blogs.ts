import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { PaginatedResponse } from "@/types/api";
import type {
  BlogCard,
  BlogDetail,
  ListBlogsQuery,
} from "@/types/webhook/blogs";

export function listBlogs(
  query: ListBlogsQuery = {},
): Promise<PaginatedResponse<BlogCard>> {
  return webhookClient.get<PaginatedResponse<BlogCard>>("/blogs", {
    searchParams: query,
  });
}

export function getBlog(id: string): Promise<BlogDetail> {
  return webhookClient.get<BlogDetail>(`/blogs/${id}`);
}
