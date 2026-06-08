"use client";

import { useState } from "react";
import PageIntro from "@/app/shared/PageIntro";
import {
  BranchCoursesTable,
  GlobalPresenceSection,
  EgyptBranchesSection,
} from "../components";
import { BRANCHES_HERO, EGYPT_BRANCHES } from "../utils";

export default function BranchesPage() {
  const [selectedBranchId, setSelectedBranchId] = useState("heliopolis");

  return (
    <div className="flex w-full flex-col">
      <PageIntro
        title={BRANCHES_HERO.title}
        description={BRANCHES_HERO.description}
      />
      <GlobalPresenceSection />
      <EgyptBranchesSection
        branches={EGYPT_BRANCHES}
        selectedBranchId={selectedBranchId}
        onBranchSelect={setSelectedBranchId}
      />
      <BranchCoursesTable
        branches={EGYPT_BRANCHES}
        selectedBranchId={selectedBranchId}
        onBranchSelect={setSelectedBranchId}
      />
    </div>
  );
}
