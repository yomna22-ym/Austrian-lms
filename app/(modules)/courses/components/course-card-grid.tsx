"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Clock3, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import GenericCard from "@/app/shared/GenericCard";
import { COURSES } from "../utils";

const showingLabel = "Showing 24 of 86 courses";
const branchSections = [
  {
    title: "Recommend Course",
    variant: "recommend" as const,
    courses: COURSES.slice(0, 2),
  },
  {
    title: "Heliopolis Branch",
    variant: "branch" as const,
    courses: COURSES.slice(2, 5),
  },
  {
    title: "Maadi Branch",
    variant: "branch" as const,
    courses: COURSES.slice(5, 8),
  },
  {
    title: "New Cairo Branch",
    variant: "branch" as const,
    courses: COURSES.slice(8, 9),
  },
  {
    title: "Zamalek Branch",
    variant: "branch" as const,
    courses: COURSES.slice(0, 3),
  },
];

const CourseCard = ({
  course,
  onOpen,
}: {
  course: (typeof COURSES)[number];
  onOpen: () => void;
}) => (
  <GenericCard
    variant="course"
    width="w-full"
    height={500}
    badge={course.badge}
    price={course.price}
    title={course.title}
    description={course.description}
    meta={[
      {
        icon: <CalendarDays size={16} className="text-secondary" />,
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
    ctaLabel="view details"
    onCtaClick={onOpen}
    className="rounded-[24px] border-[#f2dfdd] shadow-none"
  />
);

const SectionHeader = ({
  title,
  open,
  onToggle,
  variant = "branch",
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  variant?: "recommend" | "branch";
}) => (
  <button
    type="button"
    aria-expanded={open}
    onClick={onToggle}
    className={[
      "flex h-10 w-full items-center justify-between gap-4 rounded-[6px] px-4 text-left",
      variant === "recommend"
        ? "bg-[#c90f18] text-white"
        : "bg-[#f1f1f1] text-[#242424]",
    ].join(" ")}
  >
    <span className="text-[13px] font-bold">{title}</span>
    <span className="ml-auto text-[12px] font-semibold">{showingLabel}</span>
    <ChevronDown
      className={[
        "h-4 w-4 transition-transform",
        open ? "rotate-180" : "",
        variant === "recommend" ? "text-white" : "text-[#666666]",
      ].join(" ")}
      strokeWidth={2}
      aria-hidden="true"
    />
  </button>
);

export default function CourseCardGrid() {
  const router = useRouter();
  const openCourse = (courseId: number) => router.push(`/courses/${courseId}`);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Recommend Course": true,
    "Heliopolis Branch": true,
    "Maadi Branch": true,
    "New Cairo Branch": false,
    "Zamalek Branch": false,
  });

  const toggleSection = (title: string) => {
    setOpenSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {branchSections.map((section) => (
        <section key={section.title}>
          <SectionHeader
            title={section.title}
            variant={section.variant}
            open={openSections[section.title]}
            onToggle={() => toggleSection(section.title)}
          />
          {openSections[section.title] ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {section.courses.map((course) => (
                <CourseCard
                  key={`${section.title}-${course.id}`}
                  course={course}
                  onOpen={() => openCourse(course.id)}
                />
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
