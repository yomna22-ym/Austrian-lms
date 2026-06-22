import "server-only";

import { listBlogs, getBlog } from "@/lib/api/webhook/blogs";
import { listBlogCategories } from "@/lib/api/webhook/blog-categories";
import { getHeroSection } from "@/lib/api/webhook/hero-sections";
import type { PaginationMeta } from "@/types/api";
import type {
  BlogArticle,
  BlogCategoryOption,
  BlogDetailArticle,
  BlogsPageData,
} from "../types";
import {
  FEATURED_ARTICLES,
  LATEST_ARTICLES,
  TOP_ARTICLES,
} from "./blog.constants";
import {
  mapBlogCardsToArticles,
} from "./blogs.mapper";
import { mapBlogDetailToArticle } from "./blogs.mapper.server";
import type { BlogPlacement } from "@/types/webhook/blogs";

const BLOGS_HERO = {
  title: "Cultural Journal",
  description:
    "Exploring the life, language, and culture of Austria. Insights from our experts and stories from the heart of Europe.",
};

const EMPTY_PAGINATION: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 9,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

const MOCK_FEATURED: BlogArticle[] = FEATURED_ARTICLES.map((article, index) => ({
  id: `mock-featured-${index}`,
  image: article.image,
  category: article.category,
  title: article.title,
  description: article.description,
  placement: "featured" as BlogPlacement,
  href: "/blogs/mock-featured-0",
  featured: "featured" in article ? article.featured : index === 0,
  createdAt: new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
}));

const MOCK_TOP: BlogArticle[] = TOP_ARTICLES.map((article, index) => ({
  id: `mock-top-${index}`,
  image: article.image,
  category: article.category,
  title: article.title,
  description: article.description,
  author: "author" in article ? article.author : undefined,
  readTime: "readTime" in article ? article.readTime : undefined,
  placement: "top" as BlogPlacement,
  href: "/blogs/mock-featured-0",
  createdAt: new Date(Date.UTC(2026, 1, index + 1)).toISOString(),
}));

const MOCK_LATEST: BlogArticle[] = LATEST_ARTICLES.map((article, index) => ({
  id: `mock-latest-${index}`,
  image: article.image,
  category: article.category,
  title: article.title,
  description: article.description,
  author: article.author,
  readTime: article.readTime,
  placement: "default" as BlogPlacement,
  href: "/blogs/mock-featured-0",
  createdAt: new Date(Date.UTC(2026, 2, index + 1)).toISOString(),
}));

export async function loadBlogsPageData(): Promise<BlogsPageData> {
  const [featuredResult, topResult, latestResult, categoriesResult, heroResult] =
    await Promise.allSettled([
      listBlogs({ placement: "featured", limit: 3, page: 1 }),
      listBlogs({ placement: "top", limit: 2, page: 1 }),
      listBlogs({ placement: "default", limit: 9, page: 1 }),
      listBlogCategories(),
      getHeroSection("blog"),
    ]);

  const featuredPayload =
    featuredResult.status === "fulfilled" ? featuredResult.value : null;
  const latestPayload =
    latestResult.status === "fulfilled" ? latestResult.value : null;
  const categoriesPayload =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : null;
  const hero = heroResult.status === "fulfilled" ? heroResult.value : null;

  const featured =
    featuredResult.status === "fulfilled"
      ? mapBlogCardsToArticles(featuredResult.value.items)
      : MOCK_FEATURED;

  const top =
    topResult.status === "fulfilled"
      ? mapBlogCardsToArticles(topResult.value.items)
      : MOCK_TOP;

  const latest =
    latestResult.status === "fulfilled"
      ? mapBlogCardsToArticles(latestResult.value.items)
      : MOCK_LATEST;

  const pagination = latestPayload?.pagination ?? {
    ...EMPTY_PAGINATION,
    total: latest.length,
    totalPages: 1,
  };

  const categories: BlogCategoryOption[] = categoriesPayload?.items.length
    ? categoriesPayload.items.map((category) => ({
        id: category.id,
        name: category.name,
      }))
    : [];

  return {
    intro: hero
      ? { title: hero.title, description: hero.description }
      : BLOGS_HERO,
    featured,
    top,
    latest,
    pagination,
    categories,
  };
}

export async function loadBlogDetail(id: string): Promise<BlogDetailArticle | null> {
  try {
    const detail = await getBlog(id);
    return mapBlogDetailToArticle(detail);
  } catch {
    if (id.startsWith("mock-")) {
      return null;
    }
    return null;
  }
}

export async function loadFeaturedBlogArticles(
  limit = 3,
): Promise<BlogArticle[]> {
  try {
    const data = await listBlogs({ placement: "featured", limit, page: 1 });
    if (data.items.length) {
      return mapBlogCardsToArticles(data.items);
    }
  } catch {
    // fall through to mock
  }
  return MOCK_FEATURED.slice(0, limit);
}
