import PageIntro from "@/app/shared/PageIntro";
import { CourseCardGrid, CourseFilters } from "../components";

export default function CoursesPage() {
  return (
    <div className="w-full bg-white">
      <PageIntro
        title="German Courses"
        description="Tailored for every level - from A1 to C2."
      />
      <section className="w-full px-4 py-12 sm:px-6 nav:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 nav:grid-cols-[300px_minmax(0,1fr)] nav:gap-9">
            <CourseFilters />

            <div className="min-w-0">
              <CourseCardGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
