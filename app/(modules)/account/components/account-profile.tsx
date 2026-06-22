"use client";

import { AlertTriangle, RefreshCw, UserRound } from "lucide-react";
import Button from "@/app/shared/Button/Button";
import type { StudentProfile, WebhookUser } from "@/types/api";

interface AccountProfileProps {
  user: WebhookUser;
  isStudent: boolean;
  hasStudentProfile: boolean;
  studentProfile?: StudentProfile;
  refreshingProfile: boolean;
  onRefreshProfile: () => void;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
        {label}
      </span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

export function AccountProfile({
  user,
  isStudent,
  hasStudentProfile,
  studentProfile,
  refreshingProfile,
  onRefreshProfile,
}: AccountProfileProps) {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <section className="rounded-[12px] border border-input-border bg-white p-6 shadow-[0_4px_16px_rgba(17,19,21,0.04)]">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-secondary/10 text-base font-bold text-secondary">
          {initials || <UserRound className="h-6 w-6" aria-hidden="true" />}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-text-primary">{user.fullName}</h1>
          <p className="mt-1 text-sm text-text-secondary">{user.email}</p>
        </div>
      </div>

      {isStudent && !hasStudentProfile && (
        <div className="mt-5 flex flex-col gap-3 rounded-[8px] border border-amber-200 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              Your student profile is still being set up. Refresh your account or
              log out and back in.
            </p>
          </div>
          <Button
            label={refreshingProfile ? "Refreshing…" : "Refresh"}
            type="button"
            width="w-full sm:w-[120px]"
            height="h-[40px]"
            bgColorClass="bg-white border border-amber-300 hover:bg-amber-100"
            textColorClass="text-amber-900"
            className="rounded-[8px] text-sm font-semibold"
            icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
            disabled={refreshingProfile}
            onClick={onRefreshProfile}
          />
        </div>
      )}

      <div className="mt-6 space-y-4 border-t border-input-border pt-5">
        <InfoRow label="Role" value={user.roleName} />
        {user.phone ? <InfoRow label="Phone" value={user.phone} /> : null}
        {studentProfile ? (
          <>
            <InfoRow label="Student code" value={studentProfile.studentCode} />
            {studentProfile.placementLevelId ? (
              <InfoRow
                label="Placement level"
                value={studentProfile.placementLevelId}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
