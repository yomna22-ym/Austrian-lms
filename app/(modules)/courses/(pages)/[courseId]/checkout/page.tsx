import { notFound } from "next/navigation";
import CourseCheckoutPage from "./checkout-page";
import { COURSES } from "../../../utils";

export function generateStaticParams() {
  return COURSES.map((course) => ({
    courseId: String(course.id),
  }));
}

export const metadata = { title: "Course Checkout - Osterreich Institut" };

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

  return <CourseCheckoutPage courseId={courseId} />;
}
