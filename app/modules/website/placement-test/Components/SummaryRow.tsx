import React from "react";

export interface SummaryRowProps {
  label: string;
  value: string;
  valueClass?: string;
  bold?: boolean;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  label,
  value,
  valueClass = "text-text-primary",
  bold = false,
}) => (
  <div
    className={`flex items-center justify-between ${bold ? "font-bold" : "font-normal"}`}
  >
    <span
      className={`text-sm ${bold ? "text-text-primary" : "text-text-secondary"}`}
    >
      {label}
    </span>
    <span className={`text-sm ${valueClass}`}>{value}</span>
  </div>
);

export default SummaryRow;
