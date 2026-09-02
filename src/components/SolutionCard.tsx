import React from 'react';
import { PageRoute } from '../types';
import { Check, ArrowRight, LucideIcon } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  badge?: string;
  description: string;
  features: string[];
  route: PageRoute;
  icon: LucideIcon;
  accentColor?: string;
  onNavigate: (route: PageRoute) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  badge,
  description,
  features,
  route,
  icon: Icon,
  accentColor = '#2563EB',
  onNavigate,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 flex flex-col justify-between hover:border-[#CBD5E1] transition-all duration-200 shadow-xs hover:shadow-sm">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#2563EB]">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-[#E5E7EB] text-[#475569]">
              {badge}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-[#475569] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-[#F1F5F9]">
          <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">Key Modules</span>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-[#334155]">
                <div className="w-4 h-4 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-[#F1F5F9]">
        <button
          onClick={() => onNavigate(route)}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-[#2563EB] text-[#0F172A] hover:text-white border border-[#E5E7EB] hover:border-[#2563EB] px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150"
        >
          <span>Explore {title}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
