import EventDetailPage from "./event-detail-page";
import { loadEventDetail } from "../../utils/events.loader";

interface EventDetailRouteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventDetailRouteProps) {
  const { id } = await params;
  const event = await loadEventDetail(id);
  const title = event?.detailTitle ?? event?.title ?? `Event ${id}`;

  return {
    title: `${title} — Österreich Institut`,
    description: event?.description ?? "Event details at Österreich Institut.",
  };
}

export default EventDetailPage;
