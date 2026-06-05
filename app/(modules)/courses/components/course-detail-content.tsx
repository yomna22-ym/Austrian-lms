import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  Lock,
  MapPin,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react";
import Breadcrumbs from "@/app/shared/Breadcrumbs";
import InfoPill from "@/app/shared/InfoPill";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { COURSE_DETAIL, RELATED_COURSES } from "../utils";

const FEATURE_ICONS = [BadgeCheck, GraduationCap, Users];
const BOOKING_ICONS = [CalendarDays, Clock, MapPin];
const LEARNING_ICONS = [MessageSquare, BookOpen, Award];

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-[28px] font-extrabold leading-tight text-text-primary">
      {children}
    </h2>
  );
}

function BookingSidebar({ courseId }: { courseId: string }) {
  return (
    <SurfaceCard className="sticky top-24 p-6 shadow-[0_16px_30px_rgba(17,19,21,0.11)]">
      <div className="flex items-end gap-2">
        <span className="text-[34px] font-extrabold leading-none text-secondary">
          {COURSE_DETAIL.price}
        </span>
        <span className="pb-1 text-[13px] font-semibold text-text-secondary">
          {COURSE_DETAIL.priceNote}
        </span>
      </div>
      <p className="mt-3 text-[15px] text-text-secondary">{COURSE_DETAIL.taxNote}</p>

      <div className="mt-5 flex h-8 items-center gap-2 rounded-md bg-[#fff7df] px-3 text-[13px] font-extrabold uppercase text-[#a87212]">
        <Users size={15} aria-hidden="true" />
        {COURSE_DETAIL.seatsLeft}
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {COURSE_DETAIL.booking.map((item, index) => {
          const Icon = BOOKING_ICONS[index];
          return (
            <div key={item.title} className="grid grid-cols-[24px_1fr] gap-3">
              <Icon size={22} className="mt-0.5 text-text-secondary" aria-hidden="true" />
              <div>
                <p className="text-[14px] font-extrabold text-text-primary">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] font-medium text-text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href={`/courses/${courseId}/checkout`}
        className="mt-8 inline-flex h-[58px] w-full items-center justify-center rounded-[6px] bg-secondary text-[17px] font-extrabold text-primary shadow-[0_7px_14px_rgba(185,19,23,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:translate-y-0"
      >
        Book This Course
      </Link>

      <div className="mt-6 border-t border-[#ece8e8] pt-5">
        <div className="flex items-center gap-2 text-[12px] font-bold text-text-secondary">
          <Lock size={15} aria-hidden="true" />
          Secure Booking
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] font-medium text-text-secondary">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-[#1aa35b]" aria-hidden="true" />
            Instant Confirm
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-[#1aa35b]" aria-hidden="true" />
            Flexible Cancel
          </span>
        </div>
      </div>
    </SurfaceCard>
  );
}

function RelatedCourseCard({
  course,
}: {
  course: (typeof RELATED_COURSES)[number];
}) {
  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <SurfaceCard className="overflow-hidden shadow-none transition-shadow group-hover:shadow-[0_14px_30px_rgba(17,19,21,0.08)]">
        <div className="relative h-[158px] w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </div>
        <div className="p-6">
          <p className="text-[11px] font-bold uppercase text-secondary">
            {course.badge}
          </p>
          <h3 className="mt-4 text-[17px] font-extrabold text-text-primary">
            {course.title}
          </h3>
          <div className="mt-5 flex items-center justify-between border-t border-[#ece8e8] pt-5">
            <span className="text-[18px] font-extrabold text-text-primary">
              {course.price}
            </span>
            <span className="text-text-secondary transition-colors group-hover:text-secondary">
              <ArrowRight size={22} aria-hidden="true" />
            </span>
          </div>
        </div>
      </SurfaceCard>
    </Link>
  );
}

export default function CourseDetailContent({ courseId }: { courseId: string }) {
  return (
    <div className="bg-[linear-gradient(110deg,#ffffff_0%,#ffffff_58%,#fff4f4_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-16">
        <Breadcrumbs
          items={[
            { label: "German Courses", href: "/courses" },
            { label: COURSE_DETAIL.breadcrumbTitle },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,720px)_390px] lg:items-start lg:gap-14">
          <main className="min-w-0">
            <SurfaceCard className="p-6">
              <span className="inline-flex rounded-[3px] bg-[#e9e9e9] px-3 py-1 text-[11px] font-bold uppercase text-text-secondary">
                {COURSE_DETAIL.badge}
              </span>
              <h1 className="mt-5 text-[38px] font-extrabold leading-tight text-text-primary">
                {COURSE_DETAIL.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-text-secondary">
                {COURSE_DETAIL.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {COURSE_DETAIL.features.map((feature, index) => {
                  const Icon = FEATURE_ICONS[index];
                  return (
                    <InfoPill
                      key={feature}
                      label={feature}
                      icon={<Icon size={15} aria-hidden="true" />}
                    />
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#ece8e8] pt-6 sm:grid-cols-4">
                {COURSE_DETAIL.stats.map((item) => (
                  <div key={item.label}>
                    <p className="text-[15px] font-medium text-text-secondary">
                      {item.label}
                    </p>
                    <p className="mt-2 text-[16px] font-extrabold text-text-primary">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <section className="mt-10">
              <SectionTitle>About This Course</SectionTitle>
              <SurfaceCard className="mt-5 p-6">
                <p className="text-[15px] leading-[1.75] text-text-primary">
                  {COURSE_DETAIL.about}
                </p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-1 text-[15px] font-extrabold text-secondary"
                >
                  Read more
                  <ChevronDown size={15} aria-hidden="true" />
                </button>
              </SurfaceCard>
            </section>

            <section className="mt-10">
              <SectionTitle>What You&apos;ll Learn</SectionTitle>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {COURSE_DETAIL.learningOutcomes.map((item, index) => {
                  const Icon = LEARNING_ICONS[index];
                  return (
                    <SurfaceCard key={item.title} className="p-6 shadow-none">
                      <Icon size={30} className="text-secondary" aria-hidden="true" />
                      <h3 className="mt-5 text-[17px] font-extrabold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </SurfaceCard>
                  );
                })}
              </div>
            </section>

            <section className="mt-10">
              <SectionTitle>Course Curriculum</SectionTitle>
              <div className="mt-5 flex flex-col gap-2">
                {COURSE_DETAIL.curriculum.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex h-16 items-center justify-between rounded-[10px] border border-[#e8e2e2] bg-white px-5 text-left text-[16px] font-extrabold text-text-primary"
                  >
                    {item}
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <SectionTitle>Course Details</SectionTitle>
              <SurfaceCard className="mt-5 overflow-hidden shadow-none">
                {COURSE_DETAIL.details.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-1 gap-2 border-b border-[#ece8e8] px-4 py-5 last:border-b-0 sm:grid-cols-[1fr_2fr]"
                  >
                    <span className="text-[16px] font-medium text-text-secondary">
                      {item.label}
                    </span>
                    <span className="text-[16px] font-extrabold text-text-primary">
                      {item.value}
                    </span>
                  </div>
                ))}
              </SurfaceCard>
            </section>

            <section className="mt-10">
              <SectionTitle>Frequently Asked Questions</SectionTitle>
              <div className="mt-5">
                {COURSE_DETAIL.faqs.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex w-full items-center justify-between border-b border-[#ece8e8] py-4 text-left text-[15px] font-extrabold text-text-primary"
                  >
                    {item}
                    <Plus size={20} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          </main>

          <aside className="lg:pt-0">
            <BookingSidebar courseId={courseId} />
          </aside>
        </div>

        <section className="mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[36px] font-extrabold leading-tight text-text-primary">
              Continue Your Journey
            </h2>
            <Link
              href="/courses"
              className="text-[16px] font-extrabold text-secondary transition-opacity hover:opacity-75"
            >
              View All Courses
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {RELATED_COURSES.map((course) => (
              <RelatedCourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
