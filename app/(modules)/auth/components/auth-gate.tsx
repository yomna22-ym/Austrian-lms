"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/app/constants/routes";
import { useAuthStore } from "@/stores/auth.store";

export function AuthGate({
  children,
  redirectTo = AUTH_ROUTES.login,
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const { hydrated, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [hydrated, isAuthenticated, redirectTo, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-secondary">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
