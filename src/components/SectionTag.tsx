import React from "react";

interface SectionTagProps {
  children: React.ReactNode;
  color?: string;
  dark?: boolean;
}

export const SectionTag: React.FC<SectionTagProps> = ({
  children,
  color = "#3B82F6",
  dark = false,
}) => (
  <span
    data-testid="section-tag"
    className={`inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] backdrop-blur ${
      dark
        ? "border border-white/15 bg-white/5 text-slate-300"
        : "border border-slate-200 bg-white/70 text-slate-500 shadow-soft-sm"
    }`}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
    {children}
  </span>
);
