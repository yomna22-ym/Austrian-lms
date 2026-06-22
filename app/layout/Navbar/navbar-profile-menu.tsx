"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import type { WebhookUser } from "@/types/api";
import { NavbarAccountMenu } from "./navbar-account-menu";

interface NavbarProfileMenuProps {
  user: WebhookUser;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export function NavbarProfileMenu({
  user,
  isLoggingOut,
  onLogout,
}: NavbarProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      const items = menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([disabled])',
      );
      if (!items?.length) return;

      event.preventDefault();
      const currentIndex = Array.from(items).findIndex(
        (item) => item === document.activeElement,
      );
      const nextIndex =
        event.key === "ArrowDown"
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;
      items[nextIndex]?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeMenu]);

  const handleToggle = () => {
    setOpen((current) => {
      const next = !current;
      if (next) {
        requestAnimationFrame(() => {
          menuRef.current
            ?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')
            ?.focus();
        });
      }
      return next;
    });
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={`${menuId}-trigger`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${menuId}-menu`}
        aria-label={`Account menu for ${user.fullName}`}
        disabled={isLoggingOut}
        onClick={handleToggle}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => {
              menuRef.current
                ?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')
                ?.focus();
            });
          }
        }}
        className={[
          "flex h-12 max-w-[220px] min-w-[168px] items-center gap-2 rounded-[10px] border bg-white px-2.5 text-left",
          "transition-[border-color,box-shadow,background-color] duration-200",
          open
            ? "border-secondary/25 shadow-[0_8px_24px_rgba(17,19,21,0.08)]"
            : "border-input-border hover:border-[#d8d8d8] hover:bg-[#fafafa]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-60",
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary/10 text-[11px] font-bold text-secondary"
        >
          {initials || <UserRound className="h-3.5 w-3.5" />}
        </div>

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] font-semibold text-text-primary">
            {user.fullName}
          </p>
          <p className="truncate text-[11px] text-text-secondary">{user.email}</p>
        </div>

        <ChevronDown
          size={14}
          aria-hidden="true"
          className={[
            "shrink-0 text-text-secondary motion-safe:transition-transform motion-safe:duration-200",
            open ? "rotate-180 text-secondary" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <div
          id={`${menuId}-menu`}
          role="menu"
          aria-labelledby={`${menuId}-trigger`}
          className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[280px]"
        >
          <NavbarAccountMenu
            user={user}
            isLoggingOut={isLoggingOut}
            onClose={closeMenu}
            onLogout={onLogout}
            variant="dropdown"
          />
        </div>
      )}
    </div>
  );
}
