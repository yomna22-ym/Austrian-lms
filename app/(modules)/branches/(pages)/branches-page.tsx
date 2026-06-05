import HeroSection from "@/app/shared/HeroSection";
import { GlobalPresenceSection, EgyptBranchesSection } from "../components";
import { BRANCHES_HERO, EGYPT_BRANCHES } from "../utils";

export default function BranchesPage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection
        image="/Ibranchhero.png"
        imageAlt="Österreich Institut branches"
        title={BRANCHES_HERO.title}
        desc={BRANCHES_HERO.description}
      />
      <GlobalPresenceSection />
      <EgyptBranchesSection branches={EGYPT_BRANCHES} />
    </div>
  );
}
