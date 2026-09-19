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
    <div className="bg-gradient-to-b from-[#111827] to-[#0D121F] border border-indigo-500/25 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>SkillRadar Proprietary Divergence Engine</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Nominal Role vs. Demonstrated Talent</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Analysis Coverage</span>
          <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 justify-end mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{analyzedProjectsCount} Verified Projects Analyzed</span>
          </div>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Step 1: Official Nominal Baseline */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>Official Nominal Role</span>
          </div>
          <div className="text-lg font-bold text-white mb-1">{officialTitle}</div>
          <p className="text-xs text-slate-400">{department} Department</p>

          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-400 uppercase font-semibold mb-2">Expected Baseline:</div>
            <div className="flex flex-wrap gap-1.5">
              {explicitSkills.slice(0, 3).map((s) => (
                <span
                  key={s.name}
                  className="px-2 py-0.5 text-xs bg-slate-800 text-slate-300 rounded border border-slate-700"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Transition Indicator */}
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <div className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-2 flex items-center gap-1.5 shadow-sm">
            <FileCode className="w-3.5 h-3.5" />
            <span>Actual Work & Achievements</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 shadow-inner">
            <ArrowDown className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-[11px] text-slate-400 mt-2 max-w-[180px]">
            Contrasting project deliverables with nominal title
          </div>
        </div>

        {/* Step 2: Beyond Titles (Hidden & Transferable Capabilities) */}
        <div className="bg-gradient-to-br from-purple-950/30 via-slate-900/90 to-indigo-950/30 border border-purple-500/40 rounded-xl p-5 shadow-lg relative">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Beyond Official Role</span>
            </div>
            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
              DISCOVERED
            </span>
          </div>

          <div className="space-y-2 mt-3">
            {[...hiddenSkills, ...transferableSkills].slice(0, 3).map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-purple-500/20 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✨</span>
                  <span className="font-semibold text-white">{s.name}</span>
                </div>
                <span className="text-[11px] text-purple-300 font-medium">{Math.round(s.confidence * 100)}% conf</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      {summary && (
        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
          <span className="font-semibold text-white mr-1.5">AI Divergence Summary:</span>
          {summary}
        </div>
      )}
    </div>
  );
};
