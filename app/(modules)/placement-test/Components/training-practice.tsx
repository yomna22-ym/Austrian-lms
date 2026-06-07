"use client";

import React from "react";
import {
  ArrowRight,
  BadgeInfo,
  ClipboardPenLine,
  Clock3,
  FileSpreadsheet,
  FileQuestionMark,
  Headphones,
  Info,
  Mic,
  Play,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Trophy,
} from "lucide-react";
import Button from "@/app/shared/Button/Button";
import { usePlacementNavigation } from "../hooks";
import PlacementStepCard from "./ui/placement-step-card";

interface InfoItem {
  icon: React.ReactNode;
  title: string;
  text?: string;
}

const ControlPreview = () => (
  <div className="mt-1 w-full">
    <div className="overflow-hidden rounded-[7px] border border-input-border bg-input-bg/40">
      <div className="border-b border-input-border px-2 py-1.5 text-center text-[10px] font-medium text-text-secondary">
        Practice Controls (Preview)
      </div>
      <div className="grid grid-cols-4 divide-x divide-input-border bg-white">
        <button
          type="button"
          className="flex h-[52px] flex-col items-center justify-center gap-1 text-[9px] font-medium text-text-primary"
          aria-label="Request microphone access"
        >
          <Mic className="h-4 w-4 text-black" strokeWidth={2.2} aria-hidden="true" />
          <span className="leading-tight">
            Mic
            <br />
            Access
          </span>
        </button>
        <button
          type="button"
          className="flex h-[52px] flex-col items-center justify-center gap-1 text-[9px] font-medium text-text-primary"
          aria-label="Play sample"
        >
          <Play className="h-4 w-4 fill-black text-black" aria-hidden="true" />
          Play
        </button>
        <button
          type="button"
          className="flex h-[52px] flex-col items-center justify-center gap-1 text-[9px] font-medium text-text-primary"
          aria-label="Delete sample"
        >
          <Trash2 className="h-4 w-4 text-black" strokeWidth={2.2} aria-hidden="true" />
          Delete
        </button>
        <button
          type="button"
          className="flex h-[52px] flex-col items-center justify-center gap-1 text-[9px] font-medium text-text-primary"
          aria-label="Record sample"
        >
          <span className="h-4 w-4 rounded-full bg-secondary" aria-hidden="true" />
          Record
        </button>
      </div>
    </div>
    <p className="mt-2 flex items-start justify-center gap-1 text-[10px] leading-snug text-text-secondary">
      <Info className="mt-0.5 h-3 w-3 shrink-0 text-secondary" strokeWidth={2.2} aria-hidden="true" />
      <span>You can listen, delete, and record again if needed.</span>
    </p>
  </div>
);

const Divider = () => <span className="h-8 w-px bg-input-border/80" aria-hidden="true" />;

const PRACTICE_CARDS = [
  {
    step: 1,
    icon: <FileQuestionMark className="h-7 w-7" strokeWidth={2.3} aria-hidden="true" />,
    title: "MCQ Practice",
    description:
      "Try 1 sample multiple-choice question. Each question lasts 10 seconds. Once you move to the next, you cannot go back.",
    footer: (
      <div className="flex w-full items-center justify-center gap-3">
        <Clock3 className="h-4 w-4 text-secondary" strokeWidth={2.4} aria-hidden="true" />
        <span>~10 sec per question</span>
        <Divider />
        <span>1 sample</span>
      </div>
    ),
  },
  {
    step: 2,
    icon: <ClipboardPenLine className="h-7 w-7" strokeWidth={2.3} aria-hidden="true" />,
    title: "Writing Practice",
    description:
      "Answer 1 short writing prompt to understand the writing section format.",
    footer: (
      <div className="flex w-full items-center justify-center gap-3">
        <FileSpreadsheet className="h-4 w-4 text-secondary" strokeWidth={2.4} aria-hidden="true" />
        <span>~5–7 min</span>
        <Divider />
        <span>1 sample</span>
      </div>
    ),
  },
  {
    step: 3,
    icon: <Mic className="h-7 w-7" strokeWidth={2.3} aria-hidden="true" />,
    title: "Speaking Practice",
    description:
      "Allow microphone access, record one sample answer, listen to it, delete it if needed, and make one new recording.",
    showControls: true,
  },
];

const INFO_ITEMS: InfoItem[] = [
  {
    icon: <Trophy className="h-6 w-6 text-secondary" strokeWidth={2.1} aria-hidden="true" />,
    title: "Practice mode only — no score",
    text: "This training does not affect your real test in any way.",
  },
  {
    icon: <Mic className="h-6 w-6 text-secondary" strokeWidth={2.1} aria-hidden="true" />,
    title: "Microphone access is required for speaking practice",
  },
  {
    icon: <Headphones className="h-6 w-6 text-secondary" strokeWidth={2.1} aria-hidden="true" />,
    title: "You can replay your speaking sample",
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-secondary" strokeWidth={2.1} aria-hidden="true" />,
    title: "One fresh re-record is allowed in training",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-secondary" strokeWidth={2.1} aria-hidden="true" />,
    title: "Continue to the real test after completing training",
  },
];

const TrainingPractice = () => {
  const { goToTrainingMcqPractice } = usePlacementNavigation();

  return (
    <section className="min-h-[calc(100vh-72px)] bg-white px-5 pb-10 pt-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-x-10 gap-y-6 xl:grid-cols-[1fr_300px] xl:gap-x-12">
          {/* Title — left column only */}
          <header className="xl:col-start-1 xl:row-start-1">
            <h1 className="text-[32px] font-bold leading-[1.08] text-black sm:text-[38px]">
              Practice Before You Start
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-[1.55] text-text-secondary sm:text-[15px]">
              Take a short training to get familiar with each section of the
              placement test. It&apos;s the best way to build confidence before
              your real test begins.
            </p>
          </header>

          {/* Cards + CTA — left column, row 2 */}
          <div className="xl:col-start-1 xl:row-start-2">
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {PRACTICE_CARDS.map((card) => (
                <PlacementStepCard
                  key={card.step}
                  variant="practice"
                  step={card.step}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  footer={"footer" in card ? card.footer : undefined}
                >
                  {"showControls" in card && card.showControls ? (
                    <ControlPreview />
                  ) : null}
                </PlacementStepCard>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                label="Start Training"
                type="button"
                width="w-[220px]"
                height="h-[46px]"
                bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
                textColorClass="text-primary"
                className="rounded-[8px] text-base font-bold"
                icon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
                iconPosition="right"
                onClick={goToTrainingMcqPractice}
              />
            </div>
          </div>

          {/* Sidebar — right column, aligned with cards */}
          <aside className="w-full rounded-[10px] border border-input-border bg-white shadow-[0_1px_3px_rgba(17,19,21,0.04)] xl:col-start-2 xl:row-start-2 xl:w-[300px] xl:justify-self-end">
            <div className="flex h-[60px] items-center gap-3 rounded-t-[10px] border-b border-input-border bg-input-bg/50 px-5">
              <BadgeInfo className="h-6 w-6 text-secondary" strokeWidth={2.1} aria-hidden="true" />
              <h2 className="text-[16px] font-bold text-text-primary">
                Training Information
              </h2>
            </div>

            <div className="px-5 py-1">
              {INFO_ITEMS.map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    "grid grid-cols-[28px_1fr] gap-3 py-[14px]",
                    index === 0 ? "" : "border-t border-input-border",
                  ].join(" ")}
                >
                  <div className="pt-0.5">{item.icon}</div>
                  <div>
                    <h3 className="text-[12px] font-semibold leading-[1.45] text-text-primary">
                      {item.title}
                    </h3>
                    {item.text ? (
                      <p className="mt-1 text-[11px] font-normal leading-[1.45] text-text-secondary">
                        {item.text}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default TrainingPractice;
