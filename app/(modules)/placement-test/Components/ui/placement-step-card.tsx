"use client";

import React from "react";

const CARD_SHELL =
  "group relative flex flex-col overflow-hidden border border-input-border bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_18px_45px_rgba(185,19,23,0.14)]";

const CardHoverAccent = () => (
  <span
    className="absolute inset-x-0 top-0 h-[3px] bg-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    aria-hidden="true"
  />
);

interface BaseProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  className?: string;
}

export interface RoadmapStepCardProps extends BaseProps {
  variant: "roadmap";
  description: string;
  animationDelay?: string;
}

export interface PracticeStepCardProps extends BaseProps {
  variant: "practice";
  description: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export type PlacementStepCardProps = RoadmapStepCardProps | PracticeStepCardProps;

const RoadmapStepCard: React.FC<RoadmapStepCardProps> = ({
  step,
  icon,
  title,
  description,
  animationDelay = "0s",
  className = "",
}) => (
  <article
    className={[
      CARD_SHELL,
      "w-full max-w-sm items-center gap-4 rounded-2xl px-4 pb-6 pt-8 text-center shadow-sm min-[480px]:max-w-none sm:gap-5 sm:px-6 sm:pb-8 sm:pt-10",
      className,
    ].join(" ")}
    style={{ animation: `roadmap-fade-in 0.5s ease-out ${animationDelay} both` }}
  >
    <CardHoverAccent />

    <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-[6px] bg-secondary/10 text-[10px] font-bold text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
      {step}
    </span>

    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/8 ring-1 ring-secondary/15 transition-all duration-300 group-hover:bg-secondary/15 group-hover:ring-secondary/30">
      <span className="absolute inset-0 rounded-2xl bg-secondary opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30" />
      <span className="relative z-10 text-secondary">{icon}</span>
    </div>

    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-secondary/70">
        Step {step}
      </p>
      <h3 className="text-lg font-bold text-text-primary">{title}</h3>
    </div>

    <p className="max-w-[220px] text-sm leading-relaxed text-text-secondary">
      {description}
    </p>
  </article>
);

const PracticeStepCard: React.FC<PracticeStepCardProps> = ({
  step,
  icon,
  title,
  description,
  footer,
  children,
  className = "",
}) => (
  <article
    className={[
      CARD_SHELL,
      "h-full min-h-[382px] rounded-[10px] px-5 pb-5 pt-6 text-center shadow-[0_8px_22px_rgba(17,19,21,0.06)]",
      className,
    ].join(" ")}
  >
    <CardHoverAccent />

    <div className="flex flex-1 flex-col items-center">
      <div className="relative mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-secondary/10 text-secondary ring-1 ring-secondary/10 transition-all duration-300 group-hover:bg-secondary/15 group-hover:ring-secondary/25">
        <span className="absolute inset-0 rounded-full bg-secondary opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-25" />
        <span className="relative z-10">{icon}</span>
      </div>

      <p className="mb-3 text-[14px] font-bold uppercase leading-none text-[#df0012]">
        Step {step}
      </p>
      <h2 className="mb-3 text-[21px] font-bold leading-tight text-black">
        {title}
      </h2>
      <span className="mb-5 h-[2px] w-9 bg-[#df0012] transition-colors duration-300 group-hover:bg-secondary" aria-hidden="true" />
      <p className="mb-4 max-w-[230px] text-[14px] font-normal leading-[1.45] text-black">
        {description}
      </p>

      {children}
    </div>

    {footer ? (
      <div className="mt-auto flex min-h-[52px] items-center justify-center rounded-[6px] bg-[#ededed] px-4 text-[12px] font-medium text-black">
        {footer}
      </div>
    ) : null}
  </article>
);

const PlacementStepCard: React.FC<PlacementStepCardProps> = (props) => {
  if (props.variant === "roadmap") {
    return <RoadmapStepCard {...props} />;
  }
  return <PracticeStepCard {...props} />;
};

export default PlacementStepCard;
