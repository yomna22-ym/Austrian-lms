"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
import BlogArticleCard from "./blog-article-card";
import type { BlogArticle } from "../types";
import type { PaginationMeta } from "@/types/api";

interface LatestArticlesSectionProps {
  articles: BlogArticle[];
  pagination: PaginationMeta;
  loading?: boolean;
  error?: string | null;
  page: number;
  filtersActive?: boolean;
  onPageChange: (page: number) => void;
}

export default function LatestArticlesSection({
  articles,
  pagination,
  loading = false,
  error,
  page,
  filtersActive = false,
  onPageChange,
}: LatestArticlesSectionProps) {
  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1,
  );

  return (
    <MotionSection className="mt-16">
      <SectionHeader
        align="left"
        eyebrow="Latest"
        title="Latest Articles"
        description="Fresh updates, learning advice, and institute news."
      />

      {error ? (
        <p className="mt-4 text-sm text-secondary">{error}</p>
      ) : null}

      {!loading && articles.length === 0 ? (
        <p className="mt-7 rounded-[16px] border border-dashed border-[#eadede] bg-[#fafafa] px-6 py-10 text-center text-[14px] text-text-secondary">
          {filtersActive
            ? "No articles match your filters. Try another category or search term."
            : "No articles available yet."}
        </p>
      ) : (
        <div
          className={[
            "mt-7 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3",
            loading ? "opacity-60" : "",
          ].join(" ")}
        >
          {articles.map((article, index) => (
            <MotionDiv key={article.id} delay={index * 0.04} hoverLift>
              <BlogArticleCard
                {...article}
                href={article.href}
                imageClassName="h-[188px]"
              />
            </MotionDiv>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 ? (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={!pagination.hasPrevPage || loading}
            className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#eadede] bg-white text-text-primary shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-colors hover:border-secondary disabled:opacity-50"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={[
                "flex h-11 min-w-11 items-center justify-center rounded-[10px] border px-3 text-[13px] font-bold shadow-[0_1px_2px_rgba(17,19,21,0.04)]",
                pageNumber === page
                  ? "border-secondary bg-secondary text-white"
                  : "border-[#e5e5e5] bg-white text-text-primary transition-colors hover:border-secondary",
              ].join(" ")}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            onClick={() => onPageChange(page + 1)}
            disabled={!pagination.hasNextPage || loading}
            className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#eadede] bg-white text-text-primary shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-colors hover:border-secondary disabled:opacity-50"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </MotionSection>
  );
}
