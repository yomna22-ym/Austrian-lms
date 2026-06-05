import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Lightbulb, Mail, Share2 } from "lucide-react";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { BLOG_DETAIL_POST, RELATED_JOURNAL_POSTS } from "../utils";

function renderEmphasis(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function ArticleSidebar() {
  return (
    <aside className="hidden w-[170px] shrink-0 xl:block">
      <div className="sticky top-24 border-l border-[#e8e2e2] pl-5">
        <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-text-primary">
          In This Article
        </p>
        <nav className="flex flex-col gap-5">
          {BLOG_DETAIL_POST.tableOfContents.map((item, index) => (
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

function RelatedJournalCard({
  post,
}: {
  post: (typeof RELATED_JOURNAL_POSTS)[number];
}) {
  return (
    <SurfaceCard className="overflow-hidden rounded-[8px] border-none shadow-none">
      <div className="relative h-[210px] overflow-hidden rounded-[8px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </div>
      <div className="pt-6">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-secondary">
          {post.category}
        </p>
        <h3 className="mt-3 text-[18px] font-semibold leading-snug text-text-primary">
          {post.title}
        </h3>
        <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
          {post.description}
        </p>
      </div>
    </SurfaceCard>
  );
}

export default function BlogDetailContent() {
  return (
    <div className="bg-[linear-gradient(110deg,#ffffff_0%,#ffffff_58%,#fff4f4_100%)]">
      <div className="mx-auto flex max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:px-16">
        <ArticleSidebar />

        <main className="mx-auto min-w-0 max-w-[840px] flex-1">
          <SurfaceCard className="rounded-[8px] p-8 shadow-none sm:p-10">
            <span className="inline-flex rounded-[2px] bg-[#fff0f0] px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-secondary">
              {BLOG_DETAIL_POST.category}
            </span>

            <h1 className="mt-6 max-w-2xl text-[34px] font-extrabold leading-tight text-text-primary sm:text-[42px]">
              {BLOG_DETAIL_POST.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
              {BLOG_DETAIL_POST.description}
            </p>

            <div className="mt-9 flex flex-col gap-4 border-y border-[#ece8e8] py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#1f1712,#d0a15f)]" />
                <div>
                  <p className="text-[13px] font-extrabold text-text-primary">
                    {BLOG_DETAIL_POST.author.name}
                  </p>
                  <p className="text-[11px] font-medium text-text-secondary">
                    {BLOG_DETAIL_POST.author.role} - {BLOG_DETAIL_POST.author.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                <Clock3 size={15} aria-hidden="true" />
                {BLOG_DETAIL_POST.readTime}
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[8px]">
              <Image
                src={BLOG_DETAIL_POST.image}
                alt={BLOG_DETAIL_POST.title}
                width={760}
                height={420}
                className="h-auto w-full object-cover"
                priority
              />
              <span className="absolute left-4 top-4 rounded-[4px] bg-secondary px-3 py-1 text-[10px] font-extrabold uppercase text-white">
                {BLOG_DETAIL_POST.category}
              </span>
            </div>

            <article className="mt-10 text-[15px] leading-[1.85] text-text-primary">
              <p>{BLOG_DETAIL_POST.intro}</p>

              <blockquote className="my-9 border-l-4 border-secondary bg-[#f7f7f7] px-7 py-6 text-[17px] text-text-primary">
                {BLOG_DETAIL_POST.quote}
              </blockquote>

              {BLOG_DETAIL_POST.sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`} className="mt-9">
                  <h2 className="text-[27px] font-extrabold leading-tight text-text-primary">
                    {section.title}
                  </h2>
                  <div className="mt-5 flex flex-col gap-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderEmphasis(paragraph)}</p>
                    ))}
                  </div>

                  {"tip" in section && section.tip && (
                    <div className="mt-7 rounded-[6px] border border-[#e6b9bd] bg-[#fff4f4] p-7">
                      <div className="flex items-center gap-3 text-[13px] font-extrabold text-secondary">
                        <Lightbulb size={18} aria-hidden="true" />
                        {section.tip.title}
                      </div>
                      <p className="mt-5 max-w-xl italic leading-relaxed">
                        {section.tip.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </article>

            <div className="mt-12 rounded-[8px] bg-[#f1f1f1] p-7">
              <h3 className="text-[18px] font-medium text-text-primary">
                {BLOG_DETAIL_POST.author.name}
              </h3>
              <p className="mt-1 text-[12px] font-extrabold text-secondary">
                Linguistics Expert & Cultural Historian
              </p>
              <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-text-secondary">
                {BLOG_DETAIL_POST.authorBio}
              </p>
              <div className="mt-5 flex items-center gap-4 text-text-secondary">
                <Share2 size={16} aria-hidden="true" />
                <Mail size={16} aria-hidden="true" />
              </div>
            </div>
          </SurfaceCard>
        </main>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-secondary">
              Keep Reading
            </p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-tight text-text-primary">
              Related Journal Posts
            </h2>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[13px] font-extrabold text-secondary transition-opacity hover:opacity-75"
          >
            View Journal
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {RELATED_JOURNAL_POSTS.map((post) => (
            <RelatedJournalCard key={post.title} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
