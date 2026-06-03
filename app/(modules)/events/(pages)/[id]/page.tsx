import EventDetailPage from "./event-detail-page";

interface EventDetailRouteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventDetailRouteProps) {
  const { id } = await params;

  return {
    title: `Event ${id} — Österreich Institut`,
    description: "Event details coming soon.",
  };
}

export default EventDetailPage;
