import React from 'react';
import { AssessmentQuestion } from '../../types/psychometric';
import { CheckCircle2, Circle, Zap, ShieldAlert, Sparkles, Target } from 'lucide-react';

interface AssessmentQuestionCardProps {
  question: AssessmentQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

const getTagColor = (tag?: string) => {
  switch (tag?.toLowerCase()) {
    case 'leadership':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'adaptability':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'analytical':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'collaboration':
      return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
    default:
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
  }
};

export const AssessmentQuestionCard: React.FC<AssessmentQuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
}) => {
  const missionTitle = question.title || `Mission ${currentIndex + 1}`;
  const domainText = question.domain || `Domain ${currentIndex + 1} • Behavioral Competence`;
  const xpReward = question.xp_reward || 100;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Background neon ambient highlight */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            {domainText}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            +{xpReward} XP
          </div>
          <span className="text-xs font-mono font-medium text-slate-400">
            MISSION {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress Bar with glowing indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
          <span className="font-mono text-[11px] text-slate-400">PROGRESS STATUS</span>
          <span className="font-mono text-indigo-400 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Mission Scenario Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">
            {missionTitle}
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Decision Directives / Options List */}
      <div className="space-y-3.5">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letterLabel = String.fromCharCode(65 + idx); // A, B, C, D
          const tagStyle = getTagColor(option.tag);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectOption(option.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-600/15 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                  : 'bg-slate-950/60 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-400" />
              )}

              {/* Letter Key Pill */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                  isSelected
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                }`}
              >
                {letterLabel}
              </div>

              {/* Option Text & Subtext */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-sm leading-relaxed transition-colors ${
                      isSelected ? 'text-white font-medium' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {option.text}
                  </span>
                  {option.tag && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${tagStyle}`}
                    >
                      {option.tag}
                    </span>
                  )}
                </div>

                {option.subtext && (
                  <p className="text-xs text-slate-400 leading-snug mt-1">
                    {option.subtext}
                  </p>
                )}
              </div>

              {/* Checkbox Icon */}
              <div className="shrink-0 pt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-700 group-hover:text-slate-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
