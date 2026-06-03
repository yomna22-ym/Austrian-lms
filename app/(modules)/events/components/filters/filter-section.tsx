import type { ReactNode } from "react";

interface FilterSectionProps {
  label: string;
  value?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function FilterSection({
  label,
  value,
  children,
  className = "",
}: FilterSectionProps) {
  return (
    <section className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          {label}
        </h3>
        {value}
      </div>
      {children}
    </section>
  );
}
