import { AuthGate } from "@/app/(modules)/auth/components/auth-gate";
import { AUTH_ROUTES, PLACEMENT_TEST_ROUTES } from "@/app/constants/routes";
import { TrainingMcqPractice } from "../../../Components";

export default function PlacementTestTrainingMcqPracticePage() {
  return (
    <AuthGate
      redirectTo={`${AUTH_ROUTES.login}?returnUrl=${encodeURIComponent(PLACEMENT_TEST_ROUTES.trainingMcqPractice)}`}
    >
      <TrainingMcqPractice />
    </AuthGate>
  );
}
