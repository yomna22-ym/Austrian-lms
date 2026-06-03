import { redirect } from "next/navigation";
import { POLICY_ROUTES } from "@/app/constants/routes";

export default function PolicyIndexPage() {
  redirect(POLICY_ROUTES.privacy);
}
