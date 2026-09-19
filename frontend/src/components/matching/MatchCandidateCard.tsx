import React, { useState } from 'react';
import { CandidateMatchResult } from '../../types/matching';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, UserCheck, Quote } from 'lucide-react';

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

  return (
    <div className="bg-white border border-[#e3e2e6]/80 hover:border-[#c7c4d7] rounded-2xl p-6 transition-all duration-200 shadow-xs relative overflow-hidden group">
      {/* Top Banner: Rank, Name, Role, and Match Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e3e2e6]/60">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#f0eff4] border border-[#e3e2e6] flex items-center justify-center font-bold text-sm text-[#2a14b4]">
            #{rank}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h4 className="text-lg font-bold text-[#1b1b1f] tracking-tight">{candidate.employee_name}</h4>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  candidate.match_score >= 85
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}
              >
                {candidate.match_score >= 85 ? 'Exceptional Match' : 'Strong Match'}
              </span>
            </div>
            <p className="text-xs text-[#777586] mt-0.5">
              Current Title: <span className="text-[#1b1b1f] font-semibold">{candidate.current_job_title}</span> • {candidate.department}
            </p>
          </div>
        </div>

        {/* Big Score Indicator */}
        <div className="text-right flex items-center sm:block gap-2">
          <div className="text-3xl font-extrabold text-[#2a14b4] font-mono tabular-nums tracking-tight">
            {candidate.match_score.toFixed(1)}%
          </div>
          <div className="text-[10px] text-[#777586] uppercase font-bold tracking-wider">Match Score</div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        {/* Matching Skills */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-2.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Matching Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.matching_skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[#dcfce7]/60 text-[#166534] font-medium border border-[#bbf7d0]"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skill Gaps */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#d97706] uppercase tracking-wider mb-2.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Development Gaps</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.missing_skills.length === 0 ? (
              <span className="text-xs text-[#777586] italic">No critical skill gaps identified</span>
            ) : (
              candidate.missing_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[#fef3c7]/60 text-[#92400e] font-medium border border-[#fde68a]"
                >
                  ⚠ {skill}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Flagship Feature: Why this Match? AI Explanation */}
      <div className="p-4 rounded-xl bg-[#f4f1fd]/70 border border-[#e3dfff] mb-5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2a14b4] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-[#712ae2]" />
          <span>Why this candidate matches</span>
        </div>
        <p className="text-sm text-[#1b1b1f] leading-relaxed">
          {candidate.explanation}
        </p>

        {/* Evidence quotes (if expanded) */}
        {showFullExplanation && candidate.evidence && candidate.evidence.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-[#e3dfff] space-y-2">
            <div className="text-[11px] font-bold text-[#712ae2] uppercase tracking-wider flex items-center gap-1">
              <Quote className="w-3 h-3 text-[#712ae2]" />
              <span>Verified Project Evidence Cited by AI</span>
            </div>
            {candidate.evidence.map((ev, i) => (
              <div key={i} className="text-xs text-[#1b1b1f] italic bg-white p-2.5 rounded-lg border border-[#e3e2e6]">
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
          className="text-xs font-bold text-[#2a14b4] hover:text-[#3b23c9] transition-colors cursor-pointer"
        >
          {showFullExplanation ? 'Hide Evidence' : 'Show Verified Evidence →'}
        </button>

        <div className="flex items-center gap-2">
          {onViewProfile && (
            <button
              onClick={() => onViewProfile(candidate.employee_id)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#3b23c9] rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>View Match Dossier</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
