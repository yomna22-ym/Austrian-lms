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
        <span className="text-sm font-bold text-secondary tabular-nums">
          {value.toLocaleString()} EGP
        </span>
      }
    >
      <div className="relative py-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="price-range-slider h-2 w-full cursor-pointer appearance-none rounded-full"
          style={{
            background: `linear-gradient(to right, var(--color-secondary) 0%, var(--color-secondary) ${fillPercent}%, var(--color-input-border) ${fillPercent}%, var(--color-input-border) 100%)`,
          }}
          aria-label={`Maximum price: ${value} EGP`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>{min.toLocaleString()} EGP</span>
        <span>{max.toLocaleString()} EGP</span>
      </div>
    </FilterSection>
  );
}
