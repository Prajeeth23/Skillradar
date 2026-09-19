import React from 'react';
import { ArrowDown, Sparkles, Briefcase, FileCode, CheckCircle2 } from 'lucide-react';
import { DiscoveredSkill } from '../../types/skill';

interface DivergenceVisualizerProps {
  officialTitle: string;
  department: string;
  analyzedProjectsCount: number;
  explicitSkills: DiscoveredSkill[];
  hiddenSkills: DiscoveredSkill[];
  transferableSkills: DiscoveredSkill[];
  summary?: string;
}

export const DivergenceVisualizer: React.FC<DivergenceVisualizerProps> = ({
  officialTitle,
  department,
  analyzedProjectsCount,
  explicitSkills,
  hiddenSkills,
  transferableSkills,
  summary,
}) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-[#E5E5EA] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#5B4FE8] uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-[#5B4FE8]" />
            <span>Synthesis Engine v4.2 Divergence</span>
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1E] mt-1 font-['Plus_Jakarta_Sans']">Nominal Role vs. Demonstrated Talent</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#6B6B76]">Analysis Coverage</span>
          <div className="text-sm font-semibold text-[#16a34a] flex items-center gap-1.5 justify-end mt-0.5 font-mono">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <span>{analyzedProjectsCount} Verified Telemetry Sources</span>
          </div>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Step 1: Official Nominal Baseline */}
        <div className="bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl p-5 relative">
          <div className="text-[11px] font-bold text-[#9B9BA5] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
            <Briefcase className="w-3.5 h-3.5 text-[#9B9BA5]" />
            <span>Official Nominal Role</span>
          </div>
          <div className="text-lg font-bold text-[#1A1A1E] mb-1 font-['Plus_Jakarta_Sans']">{officialTitle}</div>
          <p className="text-xs text-[#6B6B76]">{department} Department</p>

          <div className="mt-4 pt-3 border-t border-[#E5E5EA]">
            <div className="text-[11px] text-[#9B9BA5] uppercase font-semibold mb-2 font-mono">Expected Baseline:</div>
            <div className="flex flex-wrap gap-1.5">
              {explicitSkills.slice(0, 3).map((s) => (
                <span
                  key={s.name}
                  className="px-2 py-0.5 text-xs bg-[#FFFFFF] text-[#4B4B55] rounded border border-[#E5E5EA] font-mono"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Transition Indicator */}
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <div className="px-3 py-1 rounded-full bg-[#5B4FE8]/10 border border-[#5B4FE8]/25 text-xs font-semibold text-[#5B4FE8] mb-2 flex items-center gap-1.5 shadow-xs font-mono">
            <FileCode className="w-3.5 h-3.5" />
            <span>Actual Telemetry & Output</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#5B4FE8] border border-[#E5E5EA] shadow-xs">
            <ArrowDown className="w-4 h-4 text-[#5B4FE8]" />
          </div>
          <div className="text-[11px] text-[#6B6B76] mt-2 max-w-[180px]">
            Synthesizing code, reviews & incidents beyond nominal role
          </div>
        </div>

        {/* Step 2: Beyond Titles (Hidden & Transferable Capabilities) */}
        <div className="bg-[#F4F3FF] border border-[#5B4FE8]/30 rounded-xl p-5 shadow-xs relative">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] font-bold text-[#5B4FE8] uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#5B4FE8]" />
              <span>Beyond Nominal Role</span>
            </div>
            <span className="text-[10px] font-bold bg-[#5B4FE8]/15 text-[#5B4FE8] px-2 py-0.5 rounded-full border border-[#5B4FE8]/25 font-mono">
              AI DISCOVERED
            </span>
          </div>

          <div className="space-y-2 mt-3">
            {hiddenSkills.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between p-2.5 bg-[#FFFFFF] rounded-lg border border-[#5B4FE8]/20 text-xs shadow-xs"
              >
                <span className="font-semibold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">{s.name}</span>
                <span className="text-[#5B4FE8] font-bold font-mono">
                  {Math.round(s.confidence > 1 ? s.confidence : s.confidence * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Footnote */}
      {summary && (
        <div className="mt-6 pt-4 border-t border-[#E5E5EA] text-xs text-[#6B6B76] leading-relaxed">
          <span className="font-semibold text-[#5B4FE8] mr-1">Divergence Insight:</span>
          {summary}
        </div>
      )}
    </div>
  );
};
