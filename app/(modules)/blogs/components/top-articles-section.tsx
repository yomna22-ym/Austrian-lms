"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogArticleCard from "./blog-article-card";
import { TOP_ARTICLES } from "../utils";

export default function TopArticlesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleArticles = TOP_ARTICLES.map(
    (_, index) => TOP_ARTICLES[(startIndex + index) % TOP_ARTICLES.length]
  );
  const [wideArticle, compactArticle] = visibleArticles;

  const goToPrevious = () => {
    setStartIndex((current) =>
      current === 0 ? TOP_ARTICLES.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setStartIndex((current) => (current + 1) % TOP_ARTICLES.length);
  };

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-[34px] font-extrabold leading-tight text-text-primary">
          Top Articles
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous top articles"
            onClick={goToPrevious}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-[#f2f2f2]"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next top articles"
            onClick={goToNext}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-[2fr_1fr]">
        <BlogArticleCard
          {...wideArticle}
          href="/blogs/coffee-house-phrases-vienna"
          imageClassName="h-[280px]"
          className="rounded-[8px] shadow-none"
        />
        <BlogArticleCard
          {...compactArticle}
          href="/blogs/coffee-house-phrases-vienna"
          imageClassName="h-[280px]"
          className="rounded-[8px] shadow-none"
        />
      </div>
    </section>
  );
}
