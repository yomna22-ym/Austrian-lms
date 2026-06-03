import HeroSection from "@/app/shared/HeroSection";
import { EventsListing } from "../components";
import { EVENTS_HERO, MOCK_EVENTS } from "../utils";

export default function EventsPage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection
        image="/hero.jpg"
        imageAlt={EVENTS_HERO.imageAlt}
        title={EVENTS_HERO.title}
        desc={EVENTS_HERO.description}
      />
      <EventsListing events={MOCK_EVENTS} />
    </div>
  );
}
