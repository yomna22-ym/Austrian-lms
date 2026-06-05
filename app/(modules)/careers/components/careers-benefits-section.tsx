import SurfaceCard from "@/app/shared/SurfaceCard";
import { CAREER_BENEFITS } from "../utils";

export default function CareersBenefitsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-16">
      <div className="rounded-[16px] bg-white px-4 py-12 shadow-[0_18px_45px_rgba(185,19,23,0.05)] sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
            Why Build Your Future With Us?
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-text-secondary sm:text-[14px]">
            We provide more than just a job; we offer a career path rooted in
            excellence, culture, and professional growth.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CAREER_BENEFITS.map((benefit) => (
            <SurfaceCard
              key={benefit.title}
              className="rounded-[10px] border-[#efcaca] px-7 py-8 shadow-none"
            >
              <benefit.Icon
                className="h-8 w-8 text-secondary"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-[20px] font-bold leading-tight text-text-primary">
                {benefit.title}
              </h3>
              <p className="mt-5 text-[13px] leading-relaxed text-text-secondary">
                {benefit.description}
              </p>
            </SurfaceCard>
          ))}
        </div>

        <div className="mt-6 grid gap-6 rounded-[10px] bg-secondary px-6 py-9 text-white lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
          <div>
            <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
              Collaborative Team Spirit
            </h3>
            <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/90">
              Our educators and staff form a tight-knit community where
              knowledge sharing is encouraged and excellence is rewarded. We
              believe our strength lies in our collective passion for teaching.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[520px]">
            <div className="rounded-[8px] border border-white/20 bg-white/10 px-8 py-5 text-center">
              <strong className="block text-4xl font-bold leading-none sm:text-5xl">
                15+
              </strong>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-wide text-white/90">
                Nationalities
              </span>
            </div>
            <div className="rounded-[8px] border border-white/20 bg-white/10 px-8 py-5 text-center">
              <strong className="block text-4xl font-bold leading-none sm:text-5xl">
                200+
              </strong>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-wide text-white/90">
                Workshops
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
