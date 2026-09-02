import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Geometric Hexagonal Node Icon matching the brand */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer Hexagon outline */}
        <polygon
          points="50,6 88,28 88,72 50,94 12,72 12,28"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner network lines */}
        <line x1="50" y1="6" x2="50" y2="50" stroke="#0284C7" strokeWidth="4" />
        <line x1="88" y1="28" x2="50" y2="50" stroke="#0284C7" strokeWidth="4" />
        <line x1="88" y1="72" x2="50" y2="50" stroke="#0284C7" strokeWidth="4" />
        <line x1="50" y1="94" x2="50" y2="50" stroke="#0284C7" strokeWidth="4" />
        <line x1="12" y1="72" x2="50" y2="50" stroke="#0284C7" strokeWidth="4" />
        <line x1="12" y1="28" x2="50" y2="50" stroke="#0284C7" strokeWidth="4" />
        
        {/* Secondary cross connectors */}
        <line x1="50" y1="6" x2="88" y2="72" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.7" />
        <line x1="50" y1="6" x2="12" y2="72" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.7" />
        <line x1="50" y1="94" x2="88" y2="28" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.7" />
        <line x1="50" y1="94" x2="12" y2="28" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.7" />
        <line x1="12" y1="28" x2="88" y2="28" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.7" />
        <line x1="12" y1="72" x2="88" y2="72" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.7" />

        {/* Outer and central vertex nodes */}
        <circle cx="50" cy="6" r="6" fill="#2563EB" />
        <circle cx="88" cy="28" r="6" fill="#2563EB" />
        <circle cx="88" cy="72" r="6" fill="#2563EB" />
        <circle cx="50" cy="94" r="6" fill="#2563EB" />
        <circle cx="12" cy="72" r="6" fill="#2563EB" />
        <circle cx="12" cy="28" r="6" fill="#2563EB" />
        <circle cx="50" cy="50" r="7" fill="#0284C7" />
      </svg>

      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-[#0F172A] ${textSize} leading-none flex items-baseline`}>
          deepli<span className="text-[#2563EB]">X</span>
        </span>
        {showTagline && (
          <span className="text-[9px] font-semibold tracking-wider text-[#64748B] uppercase mt-0.5">
            Digital Systems
          </span>
        )}
      </div>
    </div>
  );
};
