import { APPLICATION_STEPS } from "../utils";
import { MotionLi, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";

export default function ApplicationJourneySection() {
  return (
    <MotionSection
      id="application-journey"
      className="w-full px-4 pb-24 pt-10 sm:px-6 lg:px-16 lg:pb-32 lg:pt-16"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Process"
          title="The Application Journey"
          description="Transparent and straightforward. Here is how you join our team."
        />

        <ol className="mt-16 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {APPLICATION_STEPS.map((step, index) => (
            <MotionLi
              key={step.number}
              delay={index * 0.07}
              className="flex flex-col items-center rounded-[14px] border border-[#eadede] bg-white px-5 py-8 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)]"
            >
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#aa000c] text-[22px] font-bold text-white shadow-[0_0_0_8px_rgba(185,19,23,0.08)]">
                {step.number}
              </span>
              <h3 className="mt-7 text-[20px] font-bold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[240px] text-[13px] font-medium leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </MotionLi>
          ))}
        </ol>
      </div>
    </MotionSection>
  );
}
