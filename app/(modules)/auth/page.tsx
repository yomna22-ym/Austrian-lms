import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "./constants/routes";

export default function AuthIndexPage() {
  redirect(AUTH_ROUTES.login);
}
