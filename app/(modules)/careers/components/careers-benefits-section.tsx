import SurfaceCard from "@/app/shared/SurfaceCard";
import SectionHeader from "@/app/shared/SectionHeader";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import { CAREER_BENEFITS } from "../utils";
import type { CareerStatistics } from "@/types/webhook/careers";

interface CareersBenefitsSectionProps {
  statistics: CareerStatistics;
}

function formatCount(value: number): string {
  if (value <= 0) return "0";
  return `${value}+`;
}

export default function CareersBenefitsSection({
  statistics,
}: CareersBenefitsSectionProps) {
  const nationalities = formatCount(statistics.nationalitiesCount);
  const workshops = formatCount(statistics.workshopsCount);

  return (
    <MotionSection className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-16">
      <div className="rounded-[18px] border border-[#eadede] bg-white px-4 py-12 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Team experience"
          title="Why Build Your Future With Us?"
          description="We provide more than just a job; we offer a career path rooted in excellence, culture, and professional growth."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CAREER_BENEFITS.map((benefit) => (
            <MotionDiv key={benefit.title} hoverLift delay={0.05}>
              <SurfaceCard
              key={benefit.title}
              className="group rounded-[14px] min-h-[280px] flex flex-col text-center items-center justify-center border-[#eadede] px-7 py-8 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_22px_48px_rgba(185,19,23,0.1)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff0f0] text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                <benefit.Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[20px] font-bold leading-tight text-text-primary">
                {benefit.title}
              </h3>
              <p className="mt-5 text-[13px] leading-relaxed text-text-secondary">
                {benefit.description}
              </p>
              </SurfaceCard>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv
          delay={0.14}
          className="mt-6 grid gap-6 rounded-[16px] border border-[#eadede] bg-white px-6 py-9 text-text-primary shadow-[0_1px_2px_rgba(17,19,21,0.04),0_16px_38px_rgba(17,19,21,0.06)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10"
        >
          <div>
            <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
              Collaborative Team Spirit
            </h3>
            <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-text-secondary">
              Our educators and staff form a tight-knit community where
              knowledge sharing is encouraged and excellence is rewarded. We
              believe our strength lies in our collective passion for teaching.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[520px]">
            <div className="rounded-[12px] border border-[#eadede] bg-white px-8 py-5 text-center shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
              <strong className="block text-4xl font-bold leading-none text-secondary sm:text-5xl">
                {nationalities}
              </strong>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-wide text-text-secondary">
                Nationalities
              </span>
            </div>
            <div className="rounded-[12px] border border-[#eadede] bg-white px-8 py-5 text-center shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
              <strong className="block text-4xl font-bold leading-none text-secondary sm:text-5xl">
                {workshops}
              </strong>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-wide text-text-secondary">
                Workshops
              </span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
