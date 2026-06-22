"use client";

import { AuthGate } from "@/app/(modules)/auth/components/auth-gate";
import { ACCOUNT_ROUTES, AUTH_ROUTES } from "@/app/constants/routes";
import { AccountPlacementCard } from "../components/account-placement-card";
import { AccountProfile } from "../components/account-profile";
import { useAccountData } from "../hooks/use-account-data";

function AccountContent() {
  const {
    user,
    isStudent,
    hasStudentProfile,
    studentProfile,
    placementStatus,
    placementLoading,
    placementError,
    refreshingProfile,
    refreshProfile,
  } = useAccountData();

  if (!user) {
    return null;
  }

  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#fafafa] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-[760px] flex-col gap-6">
        <header>
          <h1 className="text-3xl font-bold text-text-primary">My account</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Manage your profile and placement test progress.
          </p>
        </header>

        <AccountProfile
          user={user}
          isStudent={isStudent}
          hasStudentProfile={hasStudentProfile}
          studentProfile={studentProfile}
          refreshingProfile={refreshingProfile}
          onRefreshProfile={() => void refreshProfile()}
        />

        {isStudent ? (
          <AccountPlacementCard
            status={placementStatus}
            loading={placementLoading}
            error={placementError}
          />
        ) : null}
      </div>
    </section>
  );
}

export default function AccountPage() {
  return (
    <AuthGate
      redirectTo={`${AUTH_ROUTES.login}?returnUrl=${encodeURIComponent(ACCOUNT_ROUTES.profile)}`}
    >
      <AccountContent />
    </AuthGate>
  );
}
