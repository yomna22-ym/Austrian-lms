import Image from "next/image";
import SurfaceCard from "@/app/shared/SurfaceCard";
import type { CertificationItem } from "../utils";

interface CertificationCardProps {
  certification: CertificationItem;
}

export default function CertificationCard({
  certification,
}: CertificationCardProps) {
  return (
    <SurfaceCard className="flex h-full flex-col overflow-hidden rounded-[8px] border-[#e9e3e3] shadow-[0_8px_18px_rgba(17,19,21,0.07)]">
      <div className="flex min-h-[104px] items-center gap-4 border-b border-[#efeaea] px-5 py-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden">
          <Image
            src={certification.logo}
            alt={`${certification.name} logo`}
            fill
            className="object-contain"
            sizes="48px"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-[26px] font-medium leading-tight text-[#5f5e5e]">
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
  );
}
