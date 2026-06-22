"use client";

import PageIntro from "@/app/shared/PageIntro";
import { MotionDiv } from "@/app/shared/Motion";
import {
  BlogCallToAction,
  BlogFilterToolbar,
  FeaturedArticlesSection,
  LatestArticlesSection,
  TopArticlesSection,
} from "../components";
import { useBlogsList } from "../hooks";
import type { BlogArticle, BlogCategoryOption, BlogsPageIntro } from "../types";
import type { PaginationMeta } from "@/types/api";

interface BlogsPageClientProps {
  intro: BlogsPageIntro;
  initialFeatured: BlogArticle[];
  initialTop: BlogArticle[];
  initialLatest: BlogArticle[];
  initialPagination: PaginationMeta;
  categories: BlogCategoryOption[];
}

export default function BlogsPageClient({
  intro,
  initialFeatured,
  initialTop,
  initialLatest,
  initialPagination,
  categories,
}: BlogsPageClientProps) {
  const list = useBlogsList({
    initialFeatured,
    initialTop,
    initialLatest,
    initialPagination,
    categories,
  });

  return (
    <div className="w-full overflow-hidden bg-white">
      <PageIntro
        eyebrow="Blogs"
        title={intro.title}
        description={intro.description}
      />
      <main className="w-full px-4 py-14 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <MotionDiv>
            <BlogFilterToolbar
              categories={list.categories}
              search={list.searchInput}
              sort={list.filters.sort}
              activeCategoryId={list.filters.categoryId}
              onSearchChange={list.setSearchInput}
              onCategoryChange={list.setCategoryId}
              onSortChange={list.setSort}
            />
          </MotionDiv>

          <div className="mt-16">
            <FeaturedArticlesSection articles={list.featured} />
            <TopArticlesSection articles={list.top} />
            <LatestArticlesSection
              articles={list.latest}
              pagination={list.pagination}
              loading={list.loading}
              error={list.error}
              page={list.filters.page}
              filtersActive={list.filtersActive}
              onPageChange={list.setPage}
            />
          </div>
        </div>
      </main>

      <BlogCallToAction />
    </div>
  );
}
