"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import GenericCard from "@/app/shared/GenericCard";
import Dropdown from "@/app/shared/Dropdown";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { CertificationLogoCloud } from "@/app/(modules)/certificates/components";
import { MOCK_EVENTS } from "@/app/(modules)/events/utils";
import { FEATURED_ARTICLES } from "@/app/(modules)/blogs/utils";
import { BlogCallToAction } from "@/app/(modules)/blogs/components";
import BlogArticleCard from "@/app/(modules)/blogs/components/blog-article-card";
import { CareerJobCard } from "@/app/(modules)/careers/components";
import { CAREER_JOBS } from "@/app/(modules)/careers/utils";

const heroDots = Array.from({ length: 6 }, (_, index) => index);
const interestOptions = ["Courses", "Certificates", "Placement Test"] as const;
const branchOptions = ["Belgrade", "Cairo", "Alexandria"] as const;

const whyAustrianItems = [
  {
    icon: "/WhyAustrianInstitute1.svg",
    iconAlt: "Osterreich Institut logo",
    title: "Country Affiliation",
    description:
      "Live the experience from day one, through native expert instructors and cultural events. You don't just learn the language, you connect deeply with the country you want to move to.",
    iconClassName: "h-9 w-[50px]",
  },
  {
    icon: "/WhyAustrianInstitute2.svg",
    iconAlt: "g.a.s.t. logo",
    title: "Authorized g.a.s.t Partner",
    description:
      "Protect your future with official, international certificates fully recognized by German embassies and universities.",
    iconClassName: "h-8 w-[60px]",
  },
  {
    icon: "/WhyAustrianInstitute3.svg",
    iconAlt: "German academic pathway badge",
    title: "Your Path to German Universities",
    description:
      "Get fully prepared for international academic success. We guide you step-by-step to pass the certified exams required by top universities in Germany.",
    iconClassName: "h-7 w-[58px]",
  },
  {
    icon: "/WhyAustrianInstitute4.svg",
    iconAlt: "Austrian flag",
    title: "Authentic Austrian Vibe",
    description:
      "Gain one immersive through unique community events like Language Cafe, practicing German in an environment built to feel like Vienna.",
    iconClassName: "h-7 w-[48px]",
  },
];

const homeCourses = [
  {
    id: 1,
    badge: "A1.1 Beginner",
    price: "800 EGP",
    title: "German Foundation",
    description:
      "Start your journey with basic phrases and essential grammar for daily life in Austria.",
    duration: "8 Weeks | Start: Oct 15",
    sessions: "24 Sessions (90 min each)",
  },
  {
    id: 2,
    badge: "B2.1 Intermediate",
    price: "800 EGP",
    title: "Professional German",
    description:
      "Refine your skills for workplace communication and complex social interactions.",
    duration: "8 Weeks | Start: Oct 12",
    sessions: "24 Sessions (90 min each)",
  },
  {
    id: 3,
    badge: "C1.2 Advanced",
    price: "800 EGP",
    title: "Academic Excellence",
    description:
      "Achieve near-native fluency for university studies and high-level negotiations.",
    duration: "8 Weeks | Start: Oct 20",
    sessions: "24 Sessions (90 min each)",
  },
  {
    id: 4,
    badge: "C1.2 Advanced",
    price: "800 EGP",
    title: "Academic Excellence",
    description:
      "Achieve near-native fluency for university studies and high-level negotiations.",
    duration: "8 Weeks | Start: Oct 20",
    sessions: "24 Sessions (90 min each)",
  },
];

const homeEvents = [
  {
    ...MOCK_EVENTS[0],
    id: "1",
    dateBadge: { day: 24, month: "OCT" },
  },
  {
    ...MOCK_EVENTS[3],
    id: "4",
    title: "Business German Seminar",
    location: "Online Session",
    description:
      "Master the art of professional communication and networking in the DACH region markets.",
    price: 300,
    dateBadge: { day: "05", month: "NOV" },
  },
  {
    ...MOCK_EVENTS[7],
    id: "8",
    title: "Art & Language Night",
    location: "Museumsquartier",
    description:
      "Explore Vienna's art scene while building specialized vocabulary with guided activities.",
    price: 300,
    dateBadge: { day: 12, month: "NOV" },
  },
];

const platformFeatures = [
  {
    image: "/dashboard.svg",
    label: "Your progress, always visible",
    title: "Smart Student Dashboard",
    description:
      "Track assignments, exams, attendance, and course milestones from one clean, organized workspace to stay informed.",
    cta: "Explore Dashboard",
    href: "/courses",
  },
  {
    image: "/community.svg",
    label: "Always connected to your instructor",
    title: "Connected Learning Experience",
    description:
      "Message your instructor directly, receive real-time feedback, and join live sessions without ever losing your learning momentum.",
    cta: "Join Community",
    href: "/events",
  },
  {
    image: "/mobileapp.svg",
    label: "Your classroom has no walls",
    title: "Learn Anywhere",
    description:
      "Access your courses, schedules, and learning materials from anywhere, on any device, at any hour, entirely on your schedule.",
    cta: "Download App",
    href: "/placement-test",
  },
];

const teamMembers = [
  {
    name: "Mag. (FH) Hatice Gruber-Tschida",
    role: "Geschaftsfuhrerin",
  },
  {
    name: "Dr.in Miroslava Majtanova",
    role: "Osterreich Institut Bratislava S.R.O",
  },
  {
    name: "Mag. Grzegorz Kokor, MA",
    role: "Osterreich Institut Budapest KFT.",
  },
  {
    name: "Mag. Thomas Holzmann",
    role: "Osterreich Institut Polska Sp. Z.O.O. Osterreich Institut Warschau",
  },
  {
    name: "Dr. Katharina Weber",
    role: "Osterreich Institut Advisor",
  },
];

function HomeHero() {
  const [interest, setInterest] =
    useState<(typeof interestOptions)[number]>("Courses");
  const [branch, setBranch] = useState<(typeof branchOptions)[number]>("Belgrade");

  return (
    <section
      aria-label="Austria official German language provider"
      className="relative min-h-svh w-full overflow-visible bg-[#111315]"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,21,0.82)_0%,rgba(91,18,23,0.68)_48%,rgba(17,19,21,0.22)_100%)]" />
      </div>

      <button
        type="button"
        aria-label="Previous promotion"
        className="absolute left-4 top-[43%] z-20 hidden h-14 w-14 items-center justify-center text-white transition-transform duration-200 hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex lg:left-14"
      >
        <ChevronLeft className="h-14 w-14" strokeWidth={3.5} />
      </button>
      <button
        type="button"
        aria-label="Next promotion"
        className="absolute right-4 top-[43%] z-20 hidden h-14 w-14 items-center justify-center text-white transition-transform duration-200 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex lg:right-14"
      >
        <ChevronRight className="h-14 w-14" strokeWidth={3.5} />
      </button>

      <div className="relative z-10 mx-auto flex w-full max-w-[1056px] flex-col px-4 pb-20 pt-36 sm:px-6 sm:pt-40 lg:absolute lg:left-1/2 lg:top-0 lg:h-full lg:-translate-x-1/2 lg:px-0 lg:pb-0 lg:pt-[150px]">
        <h1 className="max-w-[720px] text-4xl font-bold leading-[1.25] text-white sm:text-5xl lg:text-[48px]">
          Austria&apos;s official provider of
          <span className="mt-2 block text-secondary">German language</span>
        </h1>

        <div className="mt-16 w-full max-w-[22.375rem] rounded-[32px] bg-white px-6 pb-8 pt-8 shadow-[0_28px_45px_rgba(17,19,21,0.18)] sm:max-w-[460px] sm:px-8 lg:mt-[68px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-secondary">
            Your path to success
          </p>
          <h2 className="mt-4 max-w-[370px] text-[30px] font-bold leading-[1.22] text-text-primary sm:text-[32px]">
            Learn German with the &Ouml;sterreich Institute
          </h2>

          <form className="mt-8 flex flex-col gap-6">
            <label className="flex flex-col gap-2 text-[13px] font-semibold text-text-secondary">
              I&apos;m interested in
              <Dropdown
                value={interest}
                options={interestOptions}
                onChange={setInterest}
                ariaLabel="Select interest"
                buttonClassName="h-[46px] rounded-[12px] border-[#e8e8e8] text-[15px] font-medium text-text-secondary"
                menuClassName="min-w-full"
                optionClassName="h-10 text-[15px]"
              />
            </label>

            <label className="flex flex-col gap-2 text-[13px] font-semibold text-text-secondary">
              at the branch in
              <Dropdown
                value={branch}
                options={branchOptions}
                onChange={setBranch}
                ariaLabel="Select branch"
                buttonClassName="h-[46px] rounded-[12px] border-[#e8e8e8] text-[15px] font-medium text-text-secondary"
                menuClassName="min-w-full"
                optionClassName="h-10 text-[15px]"
              />
            </label>

            <Link
              href="/courses"
              className="mt-4 inline-flex h-[60px] w-full items-center justify-center rounded-[6px] bg-secondary text-[14px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_16px_rgba(185,19,23,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:translate-y-0"
            >
              Book Now!
            </Link>
          </form>
        </div>
      </div>

      <div className="absolute bottom-[86px] right-6 z-20 hidden items-center gap-5 lg:flex">
        {heroDots.map((dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Go to promotion ${dot + 1}`}
            aria-current={dot === 0 ? "true" : undefined}
            className={[
              "h-4 w-4 rounded-full border-2 border-white bg-white shadow-[0_1px_4px_rgba(17,19,21,0.45)] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              dot === 0 ? "ring-2 ring-text-primary ring-offset-0" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

function GatewaySection() {
  return (
    <section className="w-full bg-white px-4 pb-24 pt-16 sm:px-6 lg:px-16 lg:pt-[238px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-secondary">
            Authorized partner for g.a.s.t.
          </p>
          <h2 className="mt-5 max-w-[560px] text-[34px] font-bold leading-[1.35] text-[#111827] sm:text-[36px]">
            Your Gateway to Your Academic Future in Germany
          </h2>
          <p className="mt-5 max-w-[570px] text-[16px] leading-relaxed text-text-secondary">
            We provide the official testing hub for TestDaF and TestAS required
            for university admissions, allowing you to study directly in Germany
            with only your high school certificate, fully guided by our
            institute&apos;s family.
          </p>
          <Link
            href="/certificates"
            className="mt-7 inline-flex h-[48px] min-w-[188px] items-center justify-center rounded-[6px] bg-secondary px-7 text-[14px] font-bold text-white shadow-[0_8px_16px_rgba(185,19,23,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:translate-y-0"
          >
            Get Certified
          </Link>
        </div>

        <CertificationLogoCloud />
      </div>
    </section>
  );
}

function WhyAustrianSection() {
  return (
    <section className="w-full bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-16 lg:pb-[72px] lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-[22px] font-bold leading-tight text-text-primary">
            Why Austrian Institute?
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[72px] rounded-full bg-secondary" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyAustrianItems.map((item) => (
            <article
              key={item.title}
              className="min-h-[186px] rounded-[10px] border border-[#e9e9e9] bg-white px-6 py-6 shadow-[0_10px_24px_rgba(17,19,21,0.06)]"
            >
              <div className="flex h-10 items-start">
                <Image
                  src={item.icon}
                  alt={item.iconAlt}
                  width={82}
                  height={50}
                  className={["object-contain object-left", item.iconClassName].join(
                    " "
                  )}
                />
              </div>
              <h3 className="mt-4 text-[16px] font-bold leading-tight text-text-primary">
                {item.title}
              </h3>
              <p className="mt-3 text-[11px] leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectedLearningSection() {
  return (
    <section className="w-full bg-white px-4 pb-24 sm:px-6 lg:px-16 lg:pb-[115px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div className="lg:pt-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
            A connected learning experience
          </p>
          <h2 className="mt-4 max-w-[390px] text-[22px] font-bold leading-[1.25] text-text-primary sm:text-[24px]">
            Progress You Can See.
            <span className="block">Motivation You Can Feel.</span>
          </h2>
          <p className="mt-5 max-w-[470px] text-[12px] leading-relaxed text-text-secondary">
            Your learning path isn&apos;t linear. It adapts dynamically to your
            goals, your pace, and your performance. A gamified smart dashboard
            tracks your real-time progress so you always know exactly where you
            stand and what comes next.
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-flex h-[39px] min-w-[140px] items-center justify-center rounded-[4px] bg-secondary px-5 text-[12px] font-bold text-white shadow-[0_8px_16px_rgba(185,19,23,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:translate-y-0"
          >
            Start Your Journey
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[753px] lg:mr-[-20px]">
          <Image
            src="/StuLearnCurv.svg"
            alt="Student learning progress dashboard"
            width={753}
            height={529}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 753px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}

function CourseCatalogSection() {
  const router = useRouter();

  return (
    <section className="w-full overflow-hidden bg-[#f5f5f5] px-4 py-20 sm:px-6 lg:px-16 lg:pb-[54px] lg:pt-[86px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-[28px] font-bold leading-tight text-text-primary">
              Course Catalog
            </h2>
            <p className="mt-4 text-[13px] text-text-secondary">
              Tailored paths for every linguistic ambition.
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden shrink-0 text-[12px] font-bold text-secondary transition-colors duration-200 hover:text-[#8f0f12] sm:inline-flex"
          >
            Check all Courses &rarr;
          </Link>
        </div>

        <div className="-mr-32 flex gap-10 overflow-visible pb-2">
          {homeCourses.map((course) => (
            <GenericCard
              key={`${course.id}-${course.title}`}
              variant="course"
              width={300}
              height={420}
              badge={course.badge}
              price={course.price}
              title={course.title}
              description={course.description}
              meta={[
                {
                  icon: <CalendarDays size={14} className="text-secondary" />,
                  text: course.duration,
                },
                {
                  icon: <Users size={14} className="text-secondary" />,
                  text: course.sessions,
                },
              ]}
              ctaLabel="Book Course"
              onCtaClick={() => router.push(`/courses/${course.id}`)}
              className="rounded-[14px] border-0 shadow-[0_10px_26px_rgba(17,19,21,0.04)]"
              fields={{
                header: { justify: "between", align: "center", className: "gap-4" },
              }}
            />
          ))}
        </div>

        <Link
          href="/courses"
          className="mt-8 inline-flex text-[12px] font-bold text-secondary sm:hidden"
        >
          Check all Courses &rarr;
        </Link>
      </div>
    </section>
  );
}

function PopularEventsSection() {
  const router = useRouter();

  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fff3f3_100%)] px-4 py-20 sm:px-6 lg:px-16 lg:pb-[86px] lg:pt-[78px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
            Mark your calendar
          </p>
          <h2 className="mt-5 max-w-[230px] text-[28px] font-bold leading-[1.2] text-text-primary">
            Our Most Popular Events
          </h2>
          <p className="mt-6 max-w-[240px] text-[13px] leading-relaxed text-text-secondary">
            Join our community for workshops, social gatherings, and more.
          </p>
        </div>

        <div className="-mr-40 flex gap-10 overflow-visible pb-2">
          {homeEvents.map((event) => (
            <GenericCard
              key={event.id}
              variant="event"
              width={350}
              height={500}
              image={event.image}
              imageAlt={event.title}
              dateBadge={event.dateBadge}
              location={event.location}
              title={event.title}
              description={event.description}
              price={`${event.price} EGP`}
              ctaLabel="Book Event"
              onCtaClick={() => router.push(`/events/${event.id}`)}
              className="rounded-[8px] border-0 shadow-[0_10px_26px_rgba(17,19,21,0.06)]"
              imageHeight={190}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformUpgradeSection() {
  return (
    <section className="w-full bg-white px-4 pb-[82px] pt-[76px] sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="mx-auto max-w-[330px] text-[28px] font-bold leading-tight text-text-primary sm:max-w-none">
            Upgrade Your Fluency with Our Platform
          </h2>
          <div className="mx-auto mt-5 h-[3px] w-[72px] rounded-full bg-secondary" />
        </div>

        <div className="mx-auto mt-[64px] grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-3">
          {platformFeatures.map((feature) => (
            <SurfaceCard
              key={feature.title}
              className="flex min-h-[520px] flex-col rounded-[10px] border-[#ececec] px-10 pb-10 pt-8 shadow-[0_18px_42px_rgba(17,19,21,0.1)]"
            >
              <div className="flex h-[225px] items-center justify-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={330}
                  height={235}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-8 text-[12px] font-extrabold uppercase tracking-[0.12em] text-secondary">
                {feature.label}
              </p>
              <h3 className="mt-4 text-[26px] font-bold leading-tight text-text-primary">
                {feature.title}
              </h3>
              <p className="mt-6 flex-1 text-[16px] leading-relaxed text-text-secondary">
                {feature.description}
              </p>
              <Link
                href={feature.href}
                className="mt-9 inline-flex items-center gap-3 text-[16px] font-bold text-secondary transition-colors duration-200 hover:text-[#8f0f12]"
              >
                {feature.cta}
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </Link>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function CulturalJournalSection() {
  const router = useRouter();
  const [mainArticle, ...sideArticles] = FEATURED_ARTICLES;

  return (
    <section className="w-full bg-white px-4 pb-[64px] sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-[24px] font-bold leading-tight text-text-primary">
              Cultural Journal
            </h2>
            <p className="mt-3 text-[12px] text-text-secondary">
              Exploring the life, language, and culture of Austria.
            </p>
          </div>
          <Link
            href="/blogs"
            className="hidden shrink-0 text-[11px] font-bold text-secondary transition-colors duration-200 hover:text-[#8f0f12] sm:inline-flex"
          >
            Check all Blogs &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.52fr)_minmax(360px,0.96fr)]">
          <BlogArticleCard
            {...mainArticle}
            href="/blogs/coffee-house-phrases-vienna"
            featured
            imageClassName="h-[260px]"
            className="min-h-[0] rounded-[10px] shadow-none"
          />

          <div className="grid gap-6">
            {sideArticles.map((article) => (
              <GenericCard
                key={article.title}
                variant="blog"
                blogStyle="split"
                width="100%"
                height={178}
                image={article.image}
                imageAlt={article.title}
                category={article.category}
                title={article.title}
                description={article.description}
                imageWidthClass="w-[43%]"
                onRead={() => router.push("/blogs/coffee-house-phrases-vienna")}
                className="rounded-[10px] border-0 shadow-none"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <div className="mr-2 flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  dot === 0 ? "bg-secondary" : "bg-[#dedede]",
                ].join(" ")}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous journal article"
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#e5e5e5] bg-white text-text-secondary transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next journal article"
            className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-secondary text-white transition-colors duration-200 hover:bg-[#8f0f12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <Link
          href="/blogs"
          className="mt-8 inline-flex text-[11px] font-bold text-secondary sm:hidden"
        >
          Check all Blogs &rarr;
        </Link>
      </div>
    </section>
  );
}

function CarouselControls({ align = "end" }: { align?: "end" | "center" }) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        align === "center" ? "justify-center" : "justify-end",
      ].join(" ")}
    >
      <div className="mr-2 flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            className={[
              "h-1.5 w-1.5 rounded-full",
              dot === 0 ? "bg-secondary" : "bg-[#dedede]",
            ].join(" ")}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#e5e5e5] bg-white text-text-secondary transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-secondary text-white transition-colors duration-200 hover:bg-[#8f0f12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function TeamCarouselControls() {
  return (
    <div className="flex items-center gap-3">
      <div className="mr-2 flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            className={[
              "h-1.5 w-1.5 rounded-full",
              dot === 0 ? "bg-secondary" : "bg-[#dfdfdf]",
            ].join(" ")}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous team member"
        className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-white text-text-primary shadow-[0_6px_12px_rgba(17,19,21,0.12)] transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next team member"
        className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-secondary text-white shadow-[0_6px_12px_rgba(185,19,23,0.16)] transition-colors duration-200 hover:bg-[#8f0f12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function TeamExpertsSection() {
  return (
    <section className="w-full overflow-hidden bg-[#f4f4f4] px-4 py-[42px] sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-6">
          <h2 className="text-[20px] font-bold leading-tight text-text-primary">
            Meet Our Team of Experts
          </h2>
          <TeamCarouselControls />
        </div>

        <div className="grid grid-cols-2 gap-5 pb-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {teamMembers.map((member) => (
            <SurfaceCard
              key={member.name}
              className="flex h-[228px] w-full flex-col items-center justify-start rounded-[8px] border-0 px-5 pb-5 pt-6 text-center shadow-[0_8px_18px_rgba(17,19,21,0.04)]"
            >
              <div className="relative h-[104px] w-[104px] overflow-hidden rounded-full bg-[linear-gradient(135deg,#bababa_0%,#f6f6f6_100%)]">
                <Image
                  src="/meetourteam.jpg"
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="104px"
                />
              </div>
              <h3 className="mt-5 max-w-[190px] text-[14px] font-bold leading-[1.14] text-text-primary">
                {member.name}
              </h3>
              <p className="mt-2 max-w-[190px] text-[10px] leading-[1.28] text-text-secondary">
                {member.role}
              </p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="51"
      height="36"
      viewBox="0 0 51 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-9 w-[51px]"
    >
      <path
        d="M5.1 36L12 24C8.7 24 5.875 22.825 3.525 20.475C1.175 18.125 0 15.3 0 12C0 8.7 1.175 5.875 3.525 3.525C5.875 1.175 8.7 0 12 0C15.3 0 18.125 1.175 20.475 3.525C22.825 5.875 24 8.7 24 12C24 13.15 23.8625 14.2125 23.5875 15.1875C23.3125 16.1625 22.9 17.1 22.35 18L12 36H5.1ZM32.1 36L39 24C35.7 24 32.875 22.825 30.525 20.475C28.175 18.125 27 15.3 27 12C27 8.7 28.175 5.875 30.525 3.525C32.875 1.175 35.7 0 39 0C42.3 0 45.125 1.175 47.475 3.525C49.825 5.875 51 8.7 51 12C51 13.15 50.8625 14.2125 50.5875 15.1875C50.3125 16.1625 49.9 17.1 49.35 18L39 36H32.1Z"
        fill="#F5F5F5"
      />
    </svg>
  );
}

function StudentSuccessStoriesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-secondary px-4 py-[44px] text-white sm:px-6 lg:px-16">
      <div
        className="absolute bottom-0 right-[17%] h-[150px] w-[130px] skew-x-[-12deg] bg-[#a70f13]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,420px)] lg:justify-between">
        <div>
          <QuoteIcon />
          <h2 className="mt-4 text-[18px] font-bold leading-tight">
            Student Success
            <span className="block">Stories</span>
          </h2>
          <p className="mt-4 max-w-[220px] text-[10px] leading-relaxed text-white/80">
            Hear from our community of learners who transformed their careers.
          </p>
        </div>

        <SurfaceCard className="min-h-[128px] rounded-[7px] border-0 px-6 py-5 text-text-primary shadow-[0_12px_26px_rgba(17,19,21,0.12)]">
          <p className="text-[11px] font-semibold italic leading-relaxed">
            &quot;The teaching quality is unmatched. Having native speakers who
            understand cultural nuance makes all the difference in achieving real
            fluency.&quot;
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image
                  src="/meetourteam.jpg"
                  alt="Maria G."
                  fill
                  className="object-cover object-top"
                  sizes="32px"
                />
              </span>
              <div>
                <p className="text-[10px] font-bold text-text-primary">Maria G.</p>
                <p className="text-[8px] text-text-secondary">Student, Vienna Track</p>
              </div>
            </div>
            <CarouselControls />
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
}

function ProfessionalTeamSection() {
  const featuredJobs = CAREER_JOBS.slice(0, 2);

  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#fff7f7_0%,#ffffff_100%)] px-4 py-[68px] sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
              Join the academic mission
            </p>
            <h2 className="mt-3 text-[24px] font-bold leading-tight text-text-primary">
              Join Our Professional Team
            </h2>
            <p className="mt-4 max-w-[520px] text-[12px] leading-relaxed text-text-secondary">
              Join our team of passionate educators and administrators committed
              to creating exceptional learning experiences.
            </p>
          </div>
          <CarouselControls />
        </div>

        <div className="grid grid-cols-1 gap-8 pb-2 lg:grid-cols-2">
          {featuredJobs.map((job) => (
            <CareerJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden bg-white">
      <HomeHero />
      <GatewaySection />
      <WhyAustrianSection />
      <ConnectedLearningSection />
      <CourseCatalogSection />
      <PopularEventsSection />
      <PlatformUpgradeSection />
      <CulturalJournalSection />
      <TeamExpertsSection />
      <StudentSuccessStoriesSection />
      <ProfessionalTeamSection />
      <BlogCallToAction />
    </div>
  );
}
