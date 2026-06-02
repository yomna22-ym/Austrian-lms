"use client";

import React from "react";
import StepChip, { type StepStatus } from "./StepChip";

export interface RoadmapStep {
  step: number;
  title: string;
  sub: string;
}

interface ProcessRoadmapProps {
  steps: readonly RoadmapStep[];
  /** 1-based. Steps before currentStep are completed; this one is current; after are upcoming. */
  currentStep?: number;
}

function getStatus(stepNumber: number, currentStep: number): StepStatus {
  if (stepNumber < currentStep) return "completed";
  if (stepNumber === currentStep) return "current";
  return "upcoming";
}

function connectorClass(index: number, currentStep: number): string {
  if (index < currentStep - 1) return "bg-secondary";
  if (index === currentStep - 1)
    return "bg-linear-to-r from-secondary via-secondary/60 to-input-border";
  return "bg-input-border";
}

const ProcessRoadmap: React.FC<ProcessRoadmapProps> = ({
  steps,
  currentStep = 2,
}) => {
  return (
    <div className="w-full">
      <h3 className="mb-5 text-center text-sm font-bold text-text-primary sm:mb-6 sm:text-left sm:text-base">
        Process Roadmap
      </h3>

      {/*
        Layout: flex row so the connector sits inline between chips.
        Each chip is a fixed-width column; connectors fill remaining space.
        This avoids absolute positioning and works at any viewport width.
      */}
      <ol
        className="flex w-full items-start"
        aria-label="Placement test process"
      >
        {steps.map((item, index) => (
          <React.Fragment key={item.step}>
            {/* Step chip — fixed width so text never overflows */}
            <li
              className="flex shrink-0 flex-col items-center gap-2 text-center"
              style={{
                width: "clamp(64px, calc(100% / 4.5), 120px)",
                animation: `roadmap-fade-in 0.45s ease-out ${index * 0.1}s both`,
              }}
            >
              <StepChip
                step={item.step}
                title={item.title}
                sub={item.sub}
                status={getStatus(item.step, currentStep)}
              />
            </li>

            {/* Inline connector — grows to fill space between chips */}
            {index < steps.length - 1 && (
              <div
                className="mt-5 min-w-[8px] flex-1 -translate-y-1/2 self-start px-1"
                aria-hidden="true"
              >
                <span
                  className={[
                    "block h-0.5 w-full rounded-full transition-colors duration-500",
                    connectorClass(index, currentStep),
                  ].join(" ")}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};

export default ProcessRoadmap;
