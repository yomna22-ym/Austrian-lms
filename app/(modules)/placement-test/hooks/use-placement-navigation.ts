"use client";

import { useRouter } from "next/navigation";
import { PLACEMENT_TEST_ROUTES } from "@/app/constants/routes";

export function usePlacementNavigation() {
  const router = useRouter();

  return {
    goToCheckout: () => router.push(PLACEMENT_TEST_ROUTES.checkout),
    goToReadyToStart: () => router.push(PLACEMENT_TEST_ROUTES.readyToStart),
    goToLanding: () => router.push(PLACEMENT_TEST_ROUTES.landing),
  };
}
