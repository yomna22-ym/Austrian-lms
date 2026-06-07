import PageIntro from "@/app/shared/PageIntro";
import {
  ApplicationJourneySection,
  CareersBenefitsSection,
  CareersListing,
} from "../components";

export default function CareersPage() {
  return (
    <div className="w-full bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_16%,#fff5f5_100%)]">
      <PageIntro
        title="Join Our Professional Academic Team"
        description="Experience a collaborative, innovative environment where German academic quality meets cultural passion. Help us shape the future of language education in Egypt."
      />
      <CareersListing />
      <CareersBenefitsSection />
      <ApplicationJourneySection />
    </div>
  );
}
