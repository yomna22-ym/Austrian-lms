"use client";

import { useRouter } from "next/navigation";
import { HOME_ROUTE, PLACEMENT_TEST_ROUTES } from "@/app/constants/routes";

export function usePlacementNavigation() {
  const router = useRouter();

  return {
    goToCheckout: () => router.push(PLACEMENT_TEST_ROUTES.checkout),
    goToReadyToStart: () => router.push(PLACEMENT_TEST_ROUTES.readyToStart),
    goToTraining: () => router.push(PLACEMENT_TEST_ROUTES.training),
    goToTrainingMcqPractice: () =>
      router.push(PLACEMENT_TEST_ROUTES.trainingMcqPractice),
    goToLanding: () => router.push(PLACEMENT_TEST_ROUTES.landing),
    goToHome: () => router.push(HOME_ROUTE),
  };
}
