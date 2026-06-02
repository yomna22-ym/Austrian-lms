import AuthShell from "../../Components/AuthShell";
import ForgetPassword from "../../Components/ForgetPassword";

export const metadata = { title: "Forgot Password — Österreich Institut" };

export default function ForgetPasswordPage() {
  return (
    <AuthShell>
      <ForgetPassword />
    </AuthShell>
  );
}
