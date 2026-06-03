import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/app/constants/routes";

export default function AuthIndexPage() {
  redirect(AUTH_ROUTES.login);
}
