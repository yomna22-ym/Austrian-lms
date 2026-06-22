import { AuthGate } from "@/app/(modules)/auth/components/auth-gate";
import { PlacementContinue } from "../../Components/placement-continue";
import { PLACEMENT_TEST_ROUTES } from "@/app/constants/routes";
import { AUTH_ROUTES } from "@/app/constants/routes";

export default function PlacementContinuePage() {
  return (
    <AuthGate
      redirectTo={`${AUTH_ROUTES.login}?returnUrl=${encodeURIComponent(PLACEMENT_TEST_ROUTES.continue)}`}
    >
      <PlacementContinue />
    </AuthGate>
  );
}
