import type { HTMLAttributes, ReactNode } from "react";

interface SurfaceCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function SurfaceCard({
  children,
  className = "",
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={[
        "rounded-[10px] border border-[#e8e2e2] bg-white shadow-[0_12px_28px_rgba(17,19,21,0.04)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
