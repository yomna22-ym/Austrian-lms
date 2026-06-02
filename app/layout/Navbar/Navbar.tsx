"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/app/shared/Button/Button";
import { AUTH_ROUTES } from "@/app/modules/website/auth/constants/routes";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
  { label: "Branches", href: "/branches" },
  { label: "Contact us", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu when viewport widens to desktop (≥1200px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-50 w-full bg-primary shadow-sm">
      {/* Bar — 72px tall at all widths */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 nav:px-8 lg:px-16">

        {/* Logo — nudged slightly left */}
        <Link
          href="/"
          className="shrink-0 -ml-1 transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-sm"
          aria-label="Go to homepage"
        >
          <Image
            src="/Logo.svg"
            alt="Österreich Institut"
            width={52}
            height={52}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop nav — visible only at ≥1200px */}
        <nav aria-label="Main" className="hidden nav:flex items-center">
          <ul className="flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "group relative inline-flex flex-col items-center rounded-md px-2 py-1 text-[15px] font-medium",
                      "transition-[color,background-color,transform] duration-200 ease-out",
                      "hover:-translate-y-0.5 hover:bg-input-bg/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "text-secondary"
                        : "text-text-secondary hover:text-text-primary",
                    ].join(" ")}
                  >
                    {label}
                    {/* Animated underline */}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute left-0 -bottom-px h-[2px] w-full origin-left rounded-full bg-secondary",
                        "transition-[transform,opacity] duration-300 ease-out",
                        active
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                      ].join(" ")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop buttons — visible only at ≥1200px */}
        <div className="hidden nav:flex items-center gap-3">
          <Button
            label="Sign up"
            bgColorClass="bg-input-bg hover:bg-input-border border border-input-border"
            textColorClass="text-text-primary"
            width="w-[92px]"
            height="h-[51px]"
            className="shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
            type="button"
            onClick={() => router.push(AUTH_ROUTES.signup)}
          />
          <Button
            label="Take Placement Test"
            bgColorClass="bg-secondary hover:brightness-110"
            textColorClass="text-primary"
            width="w-[185px]"
            height="h-[51px]"
            className="shadow-sm hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:brightness-95 active:shadow-sm"
          />
        </div>

        {/* Hamburger — visible below 1200px */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close main menu" : "Open main menu"}
          className={[
            "flex nav:hidden h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md",
            "transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
          ].join(" ")}
        >
          <span
            className={[
              "block h-[2px] w-6 rounded-full bg-text-primary transition-all duration-200 ease-out origin-center",
              open ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-6 rounded-full bg-text-primary transition-all duration-200 ease-out",
              open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-6 rounded-full bg-text-primary transition-all duration-200 ease-out origin-center",
              open ? "translate-y-[-7px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile / tablet slide-down menu — shown below 1200px */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={[
          "absolute left-0 right-0 top-full bg-primary shadow-md",
          "max-h-[calc(100dvh-72px)] overflow-y-auto",
          "transition-all duration-200 ease-out",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none",
        ].join(" ")}
      >
        <nav
          aria-label="Main mobile"
          className="mx-auto max-w-7xl px-4 pb-6 sm:px-6"
        >
          <ul role="list" className="divide-y divide-input-border">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center gap-3 py-3 text-[15px] font-medium",
                      "transition-colors duration-150",
                      active
                        ? "text-secondary"
                        : "text-text-secondary hover:text-text-primary",
                    ].join(" ")}
                  >
                    {/* Active left bar */}
                    <span
                      aria-hidden="true"
                      className={[
                        "h-4 w-[3px] shrink-0 rounded-full bg-secondary transition-opacity duration-200",
                        active ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA buttons — full width in drawer */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              label="Sign up"
              bgColorClass="bg-input-bg border border-input-border hover:bg-input-border"
              textColorClass="text-text-primary"
              width="w-full"
              height="h-[51px]"
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(AUTH_ROUTES.signup);
              }}
            />
            <Button
              label="Take Placement Test"
              bgColorClass="bg-secondary hover:brightness-110"
              textColorClass="text-primary"
              width="w-full"
              height="h-[51px]"
              className="shadow-sm"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
