import Link from "next/link";
import PageIntro from "@/app/shared/PageIntro";
import SurfaceCard from "@/app/shared/SurfaceCard";
import {
  CertificateExamListing,
  CertificationCard,
  CertificationTimeline,
  CertificatesFaq,
} from "../components";
import {
  CERTIFICATION_BENEFITS,
  CERTIFICATION_FAQS,
  CERTIFICATION_STATS,
  CERTIFICATION_STEPS,
  CERTIFICATIONS,
  LICENSED_CENTER_ICON,
} from "../utils";

export default function CertificatesPage() {
  const LicensedCenterIcon = LICENSED_CENTER_ICON;

  return (
    <div className="w-full bg-[linear-gradient(180deg,#ffffff_0%,#fff7f7_30%,#ffffff_100%)]">
      <PageIntro
        title="Your Gateway to Your Academic Future in Germany"
        description="We are the official testing hub for TestDaF and TestAS - the internationally recognized exams required for university admission in Germany."
      />
      <CertificateExamListing />
      <section className="w-full px-4 py-14 sm:px-6 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,520px)_minmax(420px,1fr)] lg:items-center lg:gap-20">
          <div>
            <h2 className="max-w-md text-2xl font-bold leading-tight text-[#aa000c] sm:text-3xl">
              Advancing International Academic Standards
            </h2>
            <div className="mt-7 flex flex-col gap-5 text-[14px] leading-relaxed text-text-secondary">
              <p>
                The Gesellschaft fur Akademische Studienvorbereitung und
                Testentwicklung (g.a.s.t.) is a leading institution in the field
                of language testing and academic assessment. Founded with the
                mission to facilitate global student mobility, g.a.s.t. develops
                and organizes high-stakes examinations that are recognized by all
                German higher education institutions.
              </p>
              <p>
                As an official licensed partner in Egypt, the Osterreich
                Institut provides a standardized, professional environment for
                candidates to achieve their academic goals.
              </p>
            </div>
          </div>

          <div className="grid gap-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {CERTIFICATION_STATS.map((stat) => (
                <SurfaceCard
                  key={stat.label}
                  className="flex min-h-[150px] flex-col items-center justify-center rounded-[8px] px-6 py-6 text-center shadow-[0_10px_22px_rgba(17,19,21,0.08)]"
                >
                  <stat.Icon
                    className="h-7 w-7 text-secondary"
                    aria-hidden="true"
                  />
                  <strong className="mt-3 text-3xl font-bold leading-none text-text-primary">
                    {stat.value}
                  </strong>
                  <span className="mt-2 text-[13px] text-text-secondary">
                    {stat.label}
                  </span>
                </SurfaceCard>
              ))}
            </div>

            <SurfaceCard className="flex items-center justify-center gap-4 rounded-[8px] px-6 py-6 shadow-[0_10px_22px_rgba(17,19,21,0.08)]">
              <LicensedCenterIcon
                className="h-7 w-7 text-secondary"
                aria-hidden="true"
              />
              <p className="text-[14px] font-medium leading-relaxed text-text-primary">
                Official Licensed Center
                <br />
                <span className="font-normal text-text-secondary">
                  Certified by g.a.s.t. e.V.
                </span>
              </p>
            </SurfaceCard>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-16">
        <div className="rounded-[14px] bg-white px-4 py-12 shadow-[0_12px_35px_rgba(185,19,23,0.04)] sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Official Certifications
            </h2>
            <p className="mt-4 text-[14px] text-text-secondary">
              Choose the right path for your academic or professional journey in
              Germany.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {CERTIFICATIONS.map((certification) => (
              <CertificationCard
                key={certification.name}
                certification={certification}
              />
            ))}
          </div>
        </div>
      </section>

      <CertificationTimeline steps={CERTIFICATION_STEPS} />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-16">
        <div className="rounded-[14px] bg-white px-4 py-12 shadow-[0_12px_35px_rgba(185,19,23,0.04)] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {CERTIFICATION_BENEFITS.map((benefit) => (
              <SurfaceCard
                key={benefit.title}
                className="rounded-[8px] px-6 py-7 shadow-[0_8px_18px_rgba(17,19,21,0.06)]"
              >
                <benefit.Icon
                  className="h-7 w-7 text-secondary"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-[14px] font-bold text-text-primary">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
                  {benefit.description}
                </p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <CertificatesFaq items={CERTIFICATION_FAQS} />

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-16">
        <div className="rounded-[14px] bg-[#c91118] px-6 py-14 text-center text-white sm:px-10 lg:py-16">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Ready to Start Your Journey to Germany?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-relaxed text-white/85">
            Don&apos;t wait for the last minute. Secure your testing spot and begin
            your professional preparation today with the experts.
          </p>
          <Link
            href="/auth/signup"
            className="mt-8 inline-flex h-[52px] items-center justify-center rounded-input bg-white px-8 text-[13px] font-medium text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-secondary active:translate-y-0"
          >
            Get Certified Now
          </Link>
        </div>
      </section>
    </div>
  );
}
