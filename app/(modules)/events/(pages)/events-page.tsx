import EventsPageClient from "./events-page-client";
import { loadEventsPageData } from "../utils/events.loader";

export default async function EventsPage() {
  const data = await loadEventsPageData();
  return <EventsPageClient data={data} />;
}
