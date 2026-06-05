import { CourseDetailContent } from "../../components";

export default function CourseDetailPage({ courseId }: { courseId: string }) {
  return <CourseDetailContent courseId={courseId} />;
}
