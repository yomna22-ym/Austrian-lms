import PageIntro from "@/app/shared/PageIntro";
import { GlobalPresenceSection, EgyptBranchesSection } from "../components";
import { BRANCHES_HERO, EGYPT_BRANCHES } from "../utils";

export default function BranchesPage() {
  return (
    <div className="flex w-full flex-col">
      <PageIntro
        title={BRANCHES_HERO.title}
        description={BRANCHES_HERO.description}
      />
      <GlobalPresenceSection />
      <EgyptBranchesSection branches={EGYPT_BRANCHES} />
    </div>
  );
}
