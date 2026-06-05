"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type DropdownProps<T extends string> = {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  ariaLabel: string;
  buttonClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
};

export default function Dropdown<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={[
          "flex h-9 w-full items-center justify-between gap-5 rounded-[8px] border border-[#e7e7e7] bg-white px-4 text-left text-[12px] font-medium text-text-primary transition-colors hover:border-[#d5d5d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/20",
          buttonClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={14}
          className={open ? "shrink-0 rotate-180 transition-transform" : "shrink-0 transition-transform"}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className={[
            "absolute right-0 top-[calc(100%+8px)] z-30 w-full min-w-[160px] overflow-hidden rounded-[12px] border border-[#e7e7e7] bg-white p-1 shadow-[0_16px_32px_rgba(17,19,21,0.12)]",
            menuClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={[
                "flex h-9 w-full items-center rounded-[9px] px-3 text-left text-[12px] font-medium transition-colors",
                option === value
                  ? "bg-[#fff0f0] text-secondary"
                  : "text-text-primary hover:bg-[#f5f5f5]",
                optionClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
