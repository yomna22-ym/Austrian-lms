import PageIntro from "@/app/shared/PageIntro";
import {
  BlogCallToAction,
  BlogFilterToolbar,
  FeaturedArticlesSection,
  LatestArticlesSection,
  TopArticlesSection,
} from "../components";

export default function BlogsPage() {
  return (
    <div className="w-full bg-[linear-gradient(110deg,#ffffff_0%,#ffffff_56%,#fff2f2_100%)]">
      <PageIntro
        title="Cultural Journal"
        description="Exploring the life, language, and culture of Austria. Insights from our experts and stories from the heart of Europe."
      />
      <main className="w-full px-4 py-14 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <BlogFilterToolbar />

          <div className="mt-16">
            <FeaturedArticlesSection />
            <TopArticlesSection />
            <LatestArticlesSection />
          </div>
        </div>
      </main>

      <BlogCallToAction />
    </div>
  );
}
