"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import Button from "@/app/shared/Button/Button";
import Link from "next/link";
import {
  ACCOUNT_ROUTES,
  AUTH_ROUTES,
  PLACEMENT_TEST_ROUTES,
} from "@/app/constants/routes";
import { useRouter } from "next/navigation";
import { hasStudentProfile } from "@/lib/auth/profile";
import { useAuthStore, type AuthState } from "@/stores/auth.store";
import type { PlacementAttemptStatus, PlacementCompletedForm } from "@/types/placement";
import { placementTestService } from "../services/placement-test.service";

const LEVEL_ORDER = [
  "A1.1", "A1.2", "A2.1", "A2.2",
  "B1.1", "B1.2", "B2.1", "B2.2",
] as const;

function FormRow({ form }: { form: PlacementCompletedForm }) {
  const isTest = form.formType === "test";
  const passed = form.passed;

  return (
    <div className="flex items-center justify-between gap-3 rounded-[8px] border border-input-border bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        {isTest ? (
          passed ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
          ) : (
            <XCircle className="h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
          )
        ) : (
          <FileText className="h-5 w-5 shrink-0 text-text-secondary" aria-hidden="true" />
        )}
        <span className="text-sm font-semibold text-text-primary">
          {form.levelKey} — {isTest ? "Test" : "Writing"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-text-secondary">{form.scoreRaw}</span>
        {isTest && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              passed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {passed ? "PASS" : "FAIL"}
          </span>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ completedForms }: { completedForms: PlacementCompletedForm[] }) {
  const completedLevels = new Set(completedForms.map((f) => f.levelKey));
  return (
    <div className="flex items-center gap-1">
      {LEVEL_ORDER.map((level, idx) => {
        const done = completedLevels.has(level);
        return (
          <div key={level} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`h-1.5 w-full rounded-full transition-colors ${
                done ? "bg-secondary" : "bg-input-border"
              }`}
            />
            <span
              className={`hidden text-[10px] font-medium sm:block ${
                done ? "text-secondary" : "text-text-secondary"
              }`}
            >
              {level}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function PlacementContinue() {
  const router = useRouter();
  const refreshUser = useAuthStore((state: AuthState) => state.refreshUser);
  const [status, setStatus] = useState<PlacementAttemptStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadStatus = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!options?.silent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);

      try {
        const nextStatus = await placementTestService.getCurrent();
        setStatus(nextStatus);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to load placement status";
        if (msg.includes("401") || msg.includes("Not authenticated")) {
          router.replace(
            `${AUTH_ROUTES.login}?returnUrl=${encodeURIComponent(PLACEMENT_TEST_ROUTES.continue)}`,
          );
        } else if (msg.includes("404") || msg.includes("No placement attempt")) {
          router.replace(PLACEMENT_TEST_ROUTES.training);
        } else {
          setError(msg);
        }
      } finally {
        if (!options?.silent) {
          setLoading(false);
        } else {
          setRefreshing(false);
        }
      }
    },
    [router],
  );

  useEffect(() => {
    const prepare = async () => {
      const user = await refreshUser();
      setProfileReady(Boolean(user && hasStudentProfile(user)));
      setProfileChecked(true);
    };

    void prepare();
  }, [refreshUser]);

  useEffect(() => {
    if (!profileChecked || !profileReady) {
      return;
    }

    void loadStatus();
  }, [profileChecked, profileReady, loadStatus]);

  useEffect(() => {
    if (!profileReady || !status || status.isComplete) {
      return;
    }

    const poll = () => {
      if (document.visibilityState === "visible") {
        void loadStatus({ silent: true });
      }
    };

    const intervalId = window.setInterval(poll, 10_000);
    return () => window.clearInterval(intervalId);
  }, [profileReady, status, loadStatus]);

  const handleContinueToForm = () => {
    if (!status?.nextForm?.url) return;
    setRedirecting(true);
    window.open(status.nextForm.url, "_blank", "noopener,noreferrer");
    setRedirecting(false);
  };

  if (!profileChecked || (profileReady && loading)) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" aria-label="Loading" />
      </div>
    );
  }

  if (!profileReady) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="max-w-[420px] text-sm text-text-secondary">
          Your student profile is not ready yet. Visit your account page and
          refresh, or log out and back in.
        </p>
        <Link
          href={ACCOUNT_ROUTES.profile}
          className="text-sm font-semibold text-secondary underline"
        >
          Go to my account
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <Button
          label="Back to Training"
          type="button"
          onClick={() => router.push(PLACEMENT_TEST_ROUTES.training)}
          width="w-[180px]"
          height="h-[44px]"
          bgColorClass="bg-secondary hover:brightness-110"
          textColorClass="text-primary"
          className="rounded-[8px] text-sm font-semibold"
        />
      </div>
    );
  }

  if (!status) return null;

  if (status.isComplete) {
    return (
      <section className="min-h-[calc(100vh-72px)] bg-white px-5 pb-14 pt-10">
        <div className="mx-auto max-w-[640px] text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">
            Placement Test Complete
          </h1>
          <p className="mx-auto mt-4 max-w-[440px] text-sm leading-relaxed text-text-secondary">
            Your results have been recorded. Your instructor will contact you
            shortly with your assigned level and next steps.
          </p>
          {status.highestPassedLevelKey && (
            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
              <span className="text-sm font-semibold text-green-700">
                Highest level passed: {status.highestPassedLevelKey}
              </span>
            </div>
          )}

          {status.completedForms.length > 0 && (
            <div className="mt-8 space-y-2 text-left">
              <h2 className="text-sm font-semibold text-text-secondary">
                Your submissions
              </h2>
              {status.completedForms.map((form) => (
                <FormRow key={form.formId} form={form} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-72px)] bg-white px-5 pb-14 pt-10">
      <div className="mx-auto max-w-[640px]">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            {status.completedForms.length === 0
              ? "Your Placement Test"
              : "Continue Your Placement Test"}
          </h1>
          <p className="mx-auto mt-3 max-w-[460px] text-sm leading-relaxed text-text-secondary">
            {status.completedForms.length === 0
              ? "Open the A1.1 test in a new tab. After you submit, return here and refresh to continue."
              : "After submitting each form, return here and refresh to see your latest result and next step."}
          </p>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => void loadStatus({ silent: true })}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-[8px] border border-input-border px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-input-bg disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              {refreshing ? "Refreshing…" : "Refresh status"}
            </button>
          </div>
        </header>

        <div className="mt-8">
          <ProgressBar completedForms={status.completedForms} />
        </div>

        {status.nextForm && (
          <div className="mt-8 rounded-[12px] border border-input-border bg-[#fafafa] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Next Step
                </p>
                <p className="mt-1 text-lg font-bold text-text-primary">
                  {status.nextForm.levelKey} — {status.nextForm.formType === "test" ? "Test" : "Writing"}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  The assessment form opens in a new tab. Return here when
                  you&apos;re done.
                </p>
              </div>
              <Clock3 className="h-6 w-6 shrink-0 text-secondary" aria-hidden="true" />
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                label={redirecting ? "Opening form…" : "Open Form in New Tab"}
                type="button"
                width="w-full sm:w-auto sm:min-w-[200px]"
                height="h-[48px]"
                bgColorClass="bg-secondary hover:brightness-110 disabled:opacity-60"
                textColorClass="text-primary"
                className="rounded-[8px] text-sm font-bold"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                iconPosition="right"
                onClick={handleContinueToForm}
                disabled={redirecting}
              />
            </div>
          </div>
        )}

        {status.completedForms.length > 0 && (
          <div className="mt-8 space-y-2">
            <h2 className="text-sm font-semibold text-text-secondary">
              Completed forms
            </h2>
            {status.completedForms.map((form) => (
              <FormRow key={form.formId} form={form} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
