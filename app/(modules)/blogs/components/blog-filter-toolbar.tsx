"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { BlogCategoryOption, BlogSortOption } from "../types";

const SORT_OPTIONS: { label: string; value: BlogSortOption }[] = [
  { label: "Latest", value: "latest" },
  { label: "Most Popular", value: "popular" },
  { label: "Oldest", value: "oldest" },
];

interface BlogFilterToolbarProps {
  categories: BlogCategoryOption[];
  search: string;
  sort: BlogSortOption;
  activeCategoryId: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onSortChange: (sort: BlogSortOption) => void;
}

function getSortLabel(sort: BlogSortOption): string {
  return SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "Latest";
}

export default function BlogFilterToolbar({
  categories,
  search,
  sort,
  activeCategoryId,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: BlogFilterToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="flex flex-col gap-5 rounded-[18px] border border-[#eadede] bg-white p-4 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={!activeCategoryId}
          onClick={() => onCategoryChange("")}
          className={[
            "h-11 rounded-full border px-5 text-[12px] font-bold shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:ring-offset-2",
            !activeCategoryId
              ? "border-secondary bg-secondary text-white shadow-[0_8px_18px_rgba(185,19,23,0.18)]"
              : "border-[#eadede] bg-white text-text-primary hover:border-secondary/50 hover:text-secondary",
          ].join(" ")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={category.id === activeCategoryId}
            onClick={() => onCategoryChange(category.id)}
            className={[
              "h-11 rounded-full border px-5 text-[12px] font-bold shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:ring-offset-2",
              category.id === activeCategoryId
                ? "border-secondary bg-secondary text-white shadow-[0_8px_18px_rgba(185,19,23,0.18)]"
                : "border-[#eadede] bg-white text-text-primary hover:border-secondary/50 hover:text-secondary",
            ].join(" ")}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative block sm:w-[292px]">
          <span className="sr-only">Search articles</span>
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search articles..."
            className="h-11 w-full rounded-[10px] border border-[#eadede] bg-white pl-11 pr-4 text-[12px] font-medium text-text-primary shadow-[0_1px_2px_rgba(17,19,21,0.04)] outline-none transition-colors placeholder:text-text-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          />
        </label>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((open) => !open)}
            className="flex h-11 min-w-[132px] items-center justify-between gap-5 rounded-[10px] border border-[#eadede] bg-white px-4 text-[12px] font-semibold text-text-primary shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-colors hover:border-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
          >
            {getSortLabel(sort)}
            <ChevronDown
              size={14}
              className={sortOpen ? "rotate-180 transition-transform" : "transition-transform"}
              aria-hidden="true"
            />
          </button>

          {sortOpen && (
            <div
              role="listbox"
              aria-label="Sort articles"
              className="absolute right-0 top-[calc(100%+8px)] z-20 w-40 overflow-hidden rounded-[12px] border border-[#e7e7e7] bg-white p-1 shadow-[0_16px_32px_rgba(17,19,21,0.12)]"
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === sort}
                  onClick={() => {
                    onSortChange(option.value);
                    setSortOpen(false);
                  }}
                  className={[
                    "flex h-9 w-full items-center rounded-[9px] px-3 text-left text-[12px] font-medium transition-colors",
                    option.value === sort
                      ? "bg-[#fff0f0] text-secondary"
                      : "text-text-primary hover:bg-[#f5f5f5]",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
