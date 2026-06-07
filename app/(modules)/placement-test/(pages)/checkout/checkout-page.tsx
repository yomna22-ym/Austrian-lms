import Checkout from "@/app/shared/Checkout/Checkout";
import { PLACEMENT_TEST_ROUTES } from "@/app/constants/routes";
import {
  PLACEMENT_CHECKOUT_SUMMARY,
  PLACEMENT_CHECKOUT_TOTAL,
} from "../../utils";

export default function PlacementTestCheckoutPage() {
  return (
    <Checkout
      successRoute={PLACEMENT_TEST_ROUTES.training}
      item={{
        image: "/AuthHeader.png",
        title: "Placement Test",
        subtitle: "German Language [A1-C1]",
      }}
      summaryLines={PLACEMENT_CHECKOUT_SUMMARY.map((line) => ({
        label: line.label,
        value: line.value,
        free: line.free,
      }))}
      total={PLACEMENT_CHECKOUT_TOTAL}
    />
  );
}
