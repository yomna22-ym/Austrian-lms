import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Share2 } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/policy/privacy-policy" },
  { label: "Terms of Service", href: "/policy/terms-of-service" },
  { label: "Legal Notice", href: "/policy/legal-notice" },
  { label: "Contact", href: "/contact" },
];

const ICON_BTN =
  "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary " +
  "transition-all duration-150 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-95 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-secondary";

const LogoBlock = () => (
  <Link
    href="/"
    aria-label="Go to homepage"
    className="shrink-0 transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded-sm"
  >
    <Image
      src="/Logo-footer.svg"
      alt="Österreich Institut"
      width={59}
      height={59}
      priority
      className="h-[52px] w-auto"
    />
  </Link>
);

const TextBlock = ({ center = false }: { center?: boolean }) => (
  <div className={`flex flex-col gap-0.5 ${center ? "items-center text-center" : ""}`}>
    <p className="text-[20px] font-bold leading-tight text-[#C9C9C9]">
      Österreich Institut
    </p>
    <p className="text-[14px] font-normal leading-normal text-white">
      © 2024 Österreich Institut. All rights reserved.
    </p>
  </div>
);

const LinksBlock = ({ className = "" }: { className?: string }) => (
  <nav aria-label="Footer">
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {FOOTER_LINKS.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className={[
              "whitespace-nowrap text-[16px] font-normal text-white",
              "underline-offset-4 transition-all duration-150",
              "hover:underline hover:opacity-80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
            ].join(" ")}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const IconsBlock = () => (
  <div className="flex items-center gap-3">
    <button type="button" aria-label="Visit website" className={ICON_BTN}>
      <Globe className="h-5 w-5" aria-hidden="true" />
    </button>
    <button type="button" aria-label="Share page" className={ICON_BTN}>
      <Share2 className="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
);

const Footer = () => {
  return (
    <footer className="w-full bg-secondary">

      {/* ── DESKTOP (≥1200px): 4-column grid, fixed 123px height ─────────── */}
      <div className="hidden nav:grid mx-auto h-[123px] max-w-7xl grid-cols-[auto_auto_1fr_auto] items-center gap-6 px-8 lg:px-16">
        {/* Col 1 */}
        <LogoBlock />
        {/* Col 2 */}
        <TextBlock />
        {/* Col 3 — links centered in remaining space */}
        <div className="flex justify-center">
          <LinksBlock className="justify-center" />
        </div>
        {/* Col 4 */}
        <IconsBlock />
      </div>

      {/* ── TABLET (768px – 1199px): 2×2 grid, auto height ───────────────── */}
      <div className="hidden md:grid nav:hidden mx-auto max-w-7xl grid-cols-2 gap-x-8 gap-y-5 px-6 py-8">
        {/* Row 1 col A: logo */}
        <div className="flex items-center">
          <LogoBlock />
        </div>
        {/* Row 1 col B: text */}
        <div className="flex items-center">
          <TextBlock />
        </div>
        {/* Row 2 col A: links */}
        <div className="flex items-start">
          <LinksBlock className="gap-x-4 gap-y-2" />
        </div>
        {/* Row 2 col B: icons */}
        <div className="flex items-center">
          <IconsBlock />
        </div>
      </div>

      {/* ── MOBILE (<768px): single-column centered stack ─────────────────── */}
      <div className="flex md:hidden flex-col items-center gap-5 px-4 py-8 text-center">
        <LogoBlock />
        <TextBlock center />
        <LinksBlock className="justify-center gap-x-5 gap-y-2" />
        <IconsBlock />
      </div>

    </footer>
  );
};

export default Footer;
