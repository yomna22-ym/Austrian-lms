"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { blogsService } from "../services";
import type {
  BlogArticle,
  BlogCategoryOption,
  BlogFilters,
  BlogSortOption,
} from "../types";
import { BLOGS_PAGE_LIMIT, DEFAULT_BLOG_FILTERS } from "../types";
import { mapBlogCardsToArticles } from "../utils/blogs.mapper";
import { sortBlogArticles } from "../utils/blogs.sort";
import type { PaginationMeta } from "@/types/api";
import { ApiError } from "@/lib/api/errors";

const SEARCH_DEBOUNCE_MS = 300;

interface UseBlogsListOptions {
  initialFeatured: BlogArticle[];
  initialTop: BlogArticle[];
  initialLatest: BlogArticle[];
  initialPagination: PaginationMeta;
  categories: BlogCategoryOption[];
}

export function useBlogsList({
  initialFeatured,
  initialTop,
  initialLatest,
  initialPagination,
  categories,
}: UseBlogsListOptions) {
  const [featured, setFeatured] = useState(initialFeatured);
  const [top, setTop] = useState(initialTop);
  const [latest, setLatest] = useState(initialLatest);
  const [pagination, setPagination] = useState(initialPagination);
  const [filters, setFilters] = useState<BlogFilters>(DEFAULT_BLOG_FILTERS);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const needsFetch = useMemo(
    () => Boolean(filters.search || filters.categoryId || filters.page > 1),
    [filters.search, filters.categoryId, filters.page],
  );

  const filtersActive = useMemo(
    () => Boolean(filters.search || filters.categoryId || filters.sort !== "latest"),
    [filters.search, filters.categoryId, filters.sort],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFilters((current) =>
        current.search === searchInput
          ? current
          : { ...current, search: searchInput, page: 1 },
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    const queryBase = {
      search: filters.search || undefined,
      categoryId: filters.categoryId || undefined,
    };

    try {
      const [latestData, featuredData, topData] = await Promise.all([
        blogsService.listBlogs({
          ...queryBase,
          placement: "default",
          page: filters.page,
          limit: BLOGS_PAGE_LIMIT,
        }),
        blogsService.listBlogs({
          ...queryBase,
          placement: "featured",
          limit: 3,
          page: 1,
        }),
        blogsService.listBlogs({
          ...queryBase,
          placement: "top",
          limit: 2,
          page: 1,
        }),
      ]);

      setLatest(
        sortBlogArticles(
          mapBlogCardsToArticles(latestData.items),
          filters.sort,
        ),
      );
      setPagination(latestData.pagination);
      setFeatured(
        sortBlogArticles(
          mapBlogCardsToArticles(featuredData.items),
          filters.sort,
        ),
      );
      setTop(
        sortBlogArticles(mapBlogCardsToArticles(topData.items), filters.sort),
      );
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to load articles",
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (!needsFetch) {
      setFeatured(sortBlogArticles(initialFeatured, filters.sort));
      setTop(sortBlogArticles(initialTop, filters.sort));
      setLatest(sortBlogArticles(initialLatest, filters.sort));
      setPagination(initialPagination);
      setError(null);
      return;
    }

    void fetchBlogs();
  }, [
    needsFetch,
    filters.sort,
    fetchBlogs,
    initialFeatured,
    initialTop,
    initialLatest,
    initialPagination,
  ]);

  return {
    featured,
    top,
    latest,
    pagination,
    categories,
    filters,
    searchInput,
    loading,
    error,
    filtersActive,
    setSearchInput,
    setCategoryId: (categoryId: string) =>
      setFilters((current) => ({ ...current, categoryId, page: 1 })),
    setSort: (sort: BlogSortOption) =>
      setFilters((current) => ({ ...current, sort, page: 1 })),
    setPage: (page: number) => setFilters((current) => ({ ...current, page })),
  };
}
