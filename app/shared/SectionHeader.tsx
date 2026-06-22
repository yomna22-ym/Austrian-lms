import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  label?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  label,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const eyebrowText = eyebrow ?? label;

  return (
    <div
      className={[
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrowText ? (
        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-secondary">
          {eyebrowText}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-[34px]">
        {title}
      </h2>
      {description ? (
        <p
          className={[
            "mt-4 text-[14px] leading-7 text-text-secondary sm:text-[15px]",
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
