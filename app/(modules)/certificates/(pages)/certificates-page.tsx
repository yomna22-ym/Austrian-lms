import Link from "next/link";
import { Suspense } from "react";
import PageIntro from "@/app/shared/PageIntro";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
import SurfaceCard from "@/app/shared/SurfaceCard";
import {
  ArrowRight,
  Globe2,
  Handshake,
} from "lucide-react";
import {
  CertificateExamListing,
  CertificationCard,
  CertificationTimeline,
  CertificatesFaq,
} from "../components";
import {
  CERTIFICATION_BENEFITS,
  CERTIFICATION_STEPS,
  LICENSED_CENTER_ICON,
  CERTIFICATION_FAQS as FALLBACK_FAQS,
  CERTIFICATIONS as FALLBACK_CERTIFICATIONS,
} from "../utils/certificates.constants";
import { loadCertificatesPageData } from "../utils/certificates.loader";
import { mapOfficialCertsToItems } from "../utils/certificates.mapper";

export default async function CertificatesPage() {
  const { certPage, exams, examsPagination } = await loadCertificatesPageData();

  const LicensedCenterIcon = LICENSED_CENTER_ICON;

  const certifications = certPage?.officialCertifications?.length
    ? mapOfficialCertsToItems(certPage.officialCertifications)
    : FALLBACK_CERTIFICATIONS;

  const faqs = certPage?.faqs?.length ? certPage.faqs : FALLBACK_FAQS;

  const officialCertifications = certPage?.officialCertifications ?? [];

  const stats = [
    {
      Icon: Globe2,
      value: certPage ? `${certPage.countriesRepresented}+` : "100+",
      label: "Countries Represented",
    },
    {
      Icon: Handshake,
      value: certPage ? `${certPage.globalPartners}+` : "1,000+",
      label: "Global Partners",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white">
      <PageIntro
        eyebrow="Certificates"
        title="Your Gateway to Your Academic Future in Germany"
        description="We are the official testing hub for TestDaF and TestAS - the internationally recognized exams required for university admission in Germany."
      />

      <Suspense fallback={null}>
        <CertificateExamListing
          initialExams={exams}
          initialPagination={examsPagination}
          officialCertifications={officialCertifications}
        />
      </Suspense>

      <MotionSection className="w-full px-4 py-14 sm:px-6 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,520px)_minmax(420px,1fr)] lg:items-center lg:gap-20">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Official partner"
              title="Advancing International Academic Standards"
              description="g.a.s.t. develops high-stakes examinations recognized by German higher education institutions. As an official licensed partner in Egypt, the Osterreich Institut gives candidates a standardized, professional route toward their academic goals."
            />
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
              {stats.map((stat) => (
                <MotionDiv key={stat.label} hoverLift>
                  <SurfaceCard
                  key={stat.label}
                  className="group flex min-h-[158px] flex-col items-center justify-center rounded-[14px] border-[#eadede] px-6 py-6 text-center shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_24px_54px_rgba(185,19,23,0.11)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff0f0] text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                    <stat.Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <strong className="mt-3 text-3xl font-bold leading-none text-text-primary">
                    {stat.value}
                  </strong>
                  <span className="mt-2 text-[13px] text-text-secondary">
                    {stat.label}
                  </span>
                  </SurfaceCard>
                </MotionDiv>
              ))}
            </div>

              <MotionDiv delay={0.12} hoverLift>
              <SurfaceCard className="flex items-center justify-center gap-4 rounded-[14px] border-[#eadede] px-6 py-6 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#fff0f0] text-secondary">
                <LicensedCenterIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="text-[14px] font-medium leading-relaxed text-text-primary">
                Official Licensed Center
                <br />
                <span className="font-normal text-text-secondary">
                  Certified by g.a.s.t. e.V.
                </span>
              </p>
              </SurfaceCard>
            </MotionDiv>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-16">
        <div className="rounded-[18px] border border-[#eadede] bg-white px-4 py-12 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] sm:px-8 lg:px-10">
          <SectionHeader
            eyebrow="Choose your route"
            title="Official Certifications"
            description="Choose the right exam path for your academic or professional journey in Germany."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {certifications.map((certification) => (
              <CertificationCard
                key={certification.name}
                certification={certification}
              />
            ))}
          </div>
        </div>
      </MotionSection>

      <CertificationTimeline steps={CERTIFICATION_STEPS} />

      <MotionSection className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-16">
        <div className="rounded-[18px] border border-[#eadede] bg-white px-4 py-12 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {CERTIFICATION_BENEFITS.map((benefit) => (
              <MotionDiv key={benefit.title} hoverLift>
                <SurfaceCard
                key={benefit.title}
                className="group rounded-[14px] border-[#eadede] px-6 py-7 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_22px_48px_rgba(185,19,23,0.1)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff0f0] text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <benefit.Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[14px] font-bold text-text-primary">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
                  {benefit.description}
                </p>
                </SurfaceCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      <CertificatesFaq items={faqs} />

      <MotionSection className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-16">
        <div className="relative overflow-hidden rounded-[18px] border border-[#eadede] bg-white px-6 py-14 text-center shadow-[0_1px_2px_rgba(17,19,21,0.04),0_22px_52px_rgba(17,19,21,0.07)] sm:px-10 lg:py-16">
          <div
            className="absolute inset-x-10 top-0 h-px bg-secondary/30"
            aria-hidden="true"
          />
          <h2 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
            Ready to Start Your Journey to Germany?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-relaxed text-text-secondary">
            Don&apos;t wait for the last minute. Secure your testing spot and begin
            your professional preparation today with the experts.
          </p>
          <Link
            href="/auth/signup"
            className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-input bg-secondary px-8 text-[13px] font-bold text-white shadow-[0_10px_20px_rgba(185,19,23,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 active:translate-y-0"
          >
            Get Certified Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </MotionSection>
    </div>
  );
}
