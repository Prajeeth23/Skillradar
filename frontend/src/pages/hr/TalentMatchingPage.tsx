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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Talent Matching Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Discover Internal Talent Beyond Job Titles
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate workforce profiles using the Divergence Engine to uncover non-obvious candidates with verified transferable skills.
          </p>
        </div>
      </div>

      {/* Role Selection & Execution Banner */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 max-w-xl">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-indigo-500"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.department})
                </option>
              ))}
            </select>
          </div>

          {selectedRole && (
            <p className="text-xs text-slate-400 mt-2 line-clamp-2">
              <span className="font-semibold text-slate-300">Mandate:</span> {selectedRole.description}
            </p>
          )}
        </div>

        {/* Big Action Button */}
        <button
          onClick={handleRunMatch}
          disabled={isAnalyzing || !selectedRoleId}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2.5 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{hasSearched ? 'Re-Run Matching' : 'Find Internal Talent ✨'}</span>
        </button>
      </div>

      {/* AI Analysis Multi-Step Progress State */}
      {isAnalyzing && (
        <div className="py-8">
          <AIAnalysisLoader
            targetRoleTitle={selectedRole?.title || 'Selected Role'}
            onComplete={handleAnalysisFinished}
          />
        </div>
      )}

      {/* Ranked Candidate Results */}
      {!isAnalyzing && hasSearched && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Ranked Talent Matches ({matches.length})
              </h3>
              <p className="text-xs text-slate-400">
                Sorted by alignment score, including verified hidden and transferable capabilities.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 10 Organization Profiles Evaluated
            </span>
          </div>

          <div className="space-y-5">
            {matches.map((candidate, idx) => (
              <MatchCandidateCard
                key={candidate.employee_id}
                candidate={candidate}
                rank={idx + 1}
                onViewProfile={(empId) => navigate(`/hr/employees/${empId}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Initial Guidance Card (Before Search) */}
      {!isAnalyzing && !hasSearched && (
        <div className="border border-dashed border-slate-800 bg-slate-900/30 rounded-2xl p-12 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Ready to Scan Internal Talent</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            Click "Find Internal Talent" to activate the Divergence Engine across candidate work activities, generating match scores and explainable rationales.
          </p>
        </div>
      )}
    </div>
  );
};
