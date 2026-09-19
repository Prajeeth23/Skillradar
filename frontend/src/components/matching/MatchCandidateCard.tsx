import React, { useState } from 'react';
import { CandidateMatchResult } from '../../types/matching';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, UserCheck, Quote } from 'lucide-react';
import { Badge } from '../common/Badge';

interface MatchCandidateCardProps {
  candidate: CandidateMatchResult;
  rank: number;
  onViewProfile?: (employeeId: string) => void;
}

export const MatchCandidateCard: React.FC<MatchCandidateCardProps> = ({
  candidate,
  rank,
  onViewProfile,
}) => {
  const [showFullExplanation, setShowFullExplanation] = useState(false);

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { variant: 'success' as const, label: 'Exceptional Match' };
    if (score >= 70) return { variant: 'primary' as const, label: 'Strong Match' };
    return { variant: 'warning' as const, label: 'Moderate Match' };
  };

  const badge = getScoreBadge(candidate.match_score);

  return (
    <div className="bg-[#111827] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 shadow-md relative overflow-hidden group">
      {/* Top Banner: Rank, Name, Role, and Match Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-indigo-400">
            #{rank}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-white tracking-tight">{candidate.employee_name}</h4>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Current Title: <span className="text-slate-200 font-medium">{candidate.current_job_title}</span> • {candidate.department}
            </p>
          </div>
        </div>

        {/* Big Score Indicator */}
        <div className="text-right flex items-center sm:block gap-2">
          <div className="text-3xl font-extrabold text-indigo-400 tabular-nums tracking-tight">
            {candidate.match_score.toFixed(1)}%
          </div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Match Score</div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        {/* Matching Skills */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Matching Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.matching_skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skill Gaps */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Development Gaps</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.missing_skills.length === 0 ? (
              <span className="text-xs text-slate-500 italic">No critical skill gaps identified</span>
            ) : (
              candidate.missing_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20"
                >
                  ⚠ {skill}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Flagship Feature: Why this Match? AI Explanation */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/30 via-slate-900/60 to-purple-950/20 border border-indigo-500/30 mb-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Why this candidate matches</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          {candidate.explanation}
        </p>

        {/* Evidence quotes (if expanded) */}
        {showFullExplanation && candidate.evidence && candidate.evidence.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-indigo-500/20 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Quote className="w-3 h-3 text-indigo-400" />
              <span>Verified Project Evidence Cited by AI</span>
            </div>
            {candidate.evidence.map((ev, i) => (
              <div key={i} className="text-xs text-slate-300 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                "{ev}"
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setShowFullExplanation(!showFullExplanation)}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {showFullExplanation ? 'Hide Evidence' : 'Show Verified Evidence →'}
        </button>

        <div className="flex items-center gap-2">
          {onViewProfile && (
            <button
              onClick={() => onViewProfile(candidate.employee_id)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>View Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
