import { siteClient } from "@/lib/api/site-client";
import type { PaginatedResponse } from "@/types/api";
import type { BlogCategoryItem } from "@/types/webhook/blog-categories";
import type {
  BlogCard,
  BlogDetail,
  BlogPlacement,
  ListBlogsQuery,
} from "@/types/webhook/blogs";

export const blogsService = {
  listBlogs(query: ListBlogsQuery = {}): Promise<PaginatedResponse<BlogCard>> {
    return siteClient.get<PaginatedResponse<BlogCard>>("/blogs", {
      searchParams: query,
    });
  },

  getBlog(id: string): Promise<BlogDetail> {
    return siteClient.get<BlogDetail>(`/blogs/${id}`);
  },

  listCategories(): Promise<PaginatedResponse<BlogCategoryItem>> {
    return siteClient.get<PaginatedResponse<BlogCategoryItem>>(
      "/blog-categories",
    );
  },
};

export type { BlogPlacement };
