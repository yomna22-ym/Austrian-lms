"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_ROUTES, WEBSITE_ROUTES } from "@/app/constants/routes";
import { authService } from "@/app/(modules)/auth/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { NavbarAuthActions, NavbarAuthSkeleton } from "./navbar-auth-actions";
import { NavbarMobileAuth } from "./navbar-mobile-auth";
import { NavbarPlacementButton } from "./navbar-placement-button";
import { NavbarProfileMenu } from "./navbar-profile-menu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Branches", href: "/branches" },
  { label: "Blogs", href: "/blogs" },
  { label: "Certificate", href: WEBSITE_ROUTES.certificates },
  { label: "Careers", href: "/careers" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, isAuthenticated, hydrated } = useAuthStore();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      setOpen(false);
      router.push(AUTH_ROUTES.login);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isFloatingRoute = pathname === "/";

  return (
    <header
      className={[
        "z-50 w-full",
        isFloatingRoute
          ? "absolute left-0 top-0 bg-transparent pt-6"
          : "relative bg-primary shadow-sm",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 nav:px-8",
          isFloatingRoute
            ? "w-[calc(100%-2rem)] rounded-[18px] bg-primary shadow-[0_10px_28px_rgba(17,19,21,0.12)] lg:w-[calc(100%-10rem)] lg:px-4 xl:px-5"
            : "lg:px-16",
        ].join(" ")}
      >
        <Link
          href="/"
          className="shrink-0 -ml-1 rounded-sm transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
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

        <div className="hidden nav:flex items-center gap-3">
          {!hydrated ? (
            <NavbarAuthSkeleton />
          ) : isAuthenticated && user ? (
            <>
              <NavbarPlacementButton />
              <NavbarProfileMenu
                user={user}
                isLoggingOut={isLoggingOut}
                onLogout={() => void handleLogout()}
              />
            </>
          ) : (
            <NavbarAuthActions />
          )}
        </div>

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

          <NavbarMobileAuth
            user={user}
            isAuthenticated={isAuthenticated}
            hydrated={hydrated}
            isLoggingOut={isLoggingOut}
            onLogout={() => void handleLogout()}
            onClose={() => setOpen(false)}
            onNavigate={(href) => router.push(href)}
          />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
