import PageIntro from "@/app/shared/PageIntro";
import { TakePlacementTest } from "../Components";

export default function PlacementTestLandingPage() {
  return (
    <div className="w-full">
      <PageIntro
        eyebrow="Willkommen"
        title="Your Path to the Right Course"
        description="To ensure you learn German at the perfect level, we provide a comprehensive assessment of your current skills. Start your journey with our official placement test."
      />
      <TakePlacementTest />
    </div>
  );
}
