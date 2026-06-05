import { notFound } from "next/navigation";
import CourseDetailPage from "./course-detail-page";
import { COURSES } from "../../utils";

export function generateStaticParams() {
  return COURSES.map((course) => ({
    courseId: String(course.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const courseExists = COURSES.some((course) => String(course.id) === courseId);

  if (!courseExists) {
    notFound();
  }

  return <CourseDetailPage courseId={courseId} />;
}
