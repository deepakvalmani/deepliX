import React from "react";

interface SectionTagProps {
  children: React.ReactNode;
  color?: string;
  dark?: boolean;
}

export const SectionTag: React.FC<SectionTagProps> = ({
  children,
  color = "#00BFFF",
  dark = false,
}) => (
  <span
    data-testid="section-tag"
    className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#1E1E1E]/80 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#A1A1AA] shadow-soft-sm backdrop-blur"
  >
    <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: color, color }} />
    {children}
  </span>
);

