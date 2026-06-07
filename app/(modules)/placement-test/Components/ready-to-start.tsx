"use client";

import React from "react";
import { BookOpen, PenLine, Mic, ArrowRight, ChevronRight } from "lucide-react";
import Button from "@/app/shared/Button/Button";
import PlacementStepCard from "./ui/placement-step-card";
import { usePlacementNavigation } from "../hooks";

const STEPS = [
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
] as const;

const DELAYS = ["0s", "0.1s", "0.2s"];

const ReadyToStart: React.FC = () => {
  const { goToTraining } = usePlacementNavigation();

  return (
    <div className="min-h-screen w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:gap-14 lg:px-8">
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

        <div className="relative w-full">
          <div
            className="pointer-events-none absolute inset-y-0 z-20 hidden w-full items-center justify-between px-[calc(33%-12px)] sm:flex"
            aria-hidden="true"
          >
            <ChevronRight className="h-5 w-5 text-secondary/30" />
            <ChevronRight className="h-5 w-5 text-secondary/30" />
          </div>

          <div className="grid w-full grid-cols-1 justify-items-center gap-3 min-[480px]:grid-cols-3 min-[480px]:justify-items-stretch min-[480px]:gap-4 sm:gap-5">
            {STEPS.map((s, i) => (
              <PlacementStepCard
                key={s.step}
                variant="roadmap"
                {...s}
                animationDelay={DELAYS[i]}
              />
            ))}
          </div>
        </div>

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
            onClick={goToTraining}
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
