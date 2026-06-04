import type { ReactNode } from "react";

interface InfoPillProps {
  icon?: ReactNode;
  label: string;
  className?: string;
}

export default function InfoPill({ icon, label, className = "" }: InfoPillProps) {
  return (
    <span
      className={[
        "inline-flex h-8 items-center gap-2 rounded-[4px] border border-[#e6e2e2] bg-[#f8f8f8] px-3 text-[13px] font-medium text-text-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && <span className="flex h-4 w-4 items-center justify-center text-secondary">{icon}</span>}
      {label}
    </span>
  );
}
