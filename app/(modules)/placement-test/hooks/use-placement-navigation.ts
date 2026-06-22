"use client";

import { useRouter } from "next/navigation";
import { HOME_ROUTE, PLACEMENT_TEST_ROUTES } from "@/app/constants/routes";

export function usePlacementNavigation() {
  const router = useRouter();

  return {
    goToCheckout: () => router.push(PLACEMENT_TEST_ROUTES.checkout),
    goToTraining: () => router.push(PLACEMENT_TEST_ROUTES.training),
    goToTrainingMcqPractice: () =>
      router.push(PLACEMENT_TEST_ROUTES.trainingMcqPractice),
    goToLanding: () => router.push(PLACEMENT_TEST_ROUTES.landing),
    goToContinue: () => router.push(PLACEMENT_TEST_ROUTES.continue),
    goToHome: () => router.push(HOME_ROUTE),
  };
}
