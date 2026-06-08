"use client";

import React from "react";
import {
  ClipboardPenLine,
  Clock3,
  FileSpreadsheet,
  FileQuestionMark,
  Headphones,
  Mic,
  Play,
  Trash2,
} from "lucide-react";
import Button from "@/app/shared/Button/Button";
import { usePlacementNavigation } from "../hooks";
import PlacementStepCard from "./ui/placement-step-card";

const Divider = () => <span className="h-8 w-px bg-[#cfcfcf]" aria-hidden="true" />;

const AudioPreview = () => (
  <div className="flex min-w-0 flex-1 items-center gap-4">
    <Play className="h-6 w-6 shrink-0 fill-black text-black" aria-hidden="true" />
    <div className="min-w-0 flex-1">
      <div className="flex h-7 items-center gap-[2px]" aria-hidden="true">
        {[
          5, 10, 14, 18, 8, 22, 31, 26, 16, 23, 29, 20, 12, 18, 24, 15, 11,
          20, 26, 14, 10, 17, 12, 8,
        ].map((height, index) => (
          <span
            key={index}
            className="w-0.5 rounded-full bg-[#c9c9c9]"
            style={{ height: Math.max(4, Math.round(height * 0.68)) }}
          />
        ))}
      </div>
      <div className="relative h-0.5 rounded-full bg-[#c7c7c7]">
        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#df0012]" />
      </div>
    </div>
  </div>
);

const ControlPreview = () => (
  <div className="flex w-full items-center justify-between gap-2 text-[10px] font-medium leading-none text-black">
    <span className="flex min-w-0 items-center gap-2">
      <span className="flex flex-col items-center gap-1">
        <Mic className="h-[18px] w-[18px] text-black" strokeWidth={2.25} aria-hidden="true" />
        <span>Mic</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <Play className="h-[19px] w-[19px] fill-black text-black" aria-hidden="true" />
        <span>Play</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <Trash2 className="h-[17px] w-[17px] text-black" strokeWidth={2.25} aria-hidden="true" />
        <span>Delete</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <span className="h-[18px] w-[18px] rounded-full bg-[#df0012]" aria-hidden="true" />
        <span>Record</span>
      </span>
    </span>
    <Divider />
    <span className="shrink-0 whitespace-nowrap text-[13px]">1 sample</span>
  </div>
);

const PRACTICE_CARDS = [
  {
    step: 1,
    icon: <FileQuestionMark className="h-8 w-8" strokeWidth={2.1} aria-hidden="true" />,
    title: "MCQ Practice",
    description:
      "Try 1 sample multiple-choice question. Each question lasts 10 seconds, Once you move to the next, you cannot go back.",
    footer: (
      <div className="flex w-full items-center justify-between gap-4">
        <span className="flex items-center gap-4 whitespace-nowrap">
          <Clock3 className="h-6 w-6 text-[#df0012]" strokeWidth={2.15} aria-hidden="true" />
          <span>~10 sec per question</span>
        </span>
        <Divider />
        <span className="whitespace-nowrap">1 sample</span>
      </div>
    ),
  },
  {
    step: 2,
    icon: <Headphones className="h-8 w-8" strokeWidth={2.05} aria-hidden="true" />,
    title: "Listening Practice",
    description:
      "Listen to one short audio sample and answer one question about it.",
    footer: (
      <div className="flex w-full items-center gap-5">
        <AudioPreview />
        <Divider />
        <span className="shrink-0 whitespace-nowrap text-[13px]">1 sample</span>
      </div>
    ),
  },
  {
    step: 3,
    icon: <Mic className="h-8 w-8" strokeWidth={2.1} aria-hidden="true" />,
    title: "Speaking Practice",
    description:
      "Allow microphone access, record one sample answer, listen to it, delete if needed, and make one new recording.",
    footer: <ControlPreview />,
  },
  {
    step: 4,
    icon: <ClipboardPenLine className="h-8 w-8" strokeWidth={2.15} aria-hidden="true" />,
    title: "Writing Practice",
    description:
      "Answer 1 short writing prompt to understand the writing section format.",
    footer: (
      <div className="flex w-full items-center justify-between gap-4">
        <span className="flex items-center gap-4 whitespace-nowrap">
          <FileSpreadsheet className="h-5 w-5 text-[#df0012]" strokeWidth={2.3} aria-hidden="true" />
          <span>~5-7 min</span>
        </span>
        <Divider />
        <span className="whitespace-nowrap">1 sample</span>
      </div>
    ),
  },
];

const TrainingPractice = () => {
  const { goToTrainingMcqPractice } = usePlacementNavigation();

  return (
    <section className="min-h-[calc(100vh-72px)] bg-white px-5 pb-10 pt-7 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <header className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[32px] font-bold leading-[1.05] text-black sm:text-[38px] lg:text-[42px]">
            Practice Before You Start
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-[16px] font-normal leading-[1.4] text-[#54545d] sm:text-[18px]">
            Take a short training to get familiar with each section of the
            placement test. It&apos;s the best way to build confidence before
            your real test begins.
          </p>
        </header>

        <div className="mt-9 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {PRACTICE_CARDS.map((card) => (
            <PlacementStepCard
              key={card.step}
              variant="practice"
              step={card.step}
              icon={card.icon}
              title={card.title}
              description={card.description}
              footer={card.footer}
            />
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <Button
            label="Start Training"
            type="button"
            width="w-full max-w-[238px]"
            height="h-[52px]"
            bgColorClass="bg-[#df0012] hover:brightness-110 active:brightness-95"
            textColorClass="text-primary"
            className="rounded-[8px] text-[18px] font-bold shadow-[0_8px_18px_rgba(223,0,18,0.2)]"
            onClick={goToTrainingMcqPractice}
          />
        </div>
      </div>
    </section>
  );
};

export default TrainingPractice;
