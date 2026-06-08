"use client";

import { CalendarDays, Clock3, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import GenericCard from "@/app/shared/GenericCard";
import { COURSES } from "../utils";

export default function CourseCardGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {COURSES.map((course) => (
        <GenericCard
          key={course.id}
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
          onCtaClick={() => router.push(`/courses/${course.id}`)}
          className="rounded-[24px] border-[#f2dfdd] shadow-none"
        />
      ))}
    </div>
  );
}
