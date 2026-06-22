import Image from "next/image";
import Link from "next/link";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
import SurfaceCard from "@/app/shared/SurfaceCard";
import type { BlogArticle } from "../types";
import BlogArticleCard from "./blog-article-card";

interface FeaturedArticlesSectionProps {
  articles: BlogArticle[];
}

export default function FeaturedArticlesSection({
  articles,
}: FeaturedArticlesSectionProps) {
  if (articles.length === 0) return null;

  const [mainArticle, ...sideArticles] = articles;

  return (
    <MotionSection className="space-y-8">
      <SectionHeader
        align="left"
        eyebrow="Featured"
        title="Start with the most relevant insights"
        description="Handpicked articles to help students, parents, and learners make better decisions."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.48fr)_minmax(380px,1fr)]">
        <MotionDiv hoverLift>
          <BlogArticleCard
            {...mainArticle}
            href={mainArticle.href}
            featured={mainArticle.placement === "featured"}
            imageClassName="h-[270px]"
            className="min-h-[0]"
          />
        </MotionDiv>

        <div className="grid content-between gap-7">
          {sideArticles.map((article, index) => (
            <MotionDiv key={article.id} delay={index * 0.06} hoverLift>
              <SurfaceCard className="group grid min-h-[205px] overflow-hidden rounded-[16px] border-[#eadede] shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_24px_54px_rgba(185,19,23,0.1)] sm:grid-cols-[46%_1fr]">
                <div className="relative min-h-[205px] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 220px"
                    unoptimized={
                      article.image.startsWith("http://") ||
                      article.image.startsWith("https://")
                    }
                  />
                </div>
                <Link
                  href={article.href}
                  className="p-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
                >
                  <p className="text-[10px] font-extrabold uppercase text-secondary">
                    {article.category}
                  </p>
                  <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-text-primary transition-colors group-hover:text-secondary">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-text-secondary">
                    {article.description}
                  </p>
                </Link>
              </SurfaceCard>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
