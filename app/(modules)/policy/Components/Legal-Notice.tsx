import PolicyDocument from "./PolicyDocument";
import { legalNoticeContent } from "./policy-content";

export default function LegalNotice() {
  return <PolicyDocument content={legalNoticeContent} />;
}
