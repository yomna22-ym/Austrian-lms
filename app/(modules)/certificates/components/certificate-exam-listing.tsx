"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  SlidersHorizontal,
  Trash2,
  Users,
} from "lucide-react";
import { MotionArticle, MotionAside, MotionDiv } from "@/app/shared/Motion";
import type { CertificationExam } from "@/types/webhook/certification-exams";
import type { OfficialCertification } from "@/types/webhook/certifications";
import { useCertificationExamsList } from "../hooks/use-certification-exams-list";

interface CertificateExamListingProps {
  initialExams: CertificationExam[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null;
  officialCertifications: OfficialCertification[];
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const FilterLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[12px] font-bold text-[#242424]">{children}</h3>
);

function CertificateExamCard({ exam }: { exam: CertificationExam }) {
  const seatsStatus =
    exam.seatsLeft <= 5 ? "Limited seats" : `${exam.seatsLeft} seats left`;

  return (
    <MotionArticle className="group flex min-h-[372px] flex-col rounded-[16px] border border-[#eadede] bg-white p-5 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_24px_54px_rgba(185,19,23,0.11)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[18px] font-bold text-[#242424]">
          {exam.certificateTitle}
        </h3>
        <strong className="shrink-0 rounded-full border border-[#f4d4d4] bg-white px-3 py-1 text-[14px] font-extrabold text-[#b91317] shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
          {exam.price} EGP
        </strong>
      </div>

      <p className="mt-5 line-clamp-3 text-[13px] font-medium leading-relaxed text-[#4f4f4f]">
        {exam.description}
      </p>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#eadede] pt-5">
        {[
          {
            icon: CalendarDays,
            text: `Date: ${formatDate(exam.date)}`,
          },
          {
            icon: MapPin,
            text: exam.addressName,
          },
          {
            icon: Clock3,
            text: `${exam.timeStart} – ${exam.timeEnd}`,
          },
          {
            icon: Users,
            text: seatsStatus,
          },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <item.icon
              className="h-4 w-4 text-[#c90f18]"
              strokeWidth={2.1}
              aria-hidden="true"
            />
            <span className="text-[12px] font-semibold text-[#6f7680]">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/auth/signup"
        className="mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#c90f18] text-[13px] font-bold text-white shadow-[0_8px_14px_rgba(201,15,24,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91317] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 active:translate-y-0"
      >
        Book Exam
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </MotionArticle>
  );
}

export default function CertificateExamListing({
  initialExams,
  initialPagination,
  officialCertifications,
}: CertificateExamListingProps) {
  const searchParams = useSearchParams();
  const initialBranch = searchParams.get("branch");

  const officialCertOptions = officialCertifications.map((c) => ({
    id: c._id,
    label: c.title,
  }));

  const {
    exams,
    pagination,
    certFilter,
    branchFilter,
    setBranchFilter,
    setCertFilter,
    loading,
    error,
    goToPreviousPage,
    goToNextPage,
  } = useCertificationExamsList({
    initialExams,
    initialPagination,
    officialCertOptions,
    initialBranch,
  });

  return (
    <section className="w-full px-4 pb-16 pt-8 sm:px-6 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <MotionAside className="h-fit rounded-[18px] border border-[#eadede] bg-white p-5 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="inline-flex items-center gap-2 text-[18px] font-bold text-[#242424]">
              <SlidersHorizontal
                className="h-4 w-4 text-secondary"
                aria-hidden="true"
              />
              Filters
            </h2>
            {certFilter && (
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-[10px] font-bold text-[#c90f18] transition-colors hover:bg-[#fff0f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
                onClick={() => setCertFilter("")}
              >
                Reset Filter
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
            {branchFilter && (
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-[10px] font-bold text-[#c90f18] transition-colors hover:bg-[#fff0f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
                onClick={() => setBranchFilter("")}
              >
                Clear Branch
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {branchFilter && (
            <div className="mt-4 rounded-[8px] border border-[#f4d4d4] bg-[#fff8f8] px-4 py-3 text-[12px] font-semibold text-[#6f7680]">
              Showing exams for{" "}
              <span className="text-[#242424]">{branchFilter}</span>
            </div>
          )}

          {officialCertOptions.length > 0 && (
            <div className="mt-8 flex flex-col gap-7">
              <section>
                <FilterLabel>Exam</FilterLabel>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    aria-pressed={certFilter === ""}
                    onClick={() => setCertFilter("")}
                    className={[
                      "flex min-h-11 w-full items-center rounded-[8px] px-4 text-left text-[12px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                      certFilter === ""
                        ? "bg-[#c90f18] text-white"
                        : "border border-[#eadede] bg-white text-[#6f7680] shadow-[0_1px_2px_rgba(17,19,21,0.04)] hover:border-secondary/50 hover:text-secondary",
                    ].join(" ")}
                  >
                    All Exams
                  </button>
                  {officialCertOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={certFilter === opt.id}
                      onClick={() => setCertFilter(opt.id)}
                      className={[
                        "flex min-h-11 w-full items-center rounded-[8px] px-4 text-left text-[12px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                        certFilter === opt.id
                          ? "bg-[#c90f18] text-white"
                          : "border border-[#eadede] bg-white text-[#6f7680] shadow-[0_1px_2px_rgba(17,19,21,0.04)] hover:border-secondary/50 hover:text-secondary",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}
        </MotionAside>

        {/* Main content */}
        <MotionDiv delay={0.08} className="min-w-0">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {pagination && (
              <p className="text-[13px] font-bold text-[#6f7680]">
                Showing{" "}
                <span className="text-[#242424]">{exams.length}</span> of{" "}
                {pagination.total} exams
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[344px] animate-pulse rounded-[12px] bg-[#f5f5f5]"
                />
              ))}
            </div>
          ) : exams.length === 0 ? (
            <div className="rounded-[18px] border border-dashed border-[#eadede] bg-white px-8 py-16 text-center shadow-[0_1px_2px_rgba(17,19,21,0.04),0_16px_36px_rgba(17,19,21,0.055)]">
              <h3 className="text-lg font-bold text-text-primary">
                No exam sessions available
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-6 text-[#6f7680]">
                Check back soon or select another exam type to see upcoming sessions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {exams.map((exam) => (
                <CertificateExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-9 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={!pagination.hasPrevPage}
                className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#e4e4e4] bg-white text-[#777777] transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goToNextPage}
                disabled={!pagination.hasNextPage}
                className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#c90f18] text-white transition-colors hover:bg-[#b91317] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </MotionDiv>
      </div>
    </section>
  );
}
