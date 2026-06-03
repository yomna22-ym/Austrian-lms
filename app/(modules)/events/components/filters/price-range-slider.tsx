"use client";

import FilterSection from "./filter-section";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export default function PriceRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
}: PriceRangeSliderProps) {
  const fillPercent = ((value - min) / (max - min)) * 100;

  return (
    <FilterSection
      label="Price Range"
      value={
        <span className="text-sm font-bold text-secondary">{value} EGP</span>
      }
    >
      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="price-range-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-input-border"
          style={{
            background: `linear-gradient(to right, var(--color-secondary) 0%, var(--color-secondary) ${fillPercent}%, var(--color-input-border) ${fillPercent}%, var(--color-input-border) 100%)`,
          }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>{min} EGP</span>
        <span>{max} EGP</span>
      </div>
    </FilterSection>
  );
}
