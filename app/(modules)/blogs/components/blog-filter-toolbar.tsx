"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { BLOG_CATEGORIES } from "../utils";

const SORT_OPTIONS = ["Latest", "Most Popular", "Oldest"] as const;

export default function BlogFilterToolbar() {
  const [activeCategory, setActiveCategory] = useState<(typeof BLOG_CATEGORIES)[number]>("All");
  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState<(typeof SORT_OPTIONS)[number]>("Latest");
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
    <div className="flex flex-col gap-4 rounded-[2px] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(17,19,21,0.03)] md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        {BLOG_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={category === activeCategory}
            onClick={() => setActiveCategory(category)}
            className={[
              "h-9 rounded-[5px] px-5 text-[12px] font-bold transition-colors",
              category === activeCategory
                ? "bg-secondary text-white"
                : "bg-[#f2f2f2] text-text-primary hover:bg-[#e8e8e8]",
            ].join(" ")}
          >
            {category}
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
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search articles..."
            className="h-9 w-full rounded-[5px] border border-[#e7e7e7] bg-white pl-11 pr-4 text-[12px] text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-secondary"
          />
        </label>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((open) => !open)}
            className="flex h-9 min-w-[118px] items-center justify-between gap-5 rounded-[8px] border border-[#e7e7e7] bg-white px-4 text-[12px] font-medium text-text-primary transition-colors hover:border-[#d5d5d5]"
          >
            {selectedSort}
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
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={option === selectedSort}
                  onClick={() => {
                    setSelectedSort(option);
                    setSortOpen(false);
                  }}
                  className={[
                    "flex h-9 w-full items-center rounded-[9px] px-3 text-left text-[12px] font-medium transition-colors",
                    option === selectedSort
                      ? "bg-[#fff0f0] text-secondary"
                      : "text-text-primary hover:bg-[#f5f5f5]",
                  ].join(" ")}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
