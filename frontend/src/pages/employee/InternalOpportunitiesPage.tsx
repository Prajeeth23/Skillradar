import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { EmployeeRoleMatchCard } from '../../types/matching';
import { getMyRecommendationsApi } from '../../api/matching';
import { Badge } from '../../components/common/Badge';

export const InternalOpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<EmployeeRoleMatchCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const data = await getMyRecommendationsApi();
        setOpportunities(data);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <span>Internal Talent Mobility</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Recommended Internal Opportunities
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Roles actively seeking candidates with your verified and transferable skill profile.
        </p>
      </div>

      <div className="space-y-5">
        {opportunities.map((opp) => (
          <div
            key={opp.role_id}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700/80 transition-all space-y-5"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white">{opp.role_title}</h3>
                  <Badge variant={opp.match_score >= 85 ? 'success' : 'primary'} size="sm">
                    {opp.match_score >= 85 ? 'Exceptional Match' : 'Strong Match'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{opp.department} Department</p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-extrabold text-indigo-400 tabular-nums">
                  {opp.match_score.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Match Score</div>
              </div>
            </div>

            {/* Why Matched Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/30 to-purple-950/20 border border-indigo-500/25">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Why You Are Matched</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{opp.explanation}</p>
            </div>

            {/* Skills & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Matching Skills</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {opp.matching_skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Growth Areas</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {opp.missing_skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      ⚠ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Recommended Next Step: Bridge frontend state gap via pair programming.
              </span>
              <button
                onClick={() => navigate(`/employee/skill-gap?role=${opp.role_id}`)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>View Skill-Gap Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
