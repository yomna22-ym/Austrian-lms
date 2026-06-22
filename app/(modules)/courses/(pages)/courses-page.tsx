import { Suspense } from "react";
import CoursesPageClient from "./courses-page-client";

export default function CoursesPage() {
  return (
    <Suspense fallback={null}>
      <CoursesPageClient />
    </Suspense>
  );
}
