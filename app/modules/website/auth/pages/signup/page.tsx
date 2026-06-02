import AuthShell from "../../Components/AuthShell";
import SignUpForm from "../../Components/SignUpForm";

export const metadata = { title: "Sign Up — Österreich Institut" };

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  );
}
