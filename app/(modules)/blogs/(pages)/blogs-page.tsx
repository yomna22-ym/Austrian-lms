import { loadBlogsPageData } from "../utils/blogs.loader";
import BlogsPageClient from "./blogs-page-client";

export default async function BlogsPage() {
  const data = await loadBlogsPageData();

  return (
    <BlogsPageClient
      intro={data.intro}
      initialFeatured={data.featured}
      initialTop={data.top}
      initialLatest={data.latest}
      initialPagination={data.pagination}
      categories={data.categories}
    />
  );
}
