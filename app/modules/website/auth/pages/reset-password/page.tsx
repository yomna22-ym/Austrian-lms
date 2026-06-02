import AuthShell from "../../Components/AuthShell";
import ResetPassword from "../../Components/ResetPassword";

export const metadata = { title: "Reset Password — Österreich Institut" };

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <ResetPassword />
    </AuthShell>
  );
}
