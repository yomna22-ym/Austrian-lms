"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/shared/Button/Button";
import { AUTH_ROUTES } from "@/app/constants/routes";
import { NavbarPlacementButton } from "./navbar-placement-button";

const secondaryAuthClass =
  "border border-input-border hover:bg-input-border/80 active:translate-y-0";

export function NavbarAuthActions() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2.5">
      <Button
        label="Log in"
        bgColorClass="bg-input-bg hover:bg-input-border/60 border border-transparent"
        textColorClass="text-secondary"
        width="w-auto min-w-[88px] px-4"
        height="h-[44px]"
        className={secondaryAuthClass}
        type="button"
        onClick={() => router.push(AUTH_ROUTES.login)}
      />
      <Button
        label="Sign up"
        bgColorClass="bg-input-bg hover:bg-input-border/80"
        textColorClass="text-secondary"
        width="w-auto min-w-[88px] px-4"
        height="h-[44px]"
        className={`shadow-[0_1px_0_rgba(0,0,0,0.04)] ${secondaryAuthClass}`}
        type="button"
        onClick={() => router.push(AUTH_ROUTES.signup)}
      />
      <NavbarPlacementButton />
    </div>
  );
}

export function NavbarAuthSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-[44px] w-[280px] animate-pulse rounded-[10px] bg-input-bg xl:h-[51px] xl:w-[320px]"
    />
  );
}
