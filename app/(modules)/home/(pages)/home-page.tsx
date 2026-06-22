"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useInView,
  type Variants,
} from "framer-motion";
import GenericCard from "@/app/shared/GenericCard";
import Dropdown from "@/app/shared/Dropdown";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { CertificationLogoCloud } from "@/app/(modules)/certificates/components";
import type { BlogArticle } from "@/app/(modules)/blogs/types";
import { BlogCallToAction } from "@/app/(modules)/blogs/components";
import BlogArticleCard from "@/app/(modules)/blogs/components/blog-article-card";
import { CareerJobCard } from "@/app/(modules)/careers/components";
import type { CareerJob } from "@/app/(modules)/careers/types";
import type { HomeHeroSlide } from "@/app/(modules)/home/types/home-hero.types";
import type { HomePageData } from "@/app/(modules)/home/types/home.types";
import type { TeamMember } from "@/app/(modules)/home/types/team.types";
import { useHomeHeroForm } from "@/app/(modules)/home/hooks/use-home-hero-form";
import type { HomeHeroInterest } from "@/app/(modules)/home/utils/home-hero-navigation";
import { isRemoteAssetUrl } from "@/lib/asset-url";

// ─── Constants ───────────────────────────────────────────────────────────────

const HERO_AUTO_ADVANCE_MS = 6000;

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
    eyebrow: "Start from",
    price: "1800 EGP",
    title: "Standard German Course",
    tags: ["Class Rooms"],
  },
  {
    id: 2,
    eyebrow: "Start from",
    price: "2500 EGP",
    title: "professional German Course",
    tags: ["Class Rooms", "Class Rooms", "Class Rooms"],
  },
  {
    id: 3,
    eyebrow: "Start from",
    price: "1800 EGP",
    title: "Diploma",
    tags: ["Class Rooms"],
  },
  {
    id: 4,
    eyebrow: "Start from",
    price: "2500 EGP",
    title: "conversation",
    tags: ["Class Rooms"],
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

// ─── Animation Variants ───────────────────────────────────────────────────────

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_QUART = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -52 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 52 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: EASE_OUT_QUART },
  },
};

const titleStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const titleWord: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_QUART },
  },
};

// ─── HomeHero ─────────────────────────────────────────────────────────────────

function HomeHero({ slides }: { slides: HomeHeroSlide[] }) {
  const {
    interest,
    setInterest,
    interestOptions,
    selectedBranchId,
    setSelectedBranchId,
    branchOptions,
    branchesLoading,
    branchesError,
    formError,
    isSubmitting,
    handleSubmit,
    canSubmit,
  } = useHomeHeroForm();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slides.length;
  const activeSlide = slides[currentSlide] ?? slides[0];

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, HERO_AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  function goToSlide(index: number) {
    setCurrentSlide(index);
  }

  function goToPreviousSlide() {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }

  function goToNextSlide() {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }

  if (!activeSlide) return null;

  return (
    <section
      aria-label="Austria official German language provider"
      className="relative min-h-svh w-full overflow-visible bg-[#111315]"
    >
      {/* Background slides with Ken Burns zoom */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={[
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                isActive ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale: isActive ? 1.07 : 1.0 }}
                transition={{
                  duration: HERO_AUTO_ADVANCE_MS / 1000,
                  ease: "linear",
                }}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority={index === 0}
                  unoptimized={isRemoteAssetUrl(slide.image)}
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,21,0.82)_0%,rgba(91,18,23,0.68)_48%,rgba(17,19,21,0.22)_100%)]" />
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      {slideCount > 1 && (
        <>
          <motion.button
            type="button"
            aria-label="Previous promotion"
            onClick={goToPreviousSlide}
            whileHover={{ x: -3, scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="absolute left-4 top-[43%] z-20 hidden h-14 w-14 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex lg:left-14"
          >
            <ChevronLeft className="h-14 w-14" strokeWidth={3.5} />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next promotion"
            onClick={goToNextSlide}
            whileHover={{ x: 3, scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="absolute right-4 top-[43%] z-20 hidden h-14 w-14 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex lg:right-14"
          >
            <ChevronRight className="h-14 w-14" strokeWidth={3.5} />
          </motion.button>
        </>
      )}

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1056px] flex-col px-4 pb-20 pt-36 sm:px-6 sm:pt-40 lg:absolute lg:left-1/2 lg:top-0 lg:h-full lg:-translate-x-1/2 lg:px-0 lg:pb-0 lg:pt-[150px]">
        {/* Animated title — swaps on slide change */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentSlide}
            className="max-w-[720px] text-4xl font-bold leading-[1.25] text-white sm:text-5xl lg:text-[48px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.38, ease: EASE_OUT_QUART }}
          >
            {activeSlide.title}
            <motion.span
              className="mt-2 block text-secondary"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.38, delay: 0.14, ease: EASE_OUT_QUART }}
            >
              {activeSlide.highlight}
            </motion.span>
          </motion.h1>
        </AnimatePresence>

        {/* Lead-capture card */}
        <motion.div
          className="mt-16 w-full max-w-[22.375rem] rounded-[32px] bg-white px-6 pb-8 pt-8 shadow-[0_28px_45px_rgba(17,19,21,0.18)] sm:max-w-[460px] sm:px-8 lg:mt-[68px]"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.3, ease: EASE_OUT_EXPO }}
        >
          <motion.p
            className="text-[12px] font-bold uppercase tracking-[0.18em] text-secondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            Your path to success
          </motion.p>
          <motion.h2
            className="mt-4 max-w-[370px] text-[30px] font-bold leading-[1.22] text-text-primary sm:text-[32px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.65 }}
          >
            Learn German with the &Ouml;sterreich Institute
          </motion.h2>

          <motion.form
            className="mt-8 flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.78 }}
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2 text-[13px] font-semibold text-text-secondary">
              I&apos;m interested in
              <Dropdown
                value={interest}
                options={interestOptions}
                onChange={(value) => setInterest(value as HomeHeroInterest)}
                ariaLabel="Select interest"
                buttonClassName="h-[46px] rounded-[12px] border-[#e8e8e8] text-[15px] font-medium text-text-secondary"
                menuClassName="min-w-full"
                optionClassName="h-10 text-[15px]"
              />
            </label>

            <label className="flex flex-col gap-2 text-[13px] font-semibold text-text-secondary">
              at the branch in
              <Dropdown
                value={selectedBranchId}
                options={branchOptions}
                onChange={setSelectedBranchId}
                ariaLabel="Select branch"
                disabled={branchesLoading || branchOptions.length === 0}
                placeholder={
                  branchesLoading ? "Loading branches..." : "Select a branch"
                }
                buttonClassName="h-[46px] rounded-[12px] border-[#e8e8e8] text-[15px] font-medium text-text-secondary"
                menuClassName="min-w-full"
                optionClassName="h-10 text-[15px]"
              />
            </label>

            {branchesError ? (
              <p className="text-[12px] font-medium text-[#b91317]" role="alert">
                {branchesError}
              </p>
            ) : null}

            {formError ? (
              <p className="text-[12px] font-medium text-[#b91317]" role="alert">
                {formError}
              </p>
            ) : null}

            <motion.div
              whileHover={canSubmit ? { scale: 1.015 } : undefined}
              whileTap={canSubmit ? { scale: 0.975 } : undefined}
              transition={{ duration: 0.15 }}
              className="mt-4"
            >
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="inline-flex h-[60px] w-full items-center justify-center rounded-[6px] bg-secondary text-[14px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_16px_rgba(185,19,23,0.28)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Redirecting..." : "Book Now!"}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>

      {/* Slide indicator dots */}
      {slideCount > 1 && (
        <div className="absolute bottom-[86px] right-6 z-20 hidden items-center gap-5 lg:flex">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              type="button"
              aria-label={`Go to promotion ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.16 }}
              className={[
                "h-4 w-4 rounded-full border-2 border-white bg-white shadow-[0_1px_4px_rgba(17,19,21,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                index === currentSlide ? "ring-2 ring-text-primary ring-offset-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── GatewaySection ───────────────────────────────────────────────────────────

function GatewaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="w-full bg-white px-4 pb-24 pt-16 sm:px-6 lg:px-16 lg:pt-[238px]">
      <motion.div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center lg:gap-16"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={slideFromLeft}>
          <motion.p
            className="text-[13px] font-bold uppercase tracking-[0.14em] text-secondary"
            variants={fadeUp}
          >
            Authorized partner for g.a.s.t.
          </motion.p>
          <motion.h2
            className="mt-5 max-w-[560px] text-[34px] font-bold leading-[1.35] text-[#111827] sm:text-[36px]"
            variants={fadeUp}
          >
            Your Gateway to Your Academic Future in Germany
          </motion.h2>
          <motion.p
            className="mt-5 max-w-[570px] text-[16px] leading-relaxed text-text-secondary"
            variants={fadeUp}
          >
            We provide the official testing hub for TestDaF and TestAS required
            for university admissions, allowing you to study directly in Germany
            with only your high school certificate, fully guided by our
            institute&apos;s family.
          </motion.p>
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="mt-7 inline-block"
          >
            <Link
              href="/certificates"
              className="inline-flex h-[48px] min-w-[188px] items-center justify-center rounded-[6px] bg-secondary px-7 text-[14px] font-bold text-white shadow-[0_8px_16px_rgba(185,19,23,0.16)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Get Certified
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={slideFromRight}>
          <CertificationLogoCloud />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── WhyAustrianSection ───────────────────────────────────────────────────────

function WhyAustrianSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section className="w-full bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-16 lg:pb-[72px] lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={titleRef}
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          <h2 className="text-[22px] font-bold leading-tight text-text-primary">
            Why Austrian Institute?
          </h2>
          <motion.div
            className="mx-auto mt-4 h-[3px] w-[72px] rounded-full bg-secondary"
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT_EXPO }}
          />
        </motion.div>

        <motion.div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {whyAustrianItems.map((item) => (
            <motion.article
              key={item.title}
              variants={cardItem}
              whileHover={{
                y: -7,
                boxShadow: "0 24px 48px rgba(17,19,21,0.12)",
                transition: { duration: 0.22, ease: "easeOut" },
              }}
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── ConnectedLearningSection ─────────────────────────────────────────────────

function ConnectedLearningSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section className="w-full bg-white px-4 pb-24 sm:px-6 lg:px-16 lg:pb-[115px]">
      <motion.div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center lg:gap-20"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="lg:pt-0" variants={slideFromLeft}>
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-secondary">
            A connected learning experience
          </p>
          <h2 className="mt-5 max-w-[520px] text-[34px] font-bold leading-[1.35] text-[#111827] sm:text-[36px]">
            Progress You Can See.
            <span className="block">Motivation You Can Feel.</span>
          </h2>
          <p className="mt-5 max-w-[570px] text-[16px] leading-relaxed text-text-secondary">
            Your learning path isn&apos;t linear. It adapts dynamically to your
            goals, your pace, and your performance. A gamified smart dashboard
            tracks your real-time progress so you always know exactly where you
            stand and what comes next.
          </p>
          <motion.div
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="mt-7 inline-block"
          >
            <Link
              href="/courses"
              className="inline-flex h-[48px] min-w-[188px] items-center justify-center rounded-[6px] bg-secondary px-7 text-[14px] font-bold text-white shadow-[0_8px_16px_rgba(185,19,23,0.16)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[753px] lg:mr-[-20px]"
          variants={slideFromRight}
          whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
        >
          <Image
            src="/StuLearnCurv.svg"
            alt="Student learning progress dashboard"
            width={753}
            height={529}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 753px, 100vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── CourseCatalogSection ─────────────────────────────────────────────────────

function CourseCatalogSection() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.08 });

  return (
    <section className="w-full overflow-x-hidden bg-[#f4f4f4] px-4 py-16 sm:px-6 lg:overflow-hidden lg:px-16 lg:pb-[88px] lg:pt-[70px]">
      <div className="mx-auto max-w-[1430px]">
        <motion.div
          ref={headerRef}
          className="mb-9 flex items-end justify-between gap-6"
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <div>
            <h2 className="text-[26px] font-bold leading-tight text-text-primary">
              Course Catalog
            </h2>
            <p className="mt-4 text-[12px] text-text-secondary">
              Tailored paths for every linguistic ambition.
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden shrink-0 text-[12px] font-bold text-secondary transition-colors duration-200 hover:text-[#8f0f12] sm:inline-flex"
          >
            Check all Courses &rarr;
          </Link>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 pb-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:pb-2"
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {homeCourses.map((course) => (
            <motion.article
              key={`${course.id}-${course.title}`}
              variants={cardItem}
              role="button"
              tabIndex={0}
              onClick={() => router.push("/courses")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push("/courses");
                }
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 44px rgba(185,19,23,0.13)",
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              className="group/card w-full cursor-pointer rounded-[13px] bg-white p-[17px] shadow-[0_10px_24px_rgba(17,19,21,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-medium text-[#8b8b8b]">
                  {course.eyebrow}
                </span>
                <strong className="text-[17px] font-extrabold text-[#c90f18]">
                  {course.price}
                </strong>
              </div>

              <h3 className="mt-5 min-h-[22px] text-[16px] font-bold leading-tight text-[#242424]">
                {course.title}
              </h3>

              <div className="relative mt-3 h-[160px] overflow-hidden rounded-[4px] bg-[#e9e9e9]">
                <Image
                  src="/Downloads/coursecatalog.jpg"
                  alt={`${course.title} classroom`}
                  fill
                  className="object-cover object-[50%_66%] transition-transform duration-300 ease-out group-hover/card:scale-105"
                  sizes="294px"
                />
              </div>

              <div className="mt-4 flex min-h-[19px] flex-wrap items-center gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={`${course.id}-${tag}-${index}`}
                    className="rounded-full bg-[#fff0f0] px-2 py-1 text-[8px] font-bold text-[#c90f18]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  router.push("/courses");
                }}
                className="mt-3 flex h-[38px] w-full items-center justify-center rounded-[7px] bg-[#c90f18] text-[11px] font-bold text-white transition-colors hover:bg-[#b91317]"
              >
                View Details
              </button>
            </motion.article>
          ))}
        </motion.div>

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

// ─── PopularEventsSection ─────────────────────────────────────────────────────

// ─── PlatformUpgradeSection ───────────────────────────────────────────────────

function PlatformUpgradeSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.08 });

  return (
    <section className="w-full bg-white px-4 pb-[82px] pt-[76px] sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={titleRef}
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          <h2 className="mx-auto max-w-[330px] text-[28px] font-bold leading-tight text-text-primary sm:max-w-none">
            Upgrade Your Fluency with Our Platform
          </h2>
          <motion.div
            className="mx-auto mt-5 h-[3px] w-[72px] rounded-full bg-secondary"
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT_EXPO }}
          />
        </motion.div>

        <motion.div
          ref={gridRef}
          className="mx-auto mt-[64px] grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {platformFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardItem}
              whileHover={{
                y: -8,
                boxShadow: "0 28px 56px rgba(17,19,21,0.13)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <SurfaceCard className="flex min-h-[520px] flex-col rounded-[10px] border-[#ececec] px-10 pb-10 pt-8 shadow-[0_18px_42px_rgba(17,19,21,0.1)]">
                <motion.div
                  className="flex h-[225px] items-center justify-center"
                  whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={330}
                    height={235}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
                <p className="mt-8 text-[12px] font-extrabold uppercase tracking-[0.12em] text-secondary">
                  {feature.label}
                </p>
                <h3 className="mt-4 text-[26px] font-bold leading-tight text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-6 flex-1 text-[16px] leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                  className="mt-9 inline-flex"
                >
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-3 text-[16px] font-bold text-secondary transition-colors duration-200 hover:text-[#8f0f12]"
                  >
                    {feature.cta}
                    <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                  </Link>
                </motion.div>
              </SurfaceCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CulturalJournalSection ───────────────────────────────────────────────────

function CulturalJournalSection({ articles }: { articles: BlogArticle[] }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  if (articles.length === 0) return null;

  const [mainArticle, ...sideArticles] = articles;

  return (
    <section className="w-full bg-white px-4 pb-[64px] sm:px-6 lg:px-16">
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          className="mb-10 flex items-end justify-between gap-6"
          variants={fadeUp}
        >
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
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.52fr)_minmax(360px,0.96fr)]">
          <motion.div variants={slideFromLeft} whileHover={{ y: -3, transition: { duration: 0.22 } }}>
            <BlogArticleCard
              {...mainArticle}
              href={mainArticle.href}
              featured
              imageClassName="h-[260px]"
              className="min-h-[0] rounded-[10px] shadow-none"
            />
          </motion.div>

          <motion.div
            className="grid gap-6"
            variants={staggerContainer}
          >
            {sideArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={cardItem}
                whileHover={{
                  x: 4,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <GenericCard
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
                  onRead={() => router.push(article.href)}
                  className="rounded-[10px] border-0 shadow-none"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex items-center justify-end gap-3"
          variants={fadeIn}
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
          <motion.button
            type="button"
            aria-label="Previous journal article"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#e5e5e5] bg-white text-text-secondary transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next journal article"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-secondary text-white transition-colors duration-200 hover:bg-[#8f0f12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </motion.div>

        <Link
          href="/blogs"
          className="mt-8 inline-flex text-[11px] font-bold text-secondary sm:hidden"
        >
          Check all Blogs &rarr;
        </Link>
      </motion.div>
    </section>
  );
}

// ─── Shared CarouselControls ──────────────────────────────────────────────────

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
      <motion.button
        type="button"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.88 }}
        transition={{ duration: 0.15 }}
        className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#e5e5e5] bg-white text-text-secondary transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.88 }}
        transition={{ duration: 0.15 }}
        className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-secondary text-white transition-colors duration-200 hover:bg-[#8f0f12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </div>
  );
}

// ─── TeamCarouselControls ─────────────────────────────────────────────────────

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
      <motion.button
        type="button"
        aria-label="Previous team member"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.88 }}
        transition={{ duration: 0.15 }}
        className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-white text-text-primary shadow-[0_6px_12px_rgba(17,19,21,0.12)] transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Next team member"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.88 }}
        transition={{ duration: 0.15 }}
        className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-secondary text-white shadow-[0_6px_12px_rgba(185,19,23,0.16)] transition-colors duration-200 hover:bg-[#8f0f12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </div>
  );
}

// ─── TeamExpertsSection ───────────────────────────────────────────────────────

function TeamExpertsSection({ members }: { members: TeamMember[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.08 });

  if (members.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-[#f4f4f4] px-4 py-[42px] sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          className="mb-8 flex items-center justify-between gap-6"
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <h2 className="text-[20px] font-bold leading-tight text-text-primary">
            Meet Our Team of Experts
          </h2>
          <TeamCarouselControls />
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 gap-5 pb-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={cardItem}
              whileHover={{
                y: -6,
                boxShadow: "0 18px 36px rgba(17,19,21,0.1)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <SurfaceCard className="flex h-[228px] w-full flex-col items-center justify-start rounded-[8px] border-0 px-5 pb-5 pt-6 text-center shadow-[0_8px_18px_rgba(17,19,21,0.04)]">
                <motion.div
                  className="relative h-[104px] w-[104px] overflow-hidden rounded-full bg-[linear-gradient(135deg,#bababa_0%,#f6f6f6_100%)]"
                  whileHover={{ scale: 1.06, transition: { duration: 0.25 } }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="104px"
                    unoptimized={isRemoteAssetUrl(member.image)}
                  />
                </motion.div>
                <h3 className="mt-5 max-w-[190px] text-[14px] font-bold leading-[1.14] text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-2 max-w-[190px] text-[10px] leading-[1.28] text-text-secondary">
                  {member.role}
                </p>
              </SurfaceCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── QuoteIcon ────────────────────────────────────────────────────────────────

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

// ─── StudentSuccessStoriesSection ─────────────────────────────────────────────

function StudentSuccessStoriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative w-full overflow-hidden bg-secondary px-4 py-[44px] text-white sm:px-6 lg:px-16">
      <div
        className="absolute bottom-0 right-[17%] h-[150px] w-[130px] skew-x-[-12deg] bg-[#a70f13]"
        aria-hidden="true"
      />
      <motion.div
        ref={ref}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,420px)] lg:justify-between"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={slideFromLeft}>
          <motion.div
            initial={{ rotate: -6, opacity: 0 }}
            animate={inView ? { rotate: 0, opacity: 1 } : { rotate: -6, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            <QuoteIcon />
          </motion.div>
          <h2 className="mt-4 text-[18px] font-bold leading-tight">
            Student Success
            <span className="block">Stories</span>
          </h2>
          <p className="mt-4 max-w-[220px] text-[10px] leading-relaxed text-white/80">
            Hear from our community of learners who transformed their careers.
          </p>
        </motion.div>

        <motion.div
          variants={slideFromRight}
          whileHover={{
            y: -4,
            boxShadow: "0 20px 40px rgba(17,19,21,0.18)",
            transition: { duration: 0.22, ease: "easeOut" },
          }}
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── ProfessionalTeamSection ──────────────────────────────────────────────────

function ProfessionalTeamSection({ jobs }: { jobs: CareerJob[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  if (jobs.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#fff7f7_0%,#ffffff_100%)] px-4 py-[68px] sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          className="mb-8 flex items-end justify-between gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
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
          </motion.div>
          <motion.div variants={fadeIn}>
            <CarouselControls />
          </motion.div>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 pb-2 lg:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={cardItem}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <CareerJobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage({
  heroSlides,
  articles,
  jobs,
  teamMembers,
}: HomePageData) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex w-full flex-col items-center overflow-x-hidden bg-white">
        <HomeHero slides={heroSlides} />
        <GatewaySection />
        <WhyAustrianSection />
        <ConnectedLearningSection />
        <CourseCatalogSection />
        <PlatformUpgradeSection />
        <CulturalJournalSection articles={articles} />
        <TeamExpertsSection members={teamMembers} />
        <StudentSuccessStoriesSection />
        <ProfessionalTeamSection jobs={jobs} />
        <BlogCallToAction />
      </div>
    </MotionConfig>
  );
}
