"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
import BlogArticleCard from "./blog-article-card";
import type { BlogArticle } from "../types";

interface TopArticlesSectionProps {
  articles: BlogArticle[];
}

export default function TopArticlesSection({
  articles,
}: TopArticlesSectionProps) {
  const [startIndex, setStartIndex] = useState(0);

  if (articles.length === 0) return null;

  const visibleArticles =
    articles.length > 1
      ? articles.map(
          (_, index) => articles[(startIndex + index) % articles.length],
        )
      : articles;

  const [wideArticle, compactArticle] = visibleArticles;

  const goToPrevious = () => {
    setStartIndex((current) =>
      current === 0 ? articles.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setStartIndex((current) => (current + 1) % articles.length);
  };

  return (
    <MotionSection className="mt-16">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          align="left"
          eyebrow="Popular"
          title="Top Articles"
          description="The content learners are reading most right now."
        />
        {articles.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous top articles"
              onClick={goToPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eadede] bg-white text-text-primary shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-colors hover:border-secondary/50 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next top articles"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white shadow-[0_8px_18px_rgba(185,19,23,0.18)] transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-[2fr_1fr]">
        <MotionDiv hoverLift>
          <BlogArticleCard
            {...wideArticle}
            href={wideArticle.href}
            imageClassName="h-[280px]"
          />
        </MotionDiv>
        {compactArticle && compactArticle.id !== wideArticle.id ? (
          <MotionDiv delay={0.08} hoverLift>
            <BlogArticleCard
              {...compactArticle}
              href={compactArticle.href}
              imageClassName="h-[280px]"
            />
          </MotionDiv>
        ) : null}
      </div>
    </MotionSection>
  );
}
