import React from 'react';
import { cn } from '../../utils/cn';

interface SkillProgressBarProps {
  skillName: string;
  proficiency: number; // 1 to 5
  max?: number;
  percentage?: number; // Optional 0 to 100
  isAiDiscovered?: boolean;
}

export const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  skillName,
  proficiency,
  max = 5,
  percentage,
  isAiDiscovered = false,
}) => {
  const pct = percentage !== undefined ? percentage : Math.round((proficiency / max) * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          {isAiDiscovered && <span className="text-[#5B4FE8]">✨</span>}
          <span className="font-medium text-[#1A1A1E]">{skillName}</span>
        </div>
        <span className="font-semibold text-[#5B4FE8] font-mono tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 w-full bg-[#ECECF0] rounded-full overflow-hidden p-0.5">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700',
            isAiDiscovered
              ? 'bg-gradient-to-r from-[#5B4FE8] to-[#712AE2]'
              : 'bg-gradient-to-r from-[#5B4FE8] to-[#3B82F6]'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
