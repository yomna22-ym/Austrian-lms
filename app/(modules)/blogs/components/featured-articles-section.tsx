import Image from "next/image";
import Link from "next/link";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { FEATURED_ARTICLES } from "../utils";
import BlogArticleCard from "./blog-article-card";

export default function FeaturedArticlesSection() {
  const [mainArticle, ...sideArticles] = FEATURED_ARTICLES;

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.48fr)_minmax(380px,1fr)]">
      <BlogArticleCard
        {...mainArticle}
        href="/blogs/coffee-house-phrases-vienna"
        featured
        imageClassName="h-[270px]"
        className="min-h-[0]"
      />

      <div className="grid content-between gap-7">
        {sideArticles.map((article) => (
          <SurfaceCard
            key={article.title}
            className="grid min-h-[205px] overflow-hidden rounded-[14px] shadow-[0_12px_24px_rgba(17,19,21,0.12)] sm:grid-cols-[46%_1fr]"
          >
            <div className="relative min-h-[205px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 220px"
              />
            </div>
            <Link
              href="/blogs/coffee-house-phrases-vienna"
              className="p-7 transition-colors hover:bg-[#fffafa]"
            >
              <p className="text-[10px] font-extrabold uppercase text-secondary">
                {article.category}
              </p>
              <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-text-primary">
                {article.title}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-text-secondary">
                {article.description}
              </p>
            </Link>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
