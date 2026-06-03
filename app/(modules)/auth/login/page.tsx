import AuthShell from "../Components/AuthShell";
import LoginForm from "../Components/LoginForm";

export const metadata = { title: "Log In — Österreich Institut" };

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
