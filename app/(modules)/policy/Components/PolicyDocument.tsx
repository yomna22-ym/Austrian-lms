import Link from "next/link";
import { ArrowUpRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import SurfaceCard from "@/app/shared/SurfaceCard";
import {
  POLICY_NAV_ITEMS,
  type PolicyDocumentContent,
  type PolicySection,
} from "./policy-content";

type PolicyDocumentProps = {
  content: PolicyDocumentContent;
};

function SectionBlock({
  section,
  index,
}: {
  section: PolicySection;
  index: number;
}) {
  return (
    <section
      id={`section-${index + 1}`}
      className="scroll-mt-28 border-t border-[#efe6e6] py-8 first:border-t-0 first:pt-0"
    >
      <div className="flex gap-4">
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#fff1f1] text-[12px] font-bold text-secondary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h2 className="text-[20px] font-bold leading-tight text-text-primary sm:text-[22px]">
            {section.title}
          </h2>
          {section.body?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-[14px] leading-7 text-text-secondary sm:text-[15px]"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-5 grid gap-3">
              {section.bullets.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[14px] leading-7 text-text-secondary sm:text-[15px]"
                >
                  <CheckCircle2
                    className="mt-1 h-4 w-4 shrink-0 text-secondary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default function PolicyDocument({ content }: PolicyDocumentProps) {
  return (
    <main className="w-full bg-[linear-gradient(180deg,#ffffff_0%,#fff7f7_36%,#ffffff_100%)]">
      <section className="w-full px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-16 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-secondary">
                {content.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-[56px]">
                {content.title}
              </h1>
              <p className="mt-5 max-w-3xl text-[16px] leading-8 text-text-secondary">
                {content.description}
              </p>
            </div>

            <SurfaceCard className="rounded-[8px] border-[#efdada] px-5 py-5 shadow-[0_16px_34px_rgba(185,19,23,0.08)]">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-secondary text-white">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-secondary">
                    Status
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-text-primary">
                    {content.effectiveDate}
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-text-secondary">
                    Published for students, applicants, and platform users.
                  </p>
                </div>
              </div>
            </SurfaceCard>
          </div>

          <nav
            aria-label="Policy pages"
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            {POLICY_NAV_ITEMS.map((item) => {
              const isActive = item.key === content.active;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border px-5 text-[14px] font-bold transition-all duration-200",
                    isActive
                      ? "border-secondary bg-secondary text-white shadow-[0_10px_22px_rgba(185,19,23,0.18)]"
                      : "border-[#ecdede] bg-white text-text-primary hover:border-secondary/50 hover:text-secondary",
                  ].join(" ")}
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="w-full px-4 pb-16 sm:px-6 lg:px-16 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <SurfaceCard className="rounded-[8px] border-[#ecdede] px-5 py-5 shadow-[0_12px_28px_rgba(17,19,21,0.06)]">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-secondary">
                In This Document
              </p>
              <ol className="mt-5 grid gap-2">
                {content.sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${index + 1}`}
                      className="group flex items-center justify-between gap-3 rounded-[6px] px-3 py-2 text-[13px] font-semibold leading-5 text-text-secondary transition-colors hover:bg-[#fff3f3] hover:text-secondary"
                    >
                      <span>{section.title}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ol>
            </SurfaceCard>

            <SurfaceCard className="mt-5 rounded-[8px] border-[#ecdede] px-5 py-5 shadow-[0_12px_28px_rgba(17,19,21,0.06)]">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-secondary">
                Key Points
              </p>
              <ul className="mt-5 grid gap-4">
                {content.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-[13px] leading-6 text-text-secondary"
                  >
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-secondary"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </aside>

          <SurfaceCard className="rounded-[8px] border-[#eadfdf] px-5 py-8 shadow-[0_18px_42px_rgba(17,19,21,0.07)] sm:px-8 lg:px-10">
            {content.sections.map((section, index) => (
              <SectionBlock
                key={section.title}
                section={section}
                index={index}
              />
            ))}
          </SurfaceCard>
        </div>
      </section>
    </main>
  );
}
