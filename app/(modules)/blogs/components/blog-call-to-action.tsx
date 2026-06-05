"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/shared/Button/Button";
import { AUTH_ROUTES } from "@/app/constants/routes";

export default function BlogCallToAction() {
  const router = useRouter();

  return (
    <section className="w-full bg-white px-4 py-24 sm:px-6 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="relative flex justify-center lg:justify-start">
          <Image
            src="/calltoaction.svg"
            alt="Students learning together"
            width={560}
            height={360}
            className="h-auto w-full max-w-[560px]"
          />
        </div>

        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-[38px] font-extrabold leading-tight text-[#08251f] sm:text-[44px]">
            Join <span className="text-secondary">World&apos;s largest</span>
            <br />
            learning platform today
          </h2>
          <p className="mt-7 text-[16px] leading-relaxed text-text-secondary">
            Join thousands of students who have mastered German with the
            Osterreich Institut. Enrollment for the winter semester is now open.
          </p>
          <Button
            label="Sign up for Free"
            width="w-[160px]"
            height="h-[48px]"
            onClick={() => router.push(AUTH_ROUTES.signup)}
            className="mt-8 rounded-[6px] text-[13px] font-bold"
          />
        </div>
      </div>
    </section>
  );
}
