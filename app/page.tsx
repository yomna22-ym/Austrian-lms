import HomePage from "@/app/(modules)/home/(pages)/home-page";
import { loadHomePageData } from "@/app/(modules)/home/utils/home.loader";

export default async function Page() {
  const { heroSlides, articles, jobs, teamMembers } =
    await loadHomePageData();

  return (
    <HomePage
      heroSlides={heroSlides}
      articles={articles}
      jobs={jobs}
      teamMembers={teamMembers}
    />
  );
}
