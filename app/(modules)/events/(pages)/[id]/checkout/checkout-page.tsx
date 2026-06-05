import { notFound } from "next/navigation";
import Checkout from "@/app/shared/Checkout/Checkout";
import { EVENT_TYPES, MOCK_EVENTS } from "../../../utils";

type EventCheckoutPageProps = {
  eventId: string;
};

function formatPrice(value: number) {
  return `${new Intl.NumberFormat("en-US").format(value)} EGP`;
}

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function EventCheckoutPage({ eventId }: EventCheckoutPageProps) {
  const event = MOCK_EVENTS.find((item) => item.id === eventId);

  if (!event) {
    notFound();
  }

  const eventTitle = event.detailTitle ?? event.title;
  const eventPrice = formatPrice(event.price);
  const typeLabel =
    EVENT_TYPES.find((type) => type.value === event.type)?.label ?? "Event";

  return (
    <Checkout
      successRoute={`/events/${event.id}`}
      item={{
        image: event.image,
        title: eventTitle,
        subtitle: typeLabel,
      }}
      summaryLines={[
        { label: "Event Ticket", value: eventPrice },
        { label: "Registration Fee", value: "0.00 EGP", free: true },
        { label: "Date", value: formatEventDate(event.date) },
        { label: "Location", value: event.location },
      ]}
      total={eventPrice}
    />
  );
}
