import Checkout from "@/app/shared/Checkout/Checkout";
import { PLACEMENT_TEST_ROUTES } from "../../constants/routes";

export const metadata = {
  title: "Checkout — Placement Test — Österreich Institut",
};

const PLACEMENT_TEST_SUMMARY = [
  { label: "Standard Assessment", value: "3,000 EGP" },
  { label: "Registration Fee", value: "0.00 EGP", free: true },
];

export default function PlacementTestCheckoutPage() {
  return (
    <Checkout
      successRoute={PLACEMENT_TEST_ROUTES.readyToStart}
      item={{
        image: "/AuthHeader.png",
        title: "Placement Test",
        subtitle: "German Language [A1-C1]",
      }}
      summaryLines={PLACEMENT_TEST_SUMMARY}
      total="3,000 EGP"
    />
  );
}
