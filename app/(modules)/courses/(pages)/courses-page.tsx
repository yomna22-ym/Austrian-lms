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
          <div className="flex flex-col gap-4 nav:ml-[340px] nav:flex-row nav:items-center nav:justify-between">
            <p className="text-[15px] font-bold text-text-secondary">
              Showing <span className="text-text-primary">24</span> of 86 courses
            </p>
            <span className="inline-flex w-fit items-center rounded-full bg-[#fff0f0] px-4 py-2 text-[12px] font-bold text-secondary">
              Level: A1-A2 x
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 nav:grid-cols-[300px_minmax(0,1fr)] nav:gap-9">
            <CourseFilters />

            <div className="min-w-0">
              <CourseCardGrid />
              <button
                type="button"
                className="mt-8 flex h-[74px] w-full max-w-[292px] items-center justify-center rounded-[14px] border border-dashed border-[#dddddd] bg-[#f3f3f3] text-[15px] font-medium text-[#7d7d7d] transition-colors hover:bg-[#eeeeee]"
              >
                More courses loading...
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
