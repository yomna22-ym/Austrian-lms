"use client";

import React, { useId } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  width: string;
  height?: string;
  labelColorClass?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  width,
  height = "h-[48px]",
  labelColorClass = "text-text-secondary",
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  disabled = false,
  required = false,
  id: idProp,
  name,
}) => {
  const generatedId = useId();
  const selectId = idProp ?? generatedId;

  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${width}`}>
      <label
        htmlFor={selectId}
        className={`text-sm font-medium leading-none ${labelColorClass}`}
      >
        {label}
        {required && <span className="ml-0.5 text-secondary">*</span>}
      </label>

      <select
        id={selectId}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full min-w-0 rounded-lg border bg-white px-3.5 text-sm text-text-primary",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error
            ? "border-red-400 focus-visible:ring-red-200"
            : "border-input-border hover:border-input-border/80",
          height,
        ].join(" ")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
