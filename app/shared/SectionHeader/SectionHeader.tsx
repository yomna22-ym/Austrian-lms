import React from "react";

export interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeader = ({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) => {
  const alignClass =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <header
      className={[
        "flex flex-col gap-2 sm:gap-3",
        alignClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
        {label}
      </p>
      <h2 className="text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;
