import React from "react";

export interface InfoPillProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
}

const InfoPill: React.FC<InfoPillProps> = ({ icon, label, sub }) => (
  <div className="flex w-full flex-col items-center justify-center gap-2 text-center sm:px-4">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
      {icon}
    </span>
    <div className="flex flex-col gap-0.5 leading-tight">
      <span className="text-sm font-bold text-secondary">{label}</span>
      <span className="text-xs text-text-secondary">{sub}</span>
    </div>
  </div>
);

export default InfoPill;
