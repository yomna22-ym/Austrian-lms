"use client";

import { useSearchParams } from "next/navigation";
import PageIntro from "@/app/shared/PageIntro";
import { CoursesListing } from "../components";

export default function CoursesPageClient() {
  const searchParams = useSearchParams();
  const initialBranch = searchParams.get("branch");

  return (
    <div className="flex w-full flex-col">
      <PageIntro
        title="German Courses"
        description="Tailored for every level — from A1 to C2."
      />
      <CoursesListing initialBranch={initialBranch} />
    </div>
  );
}
