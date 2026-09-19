import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: 'indigo' | 'emerald' | 'amber' | 'purple' | 'slate';
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  change,
  changeType = 'positive',
  color = 'indigo',
  description,
}) => {
  const iconBgStyles = {
    indigo: 'bg-[#5B4FE8]/10 text-[#5B4FE8] border-[#5B4FE8]/20',
    emerald: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    purple: 'bg-[#712AE2]/10 text-[#712AE2] border-[#712AE2]/20',
    slate: 'bg-[#F1F1F4] text-[#6B6B76] border-[#E5E5EA]',
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl p-5 shadow-xs hover:border-[#5B4FE8]/40 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-[#9B9BA5] uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-[#1A1A1E] mt-1.5 tabular-nums tracking-tight font-['Plus_Jakarta_Sans']">{value}</p>
        </div>
        <div className={cn('p-2.5 rounded-lg border', iconBgStyles[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {(change || description) && (
        <div className="mt-3.5 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={cn(
                'font-medium px-1.5 py-0.5 rounded text-[11px]',
                changeType === 'positive' && 'bg-[#22C55E]/10 text-[#16a34a]',
                changeType === 'negative' && 'bg-rose-500/10 text-rose-600',
                changeType === 'neutral' && 'bg-[#F1F1F4] text-[#6B6B76]'
              )}
            >
              {change}
            </span>
          )}
          {description && <span className="text-[#6B6B76] truncate">{description}</span>}
        </div>
      )}
    </div>
  );
};
