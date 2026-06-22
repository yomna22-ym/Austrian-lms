"use client";

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/app/shared/Button/Button";
import { PLACEMENT_TEST_ROUTES } from "@/app/constants/routes";
import type { PlacementAttemptStatus } from "@/types/placement";

interface AccountPlacementCardProps {
  status: PlacementAttemptStatus | null;
  loading: boolean;
  error: string | null;
}

export function AccountPlacementCard({
  status,
  loading,
  error,
}: AccountPlacementCardProps) {
  const router = useRouter();

  if (loading) {
    return (
      <section className="flex min-h-[180px] items-center justify-center rounded-[12px] border border-input-border bg-white p-6">
        <Loader2 className="h-6 w-6 animate-spin text-secondary" aria-label="Loading placement status" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-[12px] border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-700">{error}</p>
      </section>
    );
  }

  if (!status) {
    return (
      <section className="rounded-[12px] border border-input-border bg-white p-6 shadow-[0_4px_16px_rgba(17,19,21,0.04)]">
        <h2 className="text-lg font-bold text-text-primary">Placement test</h2>
        <p className="mt-2 text-sm text-text-secondary">
          You have not started your official placement test yet.
        </p>
        <div className="mt-5">
          <Button
            label="Start placement test"
            type="button"
            width="w-full sm:w-[220px]"
            height="h-[46px]"
            bgColorClass="bg-secondary hover:brightness-110"
            textColorClass="text-primary"
            className="rounded-[8px] text-sm font-bold"
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            iconPosition="right"
            onClick={() => router.push(PLACEMENT_TEST_ROUTES.training)}
          />
        </div>
      </section>
    );
  }

  if (status.isComplete) {
    return (
      <section className="rounded-[12px] border border-green-200 bg-green-50 p-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-green-800">Placement complete</h2>
        </div>
        <p className="mt-2 text-sm text-green-900">
          {status.highestPassedLevelKey
            ? `Highest level passed: ${status.highestPassedLevelKey}`
            : "Your placement test has been completed."}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[12px] border border-input-border bg-white p-6 shadow-[0_4px_16px_rgba(17,19,21,0.04)]">
      <h2 className="text-lg font-bold text-text-primary">Placement in progress</h2>
      <p className="mt-2 text-sm text-text-secondary">
        {status.completedForms.length} form
        {status.completedForms.length === 1 ? "" : "s"} completed.
        {status.nextForm
          ? ` Next: ${status.nextForm.levelKey} ${status.nextForm.formType}.`
          : ""}
      </p>
      {status.completedForms.length > 0 ? (
        <ul className="mt-3 space-y-1 text-xs text-text-secondary">
          {status.completedForms.slice(-3).map((form) => (
            <li key={form.formId}>
              {form.levelKey} {form.formType}: {form.scoreRaw}
              {form.formType === "test" && form.passed !== undefined
                ? form.passed
                  ? " (pass)"
                  : " (fail)"
                : ""}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-5">
        <Button
          label="Continue placement test"
          type="button"
          width="w-full sm:w-[240px]"
          height="h-[46px]"
          bgColorClass="bg-secondary hover:brightness-110"
          textColorClass="text-primary"
          className="rounded-[8px] text-sm font-bold"
          icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          iconPosition="right"
          onClick={() => router.push(PLACEMENT_TEST_ROUTES.continue)}
        />
      </div>
    </section>
  );
}
