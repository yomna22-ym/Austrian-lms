"use client";

import { CalendarDays, ChevronDown, Clock3, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import GenericCard from "@/app/shared/GenericCard";
import type { CourseBranch, CourseItem } from "../types/course.types";
import { TOTAL_COURSE_COUNT } from "../utils";

interface CourseCardGridProps {
  courses: readonly CourseItem[];
  filterKey: number;
  totalCount?: number;
  activeBranch?: CourseBranch | "all";
}

interface BranchSection {
  title: string;
  variant: "recommend" | "branch";
  courses: CourseItem[];
}

function groupCoursesByBranch(courses: readonly CourseItem[]): BranchSection[] {
  const recommended = courses.filter((course) => course.recommended);
  const sections: BranchSection[] = [];

  if (recommended.length > 0) {
    sections.push({
      title: "Recommended Courses",
      variant: "recommend",
      courses: recommended,
    });
  }

  const branches: CourseBranch[] = [
    "Heliopolis",
    "Maadi",
    "New Cairo",
    "Zamalek",
  ];

  for (const branch of branches) {
    const branchCourses = courses.filter(
      (course) => course.branch === branch && !course.recommended,
    );
    if (branchCourses.length > 0) {
      sections.push({
        title: `${branch} Branch`,
        variant: "branch",
        courses: branchCourses,
      });
    }
  }

  return sections;
}

const SectionHeader = ({
  title,
  count,
  totalInSection,
  open,
  onToggle,
  variant = "branch",
}: {
  title: string;
  count: number;
  totalInSection: number;
  open: boolean;
  onToggle: () => void;
  variant?: "recommend" | "branch";
}) => (
  <button
    type="button"
    aria-expanded={open}
    onClick={onToggle}
    className={[
      "flex min-h-11 w-full items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-left transition-all duration-200",
      variant === "recommend"
        ? "bg-secondary text-white shadow-[0_4px_14px_rgba(185,19,23,0.2)]"
        : "border border-input-border bg-[#faf8f8] text-text-primary hover:border-secondary/20",
    ].join(" ")}
  >
    <span className="text-sm font-bold">{title}</span>
    <span
      className={[
        "ml-auto text-xs font-semibold tabular-nums",
        variant === "recommend" ? "text-white/85" : "text-text-secondary",
      ].join(" ")}
    >
      {count} of {totalInSection}
    </span>
    <ChevronDown
      className={[
        "h-4 w-4 shrink-0 transition-transform duration-200",
        open ? "rotate-180" : "",
        variant === "recommend" ? "text-white" : "text-text-secondary",
      ].join(" ")}
      strokeWidth={2}
      aria-hidden="true"
    />
  </button>
);

export default function CourseCardGrid({
  courses,
  filterKey,
  totalCount = TOTAL_COURSE_COUNT,
  activeBranch = "all",
}: CourseCardGridProps) {
  const router = useRouter();
  const openCourse = (courseId: number) => router.push(`/courses/${courseId}`);

  const sections = useMemo(() => groupCoursesByBranch(courses), [courses]);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const isSectionOpen = (title: string, variant: "recommend" | "branch") => {
    if (title in openSections) return openSections[title];
    if (variant === "recommend") return true;
    if (activeBranch !== "all") {
      return title === `${activeBranch} Branch`;
    }
    return false;
  };

  const toggleSection = (title: string, variant: "recommend" | "branch") => {
    setOpenSections((current) => ({
      ...current,
      [title]: !isSectionOpen(title, variant),
    }));
  };

  if (courses.length === 0) {
    return (
      <div className="animate-events-fade-in flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#e7c5c2] bg-white px-6 py-12 text-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-[#e7c5c2]"
        >
          <path
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-base font-semibold text-text-primary">No courses found</p>
        <p className="max-w-xs text-sm text-text-secondary">
          Try adjusting your filters or selecting more available days.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-medium text-text-secondary lg:hidden">
        Showing{" "}
        <span className="font-bold text-text-primary tabular-nums">
          {courses.length}
        </span>{" "}
        of{" "}
        <span className="font-bold text-text-primary tabular-nums">
          {totalCount}
        </span>{" "}
        courses
      </p>

      {sections.map((section) => {
        const open = isSectionOpen(section.title, section.variant);

        return (
          <section key={`${filterKey}-${section.title}`}>
            <SectionHeader
              title={section.title}
              count={section.courses.length}
              totalInSection={section.courses.length}
              variant={section.variant}
              open={open}
              onToggle={() => toggleSection(section.title, section.variant)}
            />
            {open ? (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {section.courses.map((course, index) => (
                  <div
                    key={`${filterKey}-${course.id}`}
                    className="animate-event-card-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <GenericCard
                      variant="course"
                      width="100%"
                      height="auto"
                      badge={course.badge}
                      price={course.price}
                      title={course.title}
                      description={course.description}
                      meta={[
                        {
                          icon: (
                            <CalendarDays size={16} className="text-secondary" />
                          ),
                          text: course.duration,
                        },
                        {
                          icon: <Users size={16} className="text-secondary" />,
                          text: course.sessions,
                        },
                        {
                          icon: <Clock3 size={16} className="text-secondary" />,
                          text: course.days,
                        },
                      ]}
                      ctaLabel="View details"
                      onCtaClick={() => openCourse(course.id)}
                      className="min-h-[420px] rounded-[24px] border-[#f2dfdd]"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
