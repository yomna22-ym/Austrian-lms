import { ArrowDown } from "lucide-react";
import HeroSection from "@/app/shared/HeroSection/HeroSection";
import {
  ApplicationJourneySection,
  CareersBenefitsSection,
  CareersListing,
} from "../components";

export default function CareersPage() {
  return (
    <div className="w-full bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_16%,#fff5f5_100%)]">
      <HeroSection
        image="/Icareershero.png"
        imageAlt="Professional academic team at Osterreich Institut"
        title="Join Our Professional Academic Team"
        desc="Experience a collaborative, innovative environment where German academic quality meets cultural passion. Help us shape the future of language education in Egypt."
        ctaText="View Open Positions"
        ctaLink="#open-positions"
        ctaIcon={<ArrowDown className="h-4 w-4" aria-hidden="true" />}
        priority
      />

      <CareersListing />
      <CareersBenefitsSection />
      <ApplicationJourneySection />
    </div>
  );
}
