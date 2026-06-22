import type { BlogPlacement } from "@/types/webhook/blogs";
import type { BlogArticle, BlogSortOption } from "../types";

function placementRank(placement: BlogPlacement): number {
  if (placement === "top") return 3;
  if (placement === "featured") return 2;
  return 1;
}

function compareByCreatedAt(a: BlogArticle, b: BlogArticle, direction: "asc" | "desc") {
  const diff =
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  return direction === "asc" ? diff : -diff;
}

export function sortBlogArticles(
  articles: BlogArticle[],
  sort: BlogSortOption,
): BlogArticle[] {
  const sorted = [...articles];

  switch (sort) {
    case "oldest":
      return sorted.sort((a, b) => compareByCreatedAt(a, b, "asc"));
    case "popular":
      return sorted.sort((a, b) => {
        const placementDiff =
          placementRank(b.placement) - placementRank(a.placement);
        if (placementDiff !== 0) return placementDiff;
        return compareByCreatedAt(a, b, "desc");
      });
    case "latest":
    default:
      return sorted.sort((a, b) => compareByCreatedAt(a, b, "desc"));
  }
}
