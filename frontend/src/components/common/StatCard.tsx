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
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    slate: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  return (
    <div className="bg-[#111827]/80 backdrop-blur-sm border border-slate-800/80 rounded-xl p-5 hover:border-slate-700/80 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-white mt-1.5 tabular-nums tracking-tight">{value}</p>
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
                'font-medium px-1.5 py-0.5 rounded',
                changeType === 'positive' && 'bg-emerald-500/10 text-emerald-400',
                changeType === 'negative' && 'bg-rose-500/10 text-rose-400',
                changeType === 'neutral' && 'bg-slate-800 text-slate-400'
              )}
            >
              {change}
            </span>
          )}
          {description && <span className="text-slate-400 truncate">{description}</span>}
        </div>
      )}
    </div>
  );
};
