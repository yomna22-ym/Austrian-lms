import { APPLICATION_STEPS } from "../utils";

export default function ApplicationJourneySection() {
  return (
    <section
      id="application-journey"
      className="w-full px-4 pb-24 pt-10 sm:px-6 lg:px-16 lg:pb-32 lg:pt-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
            The Application Journey
          </h2>
          <p className="mt-4 text-[13px] text-text-secondary sm:text-[14px]">
            Transparent and straightforward. Here is how you join our team.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {APPLICATION_STEPS.map((step) => (
            <li key={step.number} className="flex flex-col items-center">
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#aa000c] text-[22px] font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-8 text-[20px] font-bold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[210px] text-[12px] font-semibold leading-relaxed tracking-wide text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
