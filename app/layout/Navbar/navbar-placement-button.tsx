"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/shared/Button/Button";
import { WEBSITE_ROUTES } from "@/app/constants/routes";

interface NavbarPlacementButtonProps {
  fullWidth?: boolean;
  onNavigate?: () => void;
}

const placementButtonClass =
  "shadow-sm hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:brightness-95 active:shadow-sm";

export function NavbarPlacementButton({
  fullWidth = false,
  onNavigate,
}: NavbarPlacementButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    onNavigate?.();
    router.push(WEBSITE_ROUTES.placementTest);
  };

  if (fullWidth) {
    return (
      <Button
        label="Take Placement Test"
        bgColorClass="bg-secondary hover:brightness-110"
        textColorClass="text-primary"
        width="w-full"
        height="h-[44px]"
        className={placementButtonClass}
        type="button"
        onClick={handleClick}
      />
    );
  }

  return (
    <>
      <Button
        label="Placement Test"
        bgColorClass="bg-secondary hover:brightness-110"
        textColorClass="text-primary"
        width="w-auto min-w-[140px]"
        height="h-[44px]"
        className={`xl:hidden ${placementButtonClass}`}
        type="button"
        onClick={handleClick}
      />
      <Button
        label="Take Placement Test"
        bgColorClass="bg-secondary hover:brightness-110"
        textColorClass="text-primary"
        width="w-[185px]"
        height="h-[51px]"
        className={`hidden xl:inline-flex ${placementButtonClass}`}
        type="button"
        onClick={handleClick}
      />
    </>
  );
}
