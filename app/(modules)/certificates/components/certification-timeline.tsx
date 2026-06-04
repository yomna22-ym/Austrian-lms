import type { TimelineStep } from "../utils";

interface CertificationTimelineProps {
  steps: TimelineStep[];
}

export default function CertificationTimeline({
  steps,
}: CertificationTimelineProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-16">
      <h2 className="text-center text-2xl font-bold text-text-primary sm:text-3xl">
        Streamlined Path to Certification
      </h2>

      <ol className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0">
        <span
          className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-secondary/30 md:block"
          aria-hidden="true"
        />
        {steps.map((step, index) => (
          <li key={step.number} className="relative flex flex-col items-center text-center">
            {index < steps.length - 1 && (
              <span
                className="absolute left-[calc(50%+2rem)] top-8 z-20 hidden h-7 w-[calc(100%-4rem)] -translate-y-1/2 overflow-hidden md:block"
                aria-hidden="true"
              >
                <span
                  className={[
                    "certificate-line-trail",
                    `certificate-line-trail-${index + 1}`,
                  ].join(" ")}
                />
              </span>
            )}
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#aa000c] text-2xl font-bold text-white shadow-[0_0_0_1px_rgba(170,0,12,0.12)]">
              <span
                className={[
                  "certificate-step-glow",
                  `certificate-step-glow-${index + 1}`,
                ].join(" ")}
                aria-hidden="true"
              />
              <span
                className={[
                  "certificate-step-glow",
                  "certificate-step-glow-soft",
                  `certificate-step-glow-${index + 1}`,
                ].join(" ")}
                aria-hidden="true"
              />
              <span className="relative z-10">{step.number}</span>
            </span>
            <h3 className="mt-6 text-sm font-semibold text-text-primary">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[210px] text-[12px] leading-relaxed text-text-secondary">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
