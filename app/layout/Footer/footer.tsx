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
    className="shrink-0 rounded-sm transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
  >
    <Image
      src="/Logo-footer.svg"
      alt="Osterreich Institut"
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
      Osterreich Institut
    </p>
    <p className="text-[14px] font-normal leading-normal text-white">
      Copyright 2024 Osterreich Institut. All rights reserved.
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
      <div className="mx-auto hidden h-[123px] max-w-7xl grid-cols-[auto_auto_1fr_auto] items-center gap-6 px-8 nav:grid lg:px-16">
        <LogoBlock />
        <TextBlock />
        <div className="flex justify-center">
          <LinksBlock className="justify-center" />
        </div>
        <IconsBlock />
      </div>

      <div className="mx-auto hidden max-w-7xl grid-cols-2 gap-x-8 gap-y-5 px-6 py-8 md:grid nav:hidden">
        <div className="flex items-center">
          <LogoBlock />
        </div>
        <div className="flex items-center">
          <TextBlock />
        </div>
        <div className="flex items-start">
          <LinksBlock className="gap-x-4 gap-y-2" />
        </div>
        <div className="flex items-center">
          <IconsBlock />
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 px-4 py-8 text-center md:hidden">
        <LogoBlock />
        <TextBlock center />
        <LinksBlock className="justify-center gap-x-5 gap-y-2" />
        <IconsBlock />
      </div>
    </footer>
  );
};

export default Footer;
