import AuthShell from "../Components/AuthShell";
import GetReady from "../Components/GetReady";

export const metadata = { title: "Get Ready — Österreich Institut" };

export default function GetReadyPage() {
  return (
    <AuthShell>
      <GetReady />
    </AuthShell>
  );
}
