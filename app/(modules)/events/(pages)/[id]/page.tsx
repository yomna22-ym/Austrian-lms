import EventDetailPage from "./event-detail-page";
import { MOCK_EVENTS } from "../../utils";

interface EventDetailRouteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventDetailRouteProps) {
  const { id } = await params;
  const event = MOCK_EVENTS.find((item) => item.id === id);
  const title = event?.detailTitle ?? event?.title ?? `Event ${id}`;

  return {
    title: `${title} — Österreich Institut`,
    description: event?.description ?? "Event details at Österreich Institut.",
  };
}

export function generateStaticParams() {
  return MOCK_EVENTS.map((event) => ({ id: event.id }));
}

export default EventDetailPage;
