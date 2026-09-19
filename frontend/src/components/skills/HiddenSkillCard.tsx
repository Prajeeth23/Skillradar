import React from 'react';
import { Sparkles, ShieldCheck, Quote } from 'lucide-react';
import { Badge } from '../common/Badge';

interface HiddenSkillCardProps {
  skillName: string;
  category: string;
  confidence: number;
  evidence?: string;
  source?: string;
  proficiency?: number;
}

export const HiddenSkillCard: React.FC<HiddenSkillCardProps> = ({
  skillName,
  category,
  confidence,
  evidence,
  source = 'AI Inferred (Synthesis Engine v4.2)',
  proficiency = 4,
}) => {
  const confidencePercent = Math.round(confidence > 1 ? confidence : confidence * 100);

  return (
    <div className="relative group bg-[#FFFFFF] border border-[#E5E5EA] hover:border-[#5B4FE8]/40 rounded-xl p-5 transition-all duration-200 shadow-xs hover:shadow-sm">
      {/* Top Tag & Confidence */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#5B4FE8]/10 text-[10px] font-bold text-[#5B4FE8] font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5B4FE8]" />
          <span>AI DISCOVERED</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-[#5B4FE8] font-mono">
          <span className="text-sm">{confidencePercent}%</span>
        </div>
      </div>

      {/* Skill Name & Category */}
      <div className="flex items-baseline justify-between mb-2 gap-2">
        <h4 className="text-base font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">{skillName}</h4>
        <Badge variant="purple" size="sm">
          {category}
        </Badge>
      </div>

      {/* Evidence Quote Block */}
      {evidence && (
        <div className="mt-3.5 pt-3 border-t border-[#E5E5EA]">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5B4FE8] uppercase tracking-wider mb-1.5 font-mono">
            <Quote className="w-3 h-3 text-[#5B4FE8]" />
            <span>Telemetry Evidence</span>
          </div>
          <p className="text-xs text-[#4B4B55] italic bg-[#F4F3FF] p-3 rounded-lg border border-[#5B4FE8]/15 leading-relaxed">
            "{evidence}"
          </p>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-3.5 flex items-center justify-between text-[11px] text-[#9B9BA5] font-mono">
        <span className="truncate max-w-[200px]">{source}</span>
        <span>L{proficiency} / 5</span>
      </div>
    </div>
  );
};
