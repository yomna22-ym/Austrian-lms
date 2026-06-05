import { notFound } from "next/navigation";
import BlogDetailPage from "./blog-detail-page";
import { BLOG_DETAIL_POST } from "../../utils";

export function generateStaticParams() {
  return [{ slug: BLOG_DETAIL_POST.slug }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== BLOG_DETAIL_POST.slug) {
    notFound();
  }

  return <BlogDetailPage />;
}
