"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type DropdownOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type DropdownProps<T extends string> = {
  value: T;
  options: readonly T[] | readonly DropdownOption<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
  disabled?: boolean;
  placeholder?: string;
  buttonClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
};

function normalizeOptions<T extends string>(
  options: readonly T[] | readonly DropdownOption<T>[],
): DropdownOption<T>[] {
  return options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );
}

export default function Dropdown<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  disabled = false,
  placeholder,
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const normalizedOptions = normalizeOptions(options);
  const selectedOption = normalizedOptions.find((option) => option.value === value);
  const selectedLabel = selectedOption?.label ?? placeholder ?? value;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={[
          "flex h-9 w-full items-center justify-between gap-5 rounded-[8px] border border-[#e7e7e7] bg-white px-4 text-left text-[12px] font-medium text-text-primary transition-colors hover:border-[#d5d5d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-60",
          buttonClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          size={14}
          className={
            open
              ? "shrink-0 rotate-180 transition-transform"
              : "shrink-0 transition-transform"
          }
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
          {normalizedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              disabled={option.disabled}
              onClick={() => {
                if (option.disabled) return;
                onChange(option.value);
                setOpen(false);
              }}
              className={[
                "flex h-9 w-full items-center rounded-[9px] px-3 text-left text-[12px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                option.value === value
                  ? "bg-[#fff0f0] text-secondary"
                  : "text-text-primary hover:bg-[#f5f5f5]",
                optionClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
