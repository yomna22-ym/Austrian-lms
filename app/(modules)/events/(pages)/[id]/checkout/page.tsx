import { notFound } from "next/navigation";
import EventCheckoutPage from "./checkout-page";
import { MOCK_EVENTS } from "../../../utils";

export function generateStaticParams() {
  return MOCK_EVENTS.map((event) => ({
    id: event.id,
  }));
}

export const metadata = { title: "Event Checkout - Osterreich Institut" };

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventExists = MOCK_EVENTS.some((event) => event.id === id);

  if (!eventExists) {
    notFound();
  }

  return <EventCheckoutPage eventId={id} />;
}
