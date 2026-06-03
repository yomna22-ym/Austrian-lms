import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { HOME_ROUTE } from "@/app/constants/routes";

const BRAND_DESCRIPTION =
  "Your bridge to the German language and Austrian culture. Join our global community of learners today.";

interface AuthShellProps {
  children: React.ReactNode;
}

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="auth-shell flex w-full flex-col lg:flex-row">
      <aside
        className="auth-panel-left relative w-full lg:w-[var(--auth-panel-left)] lg:min-h-dvh"
        aria-label="Österreich Institut"
      >
        <div className="relative min-h-[min(42vh,320px)] w-full lg:absolute lg:inset-0 lg:min-h-dvh">
          <Image
            src="/AuthHeader.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1023px) 100vw, 515px"
          />

          <div className="relative z-10 flex min-h-[min(42vh,320px)] flex-col items-center justify-between gap-6 px-6 py-8 text-center sm:min-h-[min(45vh,360px)] sm:gap-8 sm:px-8 sm:py-10 lg:min-h-dvh lg:items-start lg:px-10 lg:py-10 lg:text-left">
            <div className="flex w-full max-w-[360px] flex-col items-center gap-6 sm:gap-8 lg:max-w-none lg:items-start lg:gap-10">
              <Image
                src="/Logo-footer.svg"
                alt="Österreich Institut"
                width={123}
                height={123}
                className="h-[72px] w-[72px] sm:h-[96px] sm:w-[96px] lg:h-[123px] lg:w-[123px]"
                priority
              />
              <p className="text-base font-semibold leading-snug text-white sm:text-lg lg:text-[20px]">
                {BRAND_DESCRIPTION}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white sm:h-10 sm:w-10">
                <BadgeCheck
                  className="h-4 w-4 shrink-0 text-secondary sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
              </span>
              <div className="flex min-w-0 flex-col leading-tight text-left text-white">
                <span className="text-[11px] font-bold uppercase tracking-wide sm:text-xs">
                  Authorized
                </span>
                <span className="text-[11px] text-white/80 sm:text-xs">
                  Examination &amp; Teaching Center
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="auth-panel-right min-h-0 lg:min-h-dvh">
        <Link
          href={HOME_ROUTE}
          className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-md px-1 py-1 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:left-6 sm:top-6 lg:left-10 lg:top-8 xl:left-16"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          Back to home
        </Link>

        <div className="auth-panel-right__scroll flex items-start justify-center px-4 pb-8 pt-14 sm:px-6 sm:pb-10 sm:pt-16 md:px-10 lg:items-center lg:px-12 lg:py-12 xl:px-16">
          <div className="w-full min-w-0 py-2 sm:py-4 lg:py-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
