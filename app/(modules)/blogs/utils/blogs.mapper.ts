import { resolvePublicAssetUrl } from "@/lib/asset-url";
import type { BlogCard } from "@/types/webhook/blogs";
import type { BlogArticle } from "../types";

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function mapBlogCardToArticle(card: BlogCard): BlogArticle {
  const placement = card.placement ?? "default";

  return {
    id: card.id,
    image: resolvePublicAssetUrl(card.image) || "/event.png",
    category: card.categoryName || "General",
    title: card.title,
    description: card.description,
    author: card.authorName,
    readTime: estimateReadTime(card.description),
    placement,
    href: `/blogs/${card.id}`,
    featured: placement === "featured",
    createdAt: card.createdAt,
  };
}

export function mapBlogCardsToArticles(cards: BlogCard[]): BlogArticle[] {
  return cards.map(mapBlogCardToArticle);
}
