import React from 'react';
import { cn } from '../../utils/cn';

interface SkillBadgeProps {
  name: string;
  category?: string;
  isAiDiscovered?: boolean;
  proficiency?: number;
  className?: string;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  category = 'Technical',
  isAiDiscovered = false,
  proficiency,
  className,
}) => {
  const getCategoryStyles = () => {
    if (isAiDiscovered) {
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25';
    }
    switch (category.toLowerCase()) {
      case 'leadership':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'interpersonal':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
      case 'domain':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors',
        getCategoryStyles(),
        className
      )}
    >
      {isAiDiscovered && <span className="text-amber-400">✨</span>}
      <span>{name}</span>
      {proficiency && (
        <span className="text-[10px] opacity-70 ml-0.5 font-semibold">
          lvl {proficiency}
        </span>
      )}
    </span>
  );
};
