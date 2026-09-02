import React from 'react';
import { PageRoute } from '../types';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface IndustryCardProps {
  title: string;
  description: string;
  route: PageRoute;
  icon: LucideIcon;
  onNavigate: (route: PageRoute) => void;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
  title,
  description,
  route,
  icon: Icon,
  onNavigate,
}) => {
  return (
    <div 
      onClick={() => onNavigate(route)}
      className="group bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2563EB]/50 hover:shadow-sm cursor-pointer transition-all duration-200"
    >
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] group-hover:bg-blue-50 border border-[#E5E7EB] group-hover:border-blue-100 flex items-center justify-center text-[#2563EB] transition-colors">
          <Icon className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-[#475569] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-6 mt-4 flex items-center text-sm font-semibold text-[#2563EB] gap-1.5 group-hover:translate-x-1 transition-transform">
        <span>View Industry System</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};
