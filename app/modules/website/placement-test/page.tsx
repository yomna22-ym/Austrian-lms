import Link from "next/link";
import Button from "@/app/shared/Button/Button";
import { HOME_ROUTE } from "@/app/modules/website/auth/constants/routes";

export const metadata = { title: "Placement Test — Österreich Institut" };

export default function PlacementTestPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-72px-123px)] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-text-primary">Placement Test</h1>
      <p className="mt-3 text-[16px] text-text-secondary">
        This page is a placeholder until the real placement test flow is ready.
      </p>
      <div className="mt-8">
        <Link href={HOME_ROUTE}>
          <Button
            label="Back to Home"
            bgColorClass="bg-secondary hover:brightness-110"
            textColorClass="text-primary"
            width="w-[200px]"
            height="h-[51px]"
          />
        </Link>
      </div>
    </div>
  );
}
