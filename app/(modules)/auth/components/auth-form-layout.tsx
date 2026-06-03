import type { AuthFormSize } from "../types";

const SIZE_CLASS: Record<AuthFormSize, string> = {
  sm: "max-w-[var(--auth-form-sm)]",
  md: "max-w-[var(--auth-form-md)]",
  lg: "max-w-[var(--auth-form-lg)]",
};

interface AuthFormLayoutProps {
  children: React.ReactNode;
  size?: AuthFormSize;
  className?: string;
}

export default function AuthFormLayout({
  children,
  size = "md",
  className = "",
}: AuthFormLayoutProps) {
  return (
    <div
      className={[
        "auth-form-stack mx-auto w-full min-w-0",
        SIZE_CLASS[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
