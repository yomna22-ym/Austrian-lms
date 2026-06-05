import Image from "next/image";
import { CERTIFICATIONS } from "../utils";

const floatingLayout = [
  {
    name: "TestDaF",
    className: "lg:absolute lg:left-[16%] lg:top-0 lg:w-[310px]",
  },
  {
    name: "onSET",
    className: "lg:absolute lg:right-0 lg:top-[82px] lg:w-[278px]",
  },
  {
    name: "dMAT",
    className: "lg:absolute lg:left-0 lg:top-[170px] lg:w-[214px]",
  },
  {
    name: "TestAS",
    className: "lg:absolute lg:bottom-0 lg:left-[38%] lg:w-[324px]",
  },
] as const;

const orderedCertifications = floatingLayout
  .map((item) => ({
    ...item,
    certification: CERTIFICATIONS.find(
      (certification) => certification.name === item.name
    ),
  }))
  .filter((item) => item.certification);

export default function CertificationLogoCloud() {
  return (
    <div
      className="relative grid min-h-[360px] w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:block"
      aria-label="Official certifications"
    >
      {orderedCertifications.map(({ name, className, certification }) => (
        <div
          key={name}
          className={[
            "flex min-h-[86px] items-center gap-4 rounded-[10px] border border-[#eee] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(17,19,21,0.1)]",
            className,
          ].join(" ")}
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden">
            <Image
              src={certification!.logo}
              alt={`${certification!.name} logo`}
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-[30px] font-medium leading-none text-[#5f5e5e] lg:text-[36px]">
              {certification!.name}
            </h3>
            <p className="mt-2 truncate text-[12px] leading-none text-text-secondary">
              {certification!.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
