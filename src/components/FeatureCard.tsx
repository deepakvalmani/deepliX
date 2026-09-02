import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
  variant?: 'default' | 'subtle' | 'warning' | 'problem';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  badge,
  variant = 'default',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'problem':
        return 'bg-white border-[#E5E7EB] hover:border-[#CBD5E1]';
      case 'warning':
        return 'bg-amber-50/40 border-amber-200/70 text-[#0F172A]';
      case 'subtle':
        return 'bg-[#F8FAFC] border-[#E5E7EB]';
      case 'default':
      default:
        return 'bg-white border-[#E5E7EB] hover:border-[#CBD5E1]';
    }
  };

  return (
    <div className={`p-6 rounded-xl border transition-all duration-150 ${getVariantStyles()} flex flex-col justify-start`}>
      {badge && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-2 block">
          {badge}
        </span>
      )}
      
      {Icon && (
        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center text-[#2563EB] mb-4">
          <Icon className="w-5 h-5" />
        </div>
      )}

      <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[#475569] leading-relaxed">
        {description}
      </p>
    </div>
  );
};
