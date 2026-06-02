"use client";

import React, { useId } from "react";

interface InputProps {
  /** Required: the visible label text */
  label: string;
  /** Required: tailwind width class, e.g. "w-full" or "w-[320px]" */
  width: string;
  placeholder?: string;
  /** tailwind height class — defaults to h-[48px] */
  height?: string;
  type?: React.HTMLInputTypeAttribute;
  /** tailwind text color class for the label — defaults to text-text-secondary */
  labelColorClass?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  autoComplete?: string;
  disabled?: boolean;
  /** shows red border + helper message below when set */
  error?: string;
  className?: string;
  /** trailing slot — e.g. a show/hide password icon button */
  suffix?: React.ReactNode;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  width,
  placeholder = "",
  height = "h-[48px]",
  type = "text",
  labelColorClass = "text-text-secondary",
  value,
  onChange,
  name,
  id: idProp,
  autoComplete,
  disabled = false,
  error,
  className = "",
  suffix,
  required = false,
}) => {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;

  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${width}`}>
      <label
        htmlFor={inputId}
        className={`text-sm font-medium leading-none ${labelColorClass}`}
      >
        {label}
        {required && <span className="ml-0.5 text-secondary">*</span>}
      </label>

      <div className="relative flex items-center">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          className={[
            "input-base",
            "w-full px-4 text-sm outline-none",
            "transition-[border-color,box-shadow] duration-200 ease-out",
            "focus:border-secondary focus:ring-2 focus:ring-secondary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-[#6F767E]",
            height,
            suffix ? "pr-12" : "",
            error ? "border-red-500 focus:ring-red-200" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {suffix && (
          <div className="absolute right-3 flex items-center">{suffix}</div>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
