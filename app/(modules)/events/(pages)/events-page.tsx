import { EventsListing } from "../components";
import { MOCK_EVENTS } from "../utils";

export default function EventsPage() {
  return (
    <div className="flex w-full flex-col">
      <EventsListing events={MOCK_EVENTS} />
    </div>
  );
}
