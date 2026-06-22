"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ExternalLink,
  GraduationCap,
  LogOut,
  UserRound,
} from "lucide-react";
import { ACCOUNT_ROUTES } from "@/app/constants/routes";
import { shouldShowStudentPortalLink } from "@/lib/auth/portal-access";
import { getStudentPortalUrl } from "@/lib/portal-url";
import type { WebhookUser } from "@/types/api";

interface NavbarAccountMenuProps {
  user: WebhookUser;
  isLoggingOut: boolean;
  onClose: () => void;
  onLogout: () => void;
  variant?: "dropdown" | "mobile";
}

function MenuIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-secondary/[0.08] text-secondary"
    >
      <Icon size={18} strokeWidth={2} />
    </span>
  );
}

function menuItemBase(variant: "dropdown" | "mobile") {
  return [
    "group flex w-full min-h-[44px] items-center gap-3 rounded-[10px] px-2.5 py-2 text-left transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
    variant === "dropdown"
      ? "hover:bg-[#f7f7f7] active:bg-[#f0f0f0]"
      : "border border-input-border bg-white hover:bg-input-bg active:bg-input-border/40",
  ].join(" ");
}

export function NavbarAccountMenu({
  user,
  isLoggingOut,
  onClose,
  onLogout,
  variant = "dropdown",
}: NavbarAccountMenuProps) {
  const portalUrl = getStudentPortalUrl();
  const showStudentPortal = shouldShowStudentPortalLink(user);
  const isDropdown = variant === "dropdown";

  const labelClass = "text-sm font-semibold text-text-primary";
  const hintClass = "text-xs text-text-secondary";

  const menuShellClass = isDropdown
    ? "nav-dropdown-in overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white p-1.5 shadow-[0_20px_48px_rgba(17,19,21,0.14),0_4px_12px_rgba(17,19,21,0.06)]"
    : "flex flex-col gap-2";

  const content = (
    <>
      <div className={isDropdown ? "space-y-0.5" : "flex flex-col gap-2"}>
        {showStudentPortal && portalUrl ? (
          <a
            role="menuitem"
            href={portalUrl}
            className={menuItemBase(variant)}
            onClick={onClose}
          >
            <MenuIcon icon={GraduationCap} />
            <span className="min-w-0 flex-1">
              <span className={labelClass}>Go Student portal</span>
              <span className={`mt-0.5 block ${hintClass}`}>
                Open your LMS dashboard
              </span>
            </span>
            <ExternalLink
              size={16}
              aria-hidden="true"
              className="shrink-0 text-text-secondary opacity-70 transition-opacity group-hover:opacity-100"
            />
          </a>
        ) : null}

        <Link
          role="menuitem"
          href={ACCOUNT_ROUTES.profile}
          className={menuItemBase(variant)}
          onClick={onClose}
        >
          <MenuIcon icon={UserRound} />
          <span className="min-w-0 flex-1">
            <span className={labelClass}>My account</span>
            <span className={`mt-0.5 block ${hintClass}`}>
              Profile & placement progress
            </span>
          </span>
        </Link>
      </div>

      <div
        className={
          isDropdown
            ? "mt-1.5 border-t border-input-border pt-1.5"
            : "mt-1 border-t border-input-border pt-2"
        }
      >
        <button
          type="button"
          role="menuitem"
          disabled={isLoggingOut}
          className={[
            menuItemBase(variant),
            "text-secondary hover:bg-[#fff3f3] active:bg-[#ffeaea] disabled:opacity-50",
          ].join(" ")}
          onClick={() => {
            onClose();
            onLogout();
          }}
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-secondary/[0.08] text-secondary"
          >
            <LogOut size={18} strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className={labelClass}>
              {isLoggingOut ? "Logging out…" : "Log out"}
            </span>
            <span className={`mt-0.5 block ${hintClass}`}>
              Sign out of this site
            </span>
          </span>
        </button>
      </div>
    </>
  );

  if (isDropdown) {
    return <div className={menuShellClass}>{content}</div>;
  }

  return <div className={menuShellClass}>{content}</div>;
}
