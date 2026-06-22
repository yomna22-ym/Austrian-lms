"use client";

import { useState } from "react";
import PageIntro from "@/app/shared/PageIntro";
import {
  BranchCoursesTable,
  EgyptBranchesSection,
  GlobalPresenceSection,
} from "../components";
import type { BranchesPageData } from "../utils/branches.loader";

interface BranchesPageClientProps {
  data: BranchesPageData;
}

export default function BranchesPageClient({ data }: BranchesPageClientProps) {
  const [selectedBranchId, setSelectedBranchId] = useState(
    data.localBranches[0]?.id ?? "",
  );

  return (
    <div className="flex w-full flex-col overflow-hidden bg-white">
      <PageIntro
        eyebrow="Branches"
        title={data.intro.title}
        description={data.intro.description}
      />
      <GlobalPresenceSection locations={data.globalLocations} />
      <EgyptBranchesSection
        copy={data.egyptCopy}
        branches={data.localBranches}
        selectedBranchId={selectedBranchId}
        onBranchSelect={setSelectedBranchId}
      />
      {data.localBranches.length > 0 ? (
        <BranchCoursesTable
          branches={data.localBranches}
          selectedBranchId={selectedBranchId}
          onBranchSelect={setSelectedBranchId}
        />
      ) : null}
    </div>
  );
}
