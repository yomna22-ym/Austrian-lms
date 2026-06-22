import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Mail, Share2 } from "lucide-react";
import Breadcrumbs from "@/app/shared/Breadcrumbs";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import RichTextContent from "@/app/shared/RichTextContent";
import SectionHeader from "@/app/shared/SectionHeader";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { WEBSITE_ROUTES } from "@/app/constants/routes";
import { isRemoteAssetUrl } from "@/lib/asset-url";
import type { BlogArticle, BlogDetailArticle } from "../types";

function ArticleSidebar({
  tableOfContents,
}: {
  tableOfContents: readonly string[];
}) {
  if (tableOfContents.length === 0) return null;

  return (
    <aside className="hidden w-[200px] shrink-0 xl:block">
      <div className="sticky top-24 rounded-[16px] border border-[#eadede] bg-white p-5 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)]">
        <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-text-primary">
          In This Article
        </p>
        <nav className="flex flex-col gap-5">
          {tableOfContents.map((item, index) => (
            <a
              key={item}
              href={`#section-${index + 1}`}
              className={[
                "text-[12px] font-medium transition-colors hover:text-secondary",
                index === 0 ? "font-extrabold text-secondary" : "text-text-secondary",
              ].join(" ")}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function RelatedJournalCard({ post }: { post: BlogArticle }) {
  return (
    <MotionDiv hoverLift>
      <SurfaceCard className="group overflow-hidden rounded-[16px] border-[#eadede] shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_24px_54px_rgba(185,19,23,0.1)]">
      <div className="relative h-[210px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 360px"
          unoptimized={isRemoteAssetUrl(post.image)}
        />
      </div>
      <div className="p-6">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-secondary">
          {post.category}
        </p>
        <h3 className="mt-3 text-[18px] font-semibold leading-snug text-text-primary transition-colors group-hover:text-secondary">
          {post.title}
        </h3>
        <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
          {post.description}
        </p>
        <Link
          href={post.href}
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-extrabold text-secondary"
        >
          Read article
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      </SurfaceCard>
    </MotionDiv>
  );
}

interface BlogDetailContentProps {
  article: BlogDetailArticle;
  relatedPosts: BlogArticle[];
}

export default function BlogDetailContent({
  article,
  relatedPosts,
}: BlogDetailContentProps) {
  const formattedDate = article.updatedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(article.updatedAt))
    : null;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-16">
        <Breadcrumbs
          items={[
            { label: "Journal", href: WEBSITE_ROUTES.blogs },
            { label: article.title },
          ]}
        />
      </div>

      <div className="mx-auto flex max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:px-16">
        <ArticleSidebar tableOfContents={article.tableOfContents} />

        <main className="mx-auto min-w-0 max-w-[840px] flex-1">
          <MotionDiv>
            <SurfaceCard className="rounded-[18px] border-[#eadede] p-6 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] sm:p-10">
            <span className="inline-flex rounded-full border border-[#f4d4d4] bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-secondary shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
              {article.category}
            </span>

            <h1 className="mt-6 max-w-2xl text-[34px] font-extrabold leading-tight text-text-primary sm:text-[42px]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
              {article.description}
            </p>

            <div className="mt-9 flex flex-col gap-4 border-y border-[#ece8e8] py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full border border-[#eadede] bg-white shadow-[inset_0_0_0_9px_rgba(185,19,23,0.12)]" />
                <div>
                  <p className="text-[13px] font-extrabold text-text-primary">
                    {article.author}
                  </p>
                  {formattedDate ? (
                    <p className="text-[11px] font-medium text-text-secondary">
                      {formattedDate}
                    </p>
                  ) : null}
                </div>
              </div>
              {article.readTime ? (
                <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                  <Clock3 size={15} aria-hidden="true" />
                  {article.readTime}
                </div>
              ) : null}
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[16px] border border-[#eadede]">
              <Image
                src={article.image}
                alt={article.title}
                width={760}
                height={420}
                className="h-auto w-full object-cover"
                priority
                unoptimized={isRemoteAssetUrl(article.image)}
              />
              <span className="absolute left-4 top-4 rounded-[4px] bg-secondary px-3 py-1 text-[10px] font-extrabold uppercase text-white">
                {article.category}
              </span>
            </div>

            {article.contentHtml ? (
              <div className="mt-10">
                <RichTextContent html={article.contentHtml} />
              </div>
            ) : null}

            <div className="mt-12 rounded-[16px] border border-[#eadede] bg-white p-7 shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
              <h3 className="text-[18px] font-medium text-text-primary">
                {article.author}
              </h3>
              <div className="mt-5 flex items-center gap-4 text-text-secondary">
                <Share2 size={16} aria-hidden="true" />
                <Mail size={16} aria-hidden="true" />
              </div>
            </div>
            </SurfaceCard>
          </MotionDiv>
        </main>
      </div>

      {relatedPosts.length > 0 ? (
        <MotionSection className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              align="left"
              eyebrow="Keep Reading"
              title="Related Journal Posts"
            />
            <Link
              href={WEBSITE_ROUTES.blogs}
              className="inline-flex items-center gap-2 text-[13px] font-extrabold text-secondary transition-opacity hover:opacity-75"
            >
              View Journal
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedPosts.map((post) => (
              <RelatedJournalCard key={post.id} post={post} />
            ))}
          </div>
        </MotionSection>
      ) : null}
    </div>
  );
}
