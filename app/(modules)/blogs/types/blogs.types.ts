import type { BlogPlacement } from "@/types/webhook/blogs";
import type { PaginationMeta } from "@/types/api";

export type BlogSortOption = "latest" | "popular" | "oldest";

export interface BlogArticle {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  author?: string;
  readTime?: string;
  placement: BlogPlacement;
  href: string;
  featured?: boolean;
  createdAt: string;
}

export interface BlogCategoryOption {
  id: string;
  name: string;
}

export interface BlogDetailArticle extends BlogArticle {
  contentHtml?: string;
  tableOfContents: readonly string[];
  updatedAt?: string;
}

export interface BlogsPageIntro {
  title: string;
  description: string;
}

export interface BlogsPageData {
  intro: BlogsPageIntro;
  featured: BlogArticle[];
  top: BlogArticle[];
  latest: BlogArticle[];
  pagination: PaginationMeta;
  categories: BlogCategoryOption[];
}

export interface BlogFilters {
  search: string;
  categoryId: string;
  page: number;
  sort: BlogSortOption;
}

export const BLOGS_PAGE_LIMIT = 9;

export const DEFAULT_BLOG_FILTERS: BlogFilters = {
  search: "",
  categoryId: "",
  page: 1,
  sort: "latest",
};
