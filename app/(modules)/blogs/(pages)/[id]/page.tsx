import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "../../components";
import { loadBlogDetail } from "../../utils/blogs.loader";
import { listBlogs } from "@/lib/api/webhook/blogs";
import { mapBlogCardsToArticles } from "../../utils/blogs.mapper";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await loadBlogDetail(id);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const article = await loadBlogDetail(id);

  if (!article) {
    notFound();
  }

  let relatedPosts = [] as Awaited<ReturnType<typeof mapBlogCardsToArticles>>;

  try {
    const relatedResult = await listBlogs({
      placement: "default",
      limit: 4,
      page: 1,
    });
    relatedPosts = mapBlogCardsToArticles(relatedResult.items)
      .filter((post) => post.id !== id)
      .slice(0, 3);
  } catch {
    relatedPosts = [];
  }

  return <BlogDetailContent article={article} relatedPosts={relatedPosts} />;
}
