import Image from "next/image";
import { MotionDiv } from "@/app/shared/Motion";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { isRemoteAssetUrl } from "@/lib/asset-url";
import type { CertificationItem } from "../utils";

interface CertificationCardProps {
  certification: CertificationItem;
}

export default function CertificationCard({
  certification,
}: CertificationCardProps) {
  return (
    <MotionDiv className="h-full" hoverLift>
      <SurfaceCard className="group flex h-full flex-col overflow-hidden rounded-[14px] border-[#eadede] shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_22px_48px_rgba(185,19,23,0.1)]">
      <div className="flex min-h-[104px] items-center gap-4 border-b border-[#eadede] px-5 py-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-white">
          <Image
            src={certification.logo}
            alt={`${certification.name} logo`}
            fill
            className="object-contain"
            sizes="48px"
            unoptimized={isRemoteAssetUrl(certification.logo)}
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-[24px] font-semibold leading-tight text-[#5f5e5e]">
            {certification.name}
          </h3>
          <p className="mt-1 text-[10px] leading-tight text-text-secondary">
            {certification.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-7 pt-5">
        <span
          className={[
            "mb-5 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-medium",
            certification.categoryTone,
          ].join(" ")}
        >
          {certification.category}
        </span>
        <h4 className="text-[15px] font-bold leading-tight text-text-primary">
          {certification.descriptionTitle}
        </h4>
        <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
          {certification.description}
        </p>
      </div>
      </SurfaceCard>
    </MotionDiv>
  );
}
