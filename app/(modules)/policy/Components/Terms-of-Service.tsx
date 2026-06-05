import PolicyDocument from "./PolicyDocument";
import { termsContent } from "./policy-content";

export default function TermsOfService() {
  return <PolicyDocument content={termsContent} />;
}
