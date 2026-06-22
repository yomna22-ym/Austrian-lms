import { AuthGate, AuthShell, GetReadyForm } from "../../components";

export default function GetReadyPage() {
  return (
    <AuthShell>
      <AuthGate>
        <GetReadyForm />
      </AuthGate>
    </AuthShell>
  );
}
