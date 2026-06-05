"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogArticleCard from "./blog-article-card";
import { LATEST_ARTICLES } from "../utils";

const PAGE_ITEMS = ["1", "2", "3", "...", "12"] as const;
type PageItem = (typeof PAGE_ITEMS)[number];
type NumericPage = Exclude<PageItem, "...">;

export default function LatestArticlesSection() {
  const [activePage, setActivePage] = useState<NumericPage>("1");
  const numericPages = PAGE_ITEMS.filter(
    (page): page is NumericPage => page !== "..."
  );
  const activeIndex = numericPages.indexOf(activePage);

  const goToPreviousPage = () => {
    setActivePage(numericPages[Math.max(activeIndex - 1, 0)]);
  };

  const goToNextPage = () => {
    setActivePage(numericPages[Math.min(activeIndex + 1, numericPages.length - 1)]);
  };

  return (
    <section className="mt-8">
      <h2 className="text-[34px] font-extrabold leading-tight text-text-primary">
        Latest Articles
      </h2>

      <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {LATEST_ARTICLES.map((article) => (
          <BlogArticleCard
            key={article.title}
            {...article}
            href="/blogs/coffee-house-phrases-vienna"
            imageClassName="h-[188px]"
            className="rounded-[8px] shadow-none"
          />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          onClick={goToPreviousPage}
          disabled={activePage === numericPages[0]}
          className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-[#e5e5e5] bg-white text-text-primary transition-colors hover:border-secondary disabled:opacity-50"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        {PAGE_ITEMS.map((page) => (
          <button
            key={page}
            type="button"
            disabled={page === "..."}
            onClick={() => page !== "..." && setActivePage(page)}
            aria-current={page === activePage ? "page" : undefined}
            className={[
              "flex h-9 min-w-9 items-center justify-center rounded-[5px] border px-3 text-[13px] font-bold",
              page === activePage
                ? "border-secondary bg-secondary text-white"
                : "border-[#e5e5e5] bg-white text-text-primary",
              page === "..." ? "cursor-default" : "transition-colors hover:border-secondary",
            ].join(" ")}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          onClick={goToNextPage}
          disabled={activePage === numericPages[numericPages.length - 1]}
          className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-[#e5e5e5] bg-white text-text-primary transition-colors hover:border-secondary disabled:opacity-50"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
