import PageIntro from "@/app/shared/PageIntro";
import { EventsListing } from "../components";
import { EVENTS_HERO, MOCK_EVENTS } from "../utils";

export default function EventsPage() {
  return (
    <div className="flex w-full flex-col">
      <PageIntro
        title={EVENTS_HERO.title}
        description={EVENTS_HERO.description}
      />
      <EventsListing events={MOCK_EVENTS} />
    </div>
  );
}
