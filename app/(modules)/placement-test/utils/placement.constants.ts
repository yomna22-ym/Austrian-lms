import type { RoadmapStep, SummaryLine } from "../types";

export const PLACEMENT_INFO_PILLS = [
  { label: "45-60 min", sub: "Estimated duration", iconKey: "clock" as const },
  {
    label: "Listening & Reading",
    sub: "Adaptive questioning",
    iconKey: "book" as const,
  },
] as const;

export const PLACEMENT_ROADMAP_STEPS: readonly RoadmapStep[] = [
  { step: 1, title: "Confirm Details", sub: "Verify your profile & location" },
  { step: 2, title: "Secure Payment", sub: "Instant digital processing" },
  { step: 3, title: "Start Test", sub: "Get results immediately" },
] as const;

export const PLACEMENT_CHECKOUT_SUMMARY: readonly SummaryLine[] = [
  { label: "Standard Assessment", value: "3,000 EGP" },
  { label: "Registration Fee", value: "0.00 EGP", free: true },
] as const;

export const PLACEMENT_CHECKOUT_TOTAL = "3,000 EGP";
