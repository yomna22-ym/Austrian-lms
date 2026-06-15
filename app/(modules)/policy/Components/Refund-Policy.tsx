import PolicyDocument from "./PolicyDocument";
import { refundContent } from "./policy-content";

export default function RefundPolicy() {
  return <PolicyDocument content={refundContent} />;
}
