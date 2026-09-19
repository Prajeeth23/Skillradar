import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { EmployeeRoleMatchCard } from '../../types/matching';
import { getMyRecommendationsApi } from '../../api/matching';

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
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-['Plus_Jakarta_Sans']">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2a14b4] uppercase tracking-wider mb-2">
          <Briefcase className="w-4 h-4 text-[#2a14b4]" />
          <span>Internal Talent Mobility</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1b1f] tracking-tight">
          Recommended Internal Opportunities
        </h1>
        <p className="text-sm text-[#525160] mt-1.5 max-w-2xl">
          Roles actively seeking candidates with your verified work telemetry and AI-discovered transferable skill profile.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#2a14b4] border-t-transparent animate-spin"></div>
          <p className="text-sm text-[#777586] font-mono">Synthesizing internal role matches...</p>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#f8f7fa] border border-[#e3e2e6] text-center text-[#525160]">
          <p className="font-semibold text-[#1b1b1f]">No open role recommendations yet.</p>
          <p className="text-xs text-[#777586] mt-1">Check back as new internal engineering opportunities are posted.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {opportunities.map((opp) => (
            <div
              key={opp.role_id}
              className="bg-white border border-[#e3e2e6]/80 rounded-2xl p-6 shadow-xs hover:border-[#c7c4d7] hover:shadow-sm transition-all space-y-5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e3e2e6]/60">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-[#1b1b1f]">{opp.role_title}</h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        opp.match_score >= 85
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {opp.match_score >= 85 ? 'Exceptional Match' : 'Strong Match'}
                    </span>
                  </div>
                  <p className="text-xs text-[#777586] font-mono mt-1">{opp.department} Department</p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold text-[#2a14b4] font-mono">
                    {opp.match_score.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-[#777586] uppercase font-bold tracking-wider">Match Score</div>
                </div>
              </div>

              {/* Why Matched Box */}
              <div className="p-4 rounded-xl bg-[#f4f1fd]/70 border border-[#e3dfff]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2a14b4] uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#712ae2]" />
                  <span>Why You Are Matched</span>
                </div>
                <p className="text-sm text-[#1b1b1f] leading-relaxed">{opp.explanation}</p>
              </div>

              {/* Skills & Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[11px] font-bold text-[#16a34a] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Matching Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.matching_skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-[#dcfce7]/60 text-[#166534] font-medium border border-[#bbf7d0]"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Growth Areas</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.missing_skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-[#fef3c7]/60 text-[#92400e] font-medium border border-[#fde68a]"
                      >
                        ⚠ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="pt-3 border-t border-[#e3e2e6]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-[#777586]">
                  Discovered via deep telemetry analysis of actual code and RFC contributions.
                </span>
                <button
                  onClick={() => navigate(`/why-arjun`)}
                  className="px-4 py-2 rounded-xl bg-[#2a14b4] hover:bg-[#3b23c9] text-white font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Explore Candidate Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
