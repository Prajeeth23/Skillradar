import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Sparkles, Briefcase, Users, CheckCircle2, RefreshCw } from 'lucide-react';
import { InternalRole } from '../../types/role';
import { CandidateMatchResult } from '../../types/matching';
import { getRolesApi } from '../../api/roles';
import { matchRoleCandidatesApi } from '../../api/matching';
import { AIAnalysisLoader } from '../../components/matching/AIAnalysisLoader';
import { MatchCandidateCard } from '../../components/matching/MatchCandidateCard';

export const TalentMatchingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState<InternalRole[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [matches, setMatches] = useState<CandidateMatchResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initRoles = async () => {
      setLoading(true);
      try {
        const fetchedRoles = await getRolesApi();
        setRoles(fetchedRoles);

        const paramRoleId = searchParams.get('role');
        if (paramRoleId && fetchedRoles.some((r) => r.id === paramRoleId)) {
          setSelectedRoleId(paramRoleId);
        } else if (fetchedRoles.length > 0) {
          setSelectedRoleId(fetchedRoles[0].id);
        }
      } finally {
        setLoading(false);
      }
    };
    initRoles();
  }, [searchParams]);

  const selectedRole = roles.find((r) => r.id === selectedRoleId);

  const handleRunMatch = () => {
    if (!selectedRoleId) return;
    setIsAnalyzing(true);
    setHasSearched(true);
  };

  const handleAnalysisFinished = async () => {
    try {
      const resp = await matchRoleCandidatesApi(selectedRoleId);
      setMatches(resp.top_matches);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2a14b4] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-[#712ae2]" />
          <span>AI Talent Matching Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1b1f] tracking-tight">
          Discover Internal Talent Beyond Job Titles
        </h1>
        <p className="text-sm text-[#525160] mt-1.5 max-w-2xl">
          Evaluate workforce profiles using the Divergence Engine to uncover non-obvious candidates with verified transferable skills.
        </p>
      </div>

      {/* Role Selection & Execution Banner */}
      <div className="bg-white border border-[#e3e2e6]/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 max-w-xl">
          <label className="block text-xs font-bold text-[#1b1b1f] mb-1.5 uppercase tracking-wider">
            Select Target Internal Opening:
          </label>
          <div className="flex items-center gap-3">
            <select
              value={selectedRoleId}
              onChange={(e) => {
                setSelectedRoleId(e.target.value);
                setSearchParams({ role: e.target.value });
                setHasSearched(false);
              }}
              className="w-full px-4 py-2.5 bg-[#f8f7fa] border border-[#e3e2e6] rounded-xl text-xs text-[#1b1b1f] font-semibold focus:outline-none focus:border-[#2a14b4]"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.department})
                </option>
              ))}
            </select>
          </div>

          {selectedRole && (
            <p className="text-xs text-[#525160] mt-2 line-clamp-2">
              <span className="font-semibold text-[#1b1b1f]">Mandate:</span> {selectedRole.description}
            </p>
          )}
        </div>

        {/* Big Action Button */}
        <button
          onClick={handleRunMatch}
          disabled={isAnalyzing || !selectedRoleId}
          className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-[#2a14b4] hover:bg-[#3b23c9] text-white font-bold text-xs transition-all shadow-md shadow-indigo-950/15 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{hasSearched ? 'Re-Run Matching' : 'Find Internal Talent ✨'}</span>
        </button>
      </div>

      {/* AI Analysis Multi-Step Progress State */}
      {isAnalyzing && (
        <div className="py-8 bg-white border border-[#e3e2e6] rounded-2xl p-6 shadow-xs">
          <AIAnalysisLoader
            targetRoleTitle={selectedRole?.title || 'Selected Role'}
            onComplete={handleAnalysisFinished}
          />
        </div>
      )}

      {/* Ranked Candidate Results */}
      {!isAnalyzing && hasSearched && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#e3e2e6]">
            <div>
              <h3 className="text-xl font-bold text-[#1b1b1f] tracking-tight">
                Ranked Talent Matches ({matches.length})
              </h3>
              <p className="text-xs text-[#777586]">
                Sorted by alignment score, including verified hidden and transferable capabilities.
              </p>
            </div>
            <span className="text-xs text-[#16a34a] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 10 Organization Profiles Evaluated
            </span>
          </div>

          <div className="space-y-5">
            {matches.map((candidate, idx) => (
              <MatchCandidateCard
                key={candidate.employee_id}
                candidate={candidate}
                rank={idx + 1}
                onViewProfile={() => navigate(`/why-arjun`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Initial Guidance Card (Before Search) */}
      {!isAnalyzing && !hasSearched && (
        <div className="border border-dashed border-[#e3e2e6] bg-[#f8f7fa] rounded-2xl p-12 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#f1edfd] text-[#712ae2] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1b1b1f]">Ready to Scan Internal Talent</h3>
          <p className="text-xs text-[#525160] mt-1.5 max-w-sm mx-auto leading-relaxed">
            Click "Find Internal Talent" to activate the Divergence Engine across candidate work activities, generating match scores and explainable rationales.
          </p>
        </div>
      )}
    </div>
  );
};
