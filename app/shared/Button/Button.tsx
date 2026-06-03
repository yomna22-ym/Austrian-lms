import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  label: string;
  bgColorClass?: string;
  textColorClass?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showArrowRight?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  bgColorClass = "bg-secondary",
  textColorClass = "text-primary",
  width = "w-auto",
  height = "h-[51px]",
  onClick,
  icon,
  iconPosition = "left",
  showArrowRight = false,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const rightIcon =
    showArrowRight && !icon ? (
      <ArrowRight size={20} strokeWidth={2.4} />
    ) : icon;
  const resolvedIconPosition = showArrowRight ? "right" : iconPosition;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-input font-medium text-base " +
    "transition-all duration-200 ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[base, bgColorClass, textColorClass, width, height, className]
        .filter(Boolean)
        .join(" ")}
    >
      {rightIcon && resolvedIconPosition === "left" && (
        <span className="shrink-0 leading-none">{rightIcon}</span>
      )}
      <span className="whitespace-nowrap leading-none">{label}</span>
      {rightIcon && resolvedIconPosition === "right" && (
        <span className="shrink-0 leading-none">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
