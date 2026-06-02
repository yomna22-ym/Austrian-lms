import React from "react";

export type StepStatus = "completed" | "current" | "upcoming";

export interface StepChipProps {
  step: number;
  title: string;
  sub: string;
  status: StepStatus;
}

const INDICATOR_BASE =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] text-sm font-bold " +
  "transition-all duration-300 ease-out";

const statusStyles: Record<StepStatus, string> = {
  completed:
    "bg-secondary text-primary border border-secondary shadow-sm scale-100",
  current:
    "border-2 border-secondary bg-white text-text-primary " +
    "shadow-[0_0_0_4px_rgba(185,19,23,0.14)] scale-105 animate-step-glow",
  upcoming:
    "border border-input-border bg-[#F5F5F5] text-text-secondary scale-100",
};

const StepChip: React.FC<StepChipProps> = ({ step, title, sub, status }) => (
  <div className="flex w-full flex-col items-center gap-2 text-center">
    <span
      className={[INDICATOR_BASE, statusStyles[status]].join(" ")}
      aria-current={status === "current" ? "step" : undefined}
    >
      {step}
    </span>
    <div className="flex w-full flex-col gap-0.5 overflow-hidden px-0.5">
      <span
        className={[
          "truncate text-[11px] font-semibold leading-tight transition-colors duration-300 sm:text-xs sm:whitespace-normal sm:overflow-visible",
          status === "upcoming" ? "text-text-secondary" : "text-text-primary",
        ].join(" ")}
      >
        {title}
      </span>
      <span className="hidden text-[10px] leading-snug text-text-secondary sm:block sm:text-[11px]">
        {sub}
      </span>
    </div>
  </div>
);

export default StepChip;
