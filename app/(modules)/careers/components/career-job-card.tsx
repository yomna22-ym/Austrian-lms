import Link from "next/link";
import { ArrowRight, Banknote, Clock3, MapPin } from "lucide-react";
import SurfaceCard from "@/app/shared/SurfaceCard";
import type { CareerJob } from "../utils";

interface CareerJobCardProps {
  job: CareerJob;
}

const META_ICON_CLASS = "h-4 w-4 shrink-0 text-secondary";

export default function CareerJobCard({ job }: CareerJobCardProps) {
  return (
    <SurfaceCard className="flex min-h-[214px] flex-col rounded-[12px] px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(185,19,23,0.12)] sm:px-6">
      <span className="w-fit rounded-[6px] bg-[#f1eeee] px-3 py-1 text-[10px] font-bold leading-none text-secondary">
        {job.role}
      </span>

      <h3 className="mt-5 text-[20px] font-bold leading-snug text-text-primary">
        {job.title}
      </h3>
      <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
        {job.description}
      </p>

      <div className="mt-auto border-t border-[#ecd0d0] pt-4">
        <div className="flex flex-col gap-3 text-[12px] font-semibold text-text-secondary sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className={META_ICON_CLASS} aria-hidden="true" />
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className={META_ICON_CLASS} aria-hidden="true" />
              {job.branch}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Banknote className={META_ICON_CLASS} aria-hidden="true" />
              {job.salary}
            </span>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-1.5 text-[12px] font-bold text-secondary transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </SurfaceCard>
  );
}
