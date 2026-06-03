"use client";

import React from "react";
import { Clock, BookOpen, RefreshCw, Shield, ArrowRight } from "lucide-react";
import Button from "@/app/shared/Button/Button";
import InfoPill from "./ui/info-pill";
import ProcessRoadmap from "./ui/process-roadmap";
import SummaryRow from "./ui/summary-row";
import { PLACEMENT_INFO_PILLS, PLACEMENT_ROADMAP_STEPS } from "../utils";
import { usePlacementNavigation } from "../hooks";

const INFO_PILL_ICONS = {
  clock: <Clock className="h-4 w-4" aria-hidden="true" />,
  book: <BookOpen className="h-4 w-4" aria-hidden="true" />,
} as const;

const TakePlacementTest: React.FC = () => {
  const { goToCheckout } = usePlacementNavigation();

  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left — test info card */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-input-border sm:p-8 lg:p-10">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
              <div className="max-w-xl">
                <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                  Take the Placement Test
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Comprehensive assessment [A1&nbsp;–&nbsp;C1] according to
                  CEFR standards.
                </p>
              </div>
              <span className="inline-flex h-7 shrink-0 items-center rounded-full bg-secondary/10 px-3 text-xs font-semibold text-secondary">
                Official
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-6 border-y border-input-border py-6 sm:mt-8 sm:flex-row sm:justify-center sm:gap-0 sm:py-8">
              {PLACEMENT_INFO_PILLS.map((pill, index) => (
                <React.Fragment key={pill.label}>
                  {index > 0 && (
                    <div
                      className="hidden h-14 w-px shrink-0 self-center bg-input-border sm:block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex w-full max-w-[220px] justify-center sm:min-w-0 sm:flex-1 sm:basis-0 sm:max-w-none">
                    <InfoPill
                      icon={INFO_PILL_ICONS[pill.iconKey]}
                      label={pill.label}
                      sub={pill.sub}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="mt-8 pt-2">
              <ProcessRoadmap steps={PLACEMENT_ROADMAP_STEPS} currentStep={2} />
            </div>
          </div>

          {/* Right — payment summary */}
          <div className="flex w-full flex-col items-center gap-4 sm:items-stretch">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-input-border sm:max-w-none sm:text-left">
              <h2 className="text-lg font-bold text-text-primary">
                Payment Summary
              </h2>

              <div className="mx-auto mt-5 flex w-full max-w-sm flex-col gap-3 sm:mx-0 sm:max-w-none">
                <SummaryRow label="Standard Assessment" value="3,000 EGP" />
                <SummaryRow
                  label="Registration Fee"
                  value="0.00 EGP"
                  valueClass="text-secondary font-semibold"
                />
                <div className="my-1 h-px bg-input-border" />
                <SummaryRow
                  label="Total Amount"
                  value="3,000 EGP"
                  valueClass="text-secondary text-base"
                  bold
                />
              </div>

              <Button
                label="Pay"
                type="button"
                width="w-full"
                height="h-[51px]"
                bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
                textColorClass="text-primary"
                className="mt-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                iconPosition="right"
                onClick={goToCheckout}
              />

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
                <Shield className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
                Encrypted Secure Payment
              </p>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-input-border bg-white p-5 text-center sm:max-w-none sm:text-left">
              <p className="mb-2 text-sm font-bold text-text-primary">
                Why pay for a test?
              </p>
              <p className="text-xs leading-relaxed text-text-secondary">
                Our placement test is a professional diagnostic tool reviewed by
                certified instructors. It guarantees accurate placement in our
                academic courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakePlacementTest;
