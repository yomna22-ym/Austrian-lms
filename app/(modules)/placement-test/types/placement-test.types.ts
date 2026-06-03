import type { ReactNode } from "react";

export type StepStatus = "completed" | "current" | "upcoming";

export interface InfoPillData {
  icon: ReactNode;
  label: string;
  sub: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  sub: string;
}

export interface SummaryLine {
  label: string;
  value: string;
  free?: boolean;
}
