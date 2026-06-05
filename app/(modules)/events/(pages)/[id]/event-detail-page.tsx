import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  Bookmark,
  CalendarDays,
  Clock3,
  LockKeyhole,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import Breadcrumbs from "@/app/shared/Breadcrumbs";
import MapPreview from "@/app/shared/MapPreview";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { WEBSITE_ROUTES } from "@/app/constants/routes";
import { MOCK_EVENTS } from "../../utils";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

const fallbackGallery = ["/event.png", "/jornal2.png", "/CULTURE.png"];

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCompactDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = MOCK_EVENTS.find((item) => item.id === id);

  if (!event) notFound();

  const title = event.detailTitle ?? event.title;
  const dateLabel = formatEventDate(event.date);
  const compactDateLabel = formatCompactDate(event.date);
  const eventTimeRange = event.timeRange ?? "18:00 - 20:30";
  const timeLabel = event.timezone
    ? `${eventTimeRange} (${event.timezone})`
    : eventTimeRange;
  const locationText = [event.location, event.room].filter(Boolean).join(", ");
  const capacityText = event.capacity ? `${event.capacity} Persons` : "25 Persons";
  const tags = event.tags ?? ["Workshop", "Community", "German Practice"];
  const about = event.about ?? [
    event.description,
    "Meet fellow learners, practice in small groups, and enjoy a guided cultural session led by the Österreich Institut team.",
  ];
  const gallery = event.gallery ?? fallbackGallery;

  return (
    <main className="bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_62%,#fff4f4_100%)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-16 lg:py-14">
        <div className="min-w-0">
          <Breadcrumbs
            items={[
              { label: "Events", href: WEBSITE_ROUTES.events },
              { label: event.title },
            ]}
            className="mb-6"
          />

          <section>
            <div className="relative overflow-hidden rounded-[8px]">
              <Image
                src={event.image}
                alt={title}
                width={780}
                height={438}
                priority
                className="h-[260px] w-full object-cover sm:h-[390px]"
              />

              <div className="absolute left-4 top-4 flex h-[70px] w-[58px] flex-col items-center justify-center rounded-[8px] bg-secondary text-white shadow-[0_10px_18px_rgba(17,19,21,0.18)]">
                <span className="text-[22px] font-extrabold leading-none">
                  {event.dateBadge.day}
                </span>
                <span className="mt-1 text-[11px] font-bold uppercase leading-none">
                  {event.dateBadge.month}
                </span>
              </div>

              <div className="absolute right-4 top-4 flex gap-3">
                <button
                  type="button"
                  aria-label="Share event"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-text-primary shadow-sm transition hover:-translate-y-0.5"
                >
                  <Share2 size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Save event"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-text-primary shadow-sm transition hover:-translate-y-0.5"
                >
                  <Bookmark size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <p className="mt-6 text-[12px] font-extrabold uppercase tracking-[0.12em] text-secondary">
              {event.location}
            </p>
            <h1 className="mt-2 max-w-3xl text-[34px] font-extrabold leading-tight text-text-primary sm:text-[42px]">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-text-secondary">
              {event.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={tag}
                  className={[
                    "rounded-[8px] px-4 py-2 text-[13px] font-semibold",
                    index === tags.length - 1
                      ? "border border-[#f3d6d6] bg-[#fff5f5] text-secondary"
                      : "bg-input-bg text-text-primary",
                  ].join(" ")}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-4 border-y border-[#eee2e2] py-6 sm:grid-cols-2 xl:grid-cols-4">
            <DetailStat icon={<CalendarDays size={22} />} label="Date" value={compactDateLabel} />
            <DetailStat icon={<Clock3 size={22} />} label="Time" value={eventTimeRange} />
            <DetailStat icon={<MapPin size={22} />} label="Location" value={event.location} />
            <DetailStat icon={<Users size={22} />} label="Capacity" value={capacityText} />
          </section>

          <section className="mt-12">
            <h2 className="text-[28px] font-extrabold text-text-primary">
              About this event
            </h2>
            <div className="mt-5 max-w-3xl space-y-5 text-[16px] leading-[1.75] text-text-secondary">
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 text-[16px] font-bold text-secondary transition hover:brightness-90"
            >
              Read more
            </button>
          </section>

          {event.locationDetails && (
            <section className="mt-12">
              <h2 className="text-[28px] font-extrabold text-text-primary">
                Location
              </h2>
              <div className="relative mt-5 overflow-hidden rounded-[8px]">
                <MapPreview
                  location={event.locationDetails}
                  popupLabel={event.locationDetails.name}
                  className="h-[300px] rounded-[8px] ring-1 ring-input-border sm:h-[320px]"
                />
                <SurfaceCard className="absolute bottom-5 left-5 z-[1000] max-w-[270px] rounded-[8px] p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <div>
                      <p className="text-[14px] font-bold text-text-primary">
                        {event.locationDetails.name}
                      </p>
                      <p className="mt-1 text-[13px] leading-snug text-text-secondary">
                        {event.locationDetails.address}
                      </p>
                    </div>
                  </div>
                </SurfaceCard>
              </div>
            </section>
          )}

          <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[28px] font-extrabold text-text-primary">
                Past Events Gallery
              </h2>
              <p className="text-[13px] text-text-secondary">
                Last updated {event.lastUpdated ?? "26.07.24"}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {gallery.slice(0, 3).map((image, index) => (
                <div
                  key={image}
                  className="relative h-[170px] overflow-hidden rounded-[8px]"
                >
                  <Image
                    src={image}
                    alt={`${event.title} gallery ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 220px"
                  />
                  {index === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/70">
                      <span className="text-[24px] font-extrabold text-white">
                        +12 more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:pt-11">
          <SurfaceCard className="sticky top-6 rounded-[14px] p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-text-secondary">
                  Entry Price
                </p>
                <p className="mt-1 text-[30px] font-extrabold leading-none text-secondary">
                  {event.price} EGP
                </p>
              </div>
              {event.seatsLeft && (
                <span className="rounded-full border border-[#f6dfad] bg-[#fff8df] px-3 py-1.5 text-[12px] font-bold text-[#c87500]">
                  {event.seatsLeft} seats left
                </span>
              )}
            </div>

            <div className="mt-7 space-y-4 rounded-[8px] bg-[#f1f1f1] p-5 text-[14px] font-medium text-text-primary">
              <BookingInfo icon={<CalendarDays size={16} />} text={dateLabel} />
              <BookingInfo icon={<Clock3 size={16} />} text={timeLabel} />
              <BookingInfo icon={<MapPin size={16} />} text={locationText} />
            </div>

            <Link
              href={`/events/${event.id}/checkout`}
              className="mt-6 inline-flex h-[58px] w-full items-center justify-center rounded-[8px] bg-secondary text-[16px] font-extrabold text-primary shadow-[0_12px_18px_rgba(185,19,23,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 active:translate-y-0"
            >
              Confirm Booking
            </Link>

            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-text-secondary">
              <LockKeyhole size={13} aria-hidden="true" />
              Secure booking
            </p>

            <div className="mt-6 border-t border-[#e7dfdf] pt-5 text-center text-[14px] text-text-secondary">
              Questions?{" "}
              <Link
                href={WEBSITE_ROUTES.contact}
                className="font-semibold text-secondary transition hover:brightness-90"
              >
                Contact our support
              </Link>
            </div>
          </SurfaceCard>
        </aside>
      </div>
    </main>
  );
}

function DetailStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-input-bg text-secondary">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-extrabold uppercase text-text-secondary">
          {label}
        </p>
        <p className="mt-1 text-[14px] font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
}

function BookingInfo({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-text-secondary">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
