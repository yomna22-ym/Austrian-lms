import {
  ApplicationJourneySection,
  CareersBenefitsSection,
  CareersListing,
} from "../components";

export default function CareersPage() {
  return (
    <div className="w-full bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_16%,#fff5f5_100%)]">
      <CareersListing />
      <CareersBenefitsSection />
      <ApplicationJourneySection />
    </div>
  );
}
