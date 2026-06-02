import React from "react";

type AuthFormSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<AuthFormSize, string> = {
  sm: "max-w-[var(--auth-form-sm)]",
  md: "max-w-[var(--auth-form-md)]",
  lg: "max-w-[var(--auth-form-lg)]",
};

interface AuthFormLayoutProps {
  children: React.ReactNode;
  /** sm = login/forget, md = signup/reset, lg = get-ready */
  size?: AuthFormSize;
  className?: string;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  children,
  size = "md",
  className = "",
}) => {
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
};

export default AuthFormLayout;
