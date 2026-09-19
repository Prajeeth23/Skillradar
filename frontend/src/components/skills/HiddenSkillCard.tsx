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
  source = 'AI Inferred (Divergence Engine)',
  proficiency = 4,
}) => {
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="relative group bg-gradient-to-b from-purple-950/20 via-slate-900/60 to-slate-900/90 border border-purple-500/30 hover:border-purple-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-purple-500/10">
      {/* Top Tag & Confidence */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[11px] font-bold text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI DISCOVERED</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{confidencePercent}% confidence</span>
        </div>
      </div>

      {/* Skill Name & Category */}
      <div className="flex items-baseline justify-between mb-2">
        <h4 className="text-base font-bold text-white tracking-tight">{skillName}</h4>
        <Badge variant="purple" size="sm">
          {category}
        </Badge>
      </div>

      {/* Evidence Quote Block */}
      {evidence && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-300 uppercase tracking-wider mb-1.5">
            <Quote className="w-3 h-3 text-indigo-400" />
            <span>Verified Work Evidence</span>
          </div>
          <p className="text-xs text-slate-300 italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
            "{evidence}"
          </p>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-3.5 flex items-center justify-between text-[11px] text-slate-400">
        <span>Source: {source}</span>
        <span>Demonstrated: Level {proficiency}/5</span>
      </div>
    </div>
  );
};
