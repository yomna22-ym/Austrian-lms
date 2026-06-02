"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, PenLine, Mic, ArrowRight, ChevronRight } from "lucide-react";
import Button from "@/app/shared/Button/Button";
import { PLACEMENT_TEST_ROUTES } from "../constants/routes";

interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  animationDelay: string;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  icon,
  title,
  description,
  animationDelay,
}) => (
  <div
    className="group relative flex w-full max-w-sm flex-col items-center gap-4 overflow-hidden rounded-2xl border border-input-border bg-white px-4 pb-6 pt-8 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-secondary/30 hover:shadow-[0_8px_32px_rgba(185,19,23,0.10)] min-[480px]:max-w-none sm:gap-5 sm:px-6 sm:pb-8 sm:pt-10"
    style={{ animation: `roadmap-fade-in 0.5s ease-out ${animationDelay} both` }}
  >
    {/* Colored top accent bar */}
    <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-linear-to-r from-secondary/60 via-secondary to-secondary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    {/* Step badge — top-left */}
    <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-[6px] bg-secondary/10 text-[10px] font-bold text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
      {step}
    </span>

    {/* Icon container */}
    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/8 ring-1 ring-secondary/15 transition-all duration-300 group-hover:bg-secondary/15 group-hover:ring-secondary/30">
      {/* Soft glow behind icon on hover */}
      <span className="absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30 bg-secondary" />
      <span className="relative z-10 text-secondary">{icon}</span>
    </div>

    {/* Step label + title */}
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-secondary/70">
        Step {step}
      </p>
      <h3 className="text-lg font-bold text-text-primary">{title}</h3>
    </div>

    <p className="max-w-[220px] text-sm leading-relaxed text-text-secondary">
      {description}
    </p>
  </div>
);

const STEPS: Omit<StepCardProps, "animationDelay">[] = [
  {
    step: 1,
    icon: <BookOpen className="h-7 w-7" aria-hidden="true" />,
    title: "MCQ",
    description:
      "Grammar and vocabulary assessment with multiple choice questions.",
  },
  {
    step: 2,
    icon: <PenLine className="h-7 w-7" aria-hidden="true" />,
    title: "Writing",
    description:
      "Respond to a specific prompt to evaluate your creative writing ability.",
  },
  {
    step: 3,
    icon: <Mic className="h-7 w-7" aria-hidden="true" />,
    title: "Speaking",
    description:
      "Short verbal recording to assess pronunciation and fluency.",
  },
];

const DELAYS = ["0s", "0.1s", "0.2s"];

const ReadyToStart: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:gap-14 lg:px-8">

        {/* Header */}
        <div
          className="flex flex-col items-center gap-4 text-center"
          style={{ animation: "roadmap-fade-in 0.5s ease-out 0s both" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/8 px-3 py-1 text-xs font-semibold text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Ready to Begin
          </span>
          <h1 className="text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-[2.25rem]">
            German Language Placement Test
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-text-secondary sm:text-[15px]">
            Complete 3 steps to receive your CEFR level placement.
          </p>
        </div>

        {/* Step cards */}
        <div className="relative w-full">
          {/* Connector arrows between cards — sm+ only */}
          <div
            className="pointer-events-none absolute inset-y-0 z-20 hidden w-full items-center justify-between px-[calc(33%-12px)] sm:flex"
            aria-hidden="true"
          >
            <ChevronRight className="h-5 w-5 text-secondary/30" />
            <ChevronRight className="h-5 w-5 text-secondary/30" />
          </div>

          <div className="grid w-full grid-cols-1 justify-items-center gap-3 min-[480px]:grid-cols-3 min-[480px]:justify-items-stretch min-[480px]:gap-4 sm:gap-5">
            {STEPS.map((s, i) => (
              <StepCard key={s.step} {...s} animationDelay={DELAYS[i]} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="flex flex-col items-center gap-3"
          style={{ animation: "roadmap-fade-in 0.5s ease-out 0.35s both" }}
        >
          <Button
            label="Start The Test"
            type="button"
            width="w-full max-w-[280px] sm:w-[232px] sm:max-w-none"
            height="h-[52px]"
            bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
            textColorClass="text-primary"
            className="shadow-[0_4px_16px_rgba(185,19,23,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(185,19,23,0.36)] active:translate-y-0"
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            iconPosition="right"
            onClick={() => {
              router.push(PLACEMENT_TEST_ROUTES.landing);
            }}
          />
          <p className="text-xs text-text-secondary">
            Once started, the test cannot be paused or restarted.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReadyToStart;
