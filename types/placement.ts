export interface PlacementCompletedForm {
  formId: string;
  levelKey: string;
  formType: "test" | "writing";
  scoreRaw: string;
  passed?: boolean;
}

export interface PlacementNextForm {
  formId: string;
  levelKey: string;
  formType: "test" | "writing";
  /** Full TrueForm URL with sourceApp and sourceUserId query params */
  url: string;
}

export interface PlacementAttemptStatus {
  attemptId: string;
  status: "pending" | "completed";
  highestPassedLevelKey?: string;
  completedForms: PlacementCompletedForm[];
  nextForm?: PlacementNextForm;
  isComplete: boolean;
  resultLevelId?: string;
}
