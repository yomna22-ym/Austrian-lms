import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { PaginatedResponse } from "@/types/api";
import type { BlogCategoryItem } from "@/types/webhook/blog-categories";

export function listBlogCategories(): Promise<
  PaginatedResponse<BlogCategoryItem>
> {
  return webhookClient.get<PaginatedResponse<BlogCategoryItem>>(
    "/blog-categories",
  );
}
