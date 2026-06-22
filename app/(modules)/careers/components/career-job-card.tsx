"use client";

import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Clock3,
  MapPin,
} from "lucide-react";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { MotionDiv } from "@/app/shared/Motion";
import type { CareerJob } from "../types";

interface CareerJobCardProps {
  job: CareerJob;
  onApply?: (job: CareerJob) => void;
}

const META_ICON_CLASS = "h-4 w-4 shrink-0 text-secondary";

export default function CareerJobCard({ job, onApply }: CareerJobCardProps) {
  const handleApply = () => {
    if (job.applicationUrl) {
      window.open(job.applicationUrl, "_blank", "noopener,noreferrer");
      return;
    }
    onApply?.(job);
  };

  return (
    <MotionDiv hoverLift>
      <SurfaceCard className="group flex min-h-[256px] flex-col rounded-[16px] border-[#eadede] px-5 py-5 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_24px_54px_rgba(185,19,23,0.11)] sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fff0f0] px-3 py-1.5 text-[11px] font-bold leading-none text-secondary">
          <BriefcaseBusiness className="h-3.5 w-3.5" aria-hidden="true" />
          {job.role}
        </span>
        <span className="rounded-full border border-[#eadede] bg-white px-3 py-1 text-[11px] font-semibold text-text-secondary shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
          {job.type}
        </span>
      </div>

      <h3 className="mt-5 text-[20px] font-bold leading-snug text-text-primary">
        {job.title}
      </h3>
      <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
        {job.description}
      </p>

      <div className="mt-auto border-t border-[#eadede] pt-4">
        <div className="flex flex-col gap-4 text-[12px] font-semibold text-text-secondary">
          <div className="grid gap-2 sm:grid-cols-3">
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

          {onApply ? (
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-secondary px-5 text-[13px] font-bold text-white shadow-[0_10px_20px_rgba(185,19,23,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 active:translate-y-0 sm:w-fit"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <Link
              href="/careers#open-positions"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-secondary px-5 text-[13px] font-bold text-white shadow-[0_10px_20px_rgba(185,19,23,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 active:translate-y-0 sm:w-fit"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
      </SurfaceCard>
    </MotionDiv>
  );
}
