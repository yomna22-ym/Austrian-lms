"use client";

import type { ReactNode } from "react";
import { AUTH_ROUTES } from "@/app/constants/routes";
import Button from "@/app/shared/Button/Button";
import type { WebhookUser } from "@/types/api";
import { NavbarAccountMenu } from "./navbar-account-menu";
import { NavbarPlacementButton } from "./navbar-placement-button";

interface NavbarMobileAuthProps {
  user: WebhookUser | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

function MobileAuthButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <Button
      label={label}
      bgColorClass="bg-input-bg border border-input-border hover:bg-input-border"
      textColorClass="text-text-primary"
      width="w-full"
      height="h-[44px]"
      className="text-sm font-semibold"
      type="button"
      onClick={onClick}
    />
  );
}

export function NavbarMobileAuth({
  user,
  isAuthenticated,
  hydrated,
  isLoggingOut,
  onLogout,
  onClose,
  onNavigate,
}: NavbarMobileAuthProps) {
  if (!hydrated) {
    return (
      <div
        aria-hidden="true"
        className="mt-4 h-[220px] animate-pulse rounded-[12px] bg-input-bg"
      />
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="mt-4 flex flex-col gap-3">
        <NavbarAccountMenu
          user={user}
          isLoggingOut={isLoggingOut}
          onClose={onClose}
          onLogout={onLogout}
          variant="mobile"
        />

        <div className="border-t border-input-border pt-3">
          <NavbarPlacementButton fullWidth onNavigate={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      <MobileAuthButton
        label="Log in"
        onClick={() => {
          onClose();
          onNavigate(AUTH_ROUTES.login);
        }}
      />
      <MobileAuthButton
        label="Sign up"
        onClick={() => {
          onClose();
          onNavigate(AUTH_ROUTES.signup);
        }}
      />
      <NavbarPlacementButton fullWidth onNavigate={onClose} />
    </div>
  );
}
