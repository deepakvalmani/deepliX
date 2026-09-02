import React from 'react';

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-[#2563EB] bg-blue-50 border border-blue-100 mb-3 ${isCenter ? 'mx-auto' : ''}`}>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
