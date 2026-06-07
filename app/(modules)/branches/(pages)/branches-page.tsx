import { GlobalPresenceSection, EgyptBranchesSection } from "../components";
import { EGYPT_BRANCHES } from "../utils";

export default function BranchesPage() {
  return (
    <div className="flex w-full flex-col">
      <GlobalPresenceSection />
      <EgyptBranchesSection branches={EGYPT_BRANCHES} />
    </div>
  );
}
