import PolicyDocument from "./PolicyDocument";
import { privacyContent } from "./policy-content";

export default function PrivacyPolicy() {
  return <PolicyDocument content={privacyContent} />;
}
