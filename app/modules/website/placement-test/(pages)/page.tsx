import Header from "../Components/Header";
import TakePlacementTest from "../Components/Take-Placement-Test";

export const metadata = {
  title: "Placement Test — Österreich Institut",
  description:
    "Take our official German language placement test to find the right course for your level.",
};

export default function PlacementTestPage() {
  return (
    <div className="w-full">
      <Header />
      <TakePlacementTest />
    </div>
  );
}
