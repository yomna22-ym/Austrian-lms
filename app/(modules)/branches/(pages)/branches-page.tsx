import BranchesPageClient from "./branches-page-client";
import { loadBranchesPageData } from "../utils/branches.loader";

export default async function BranchesPage() {
  const data = await loadBranchesPageData();
  return <BranchesPageClient data={data} />;
}
