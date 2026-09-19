import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GitFork, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import { InternalRole } from '../../types/role';
import { SkillGapAnalysis } from '../../types/skillGap';
import { getRolesApi } from '../../api/roles';
import { analyzeSkillGapApi } from '../../api/skillGap';
import { LearningRecCard } from '../../components/career/LearningRecCard';
import { Badge } from '../../components/common/Badge';

export const SkillGapAnalysisPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [roles, setRoles] = useState<InternalRole[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const fetchedRoles = await getRolesApi();
        setRoles(fetchedRoles);

        const paramRole = searchParams.get('role');
        const activeRoleId = paramRole && fetchedRoles.some((r) => r.id === paramRole)
          ? paramRole
          : (fetchedRoles[0]?.id || '');

        setSelectedRoleId(activeRoleId);
        if (activeRoleId) {
          const res = await analyzeSkillGapApi(activeRoleId);
          setAnalysis(res);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [searchParams]);

  const handleRunAnalysis = async () => {
    if (!selectedRoleId) return;
    setAnalyzing(true);
    try {
      const res = await analyzeSkillGapApi(selectedRoleId);
      setAnalysis(res);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <GitFork className="w-4 h-4 text-indigo-400" />
          <span>Competency Delta & Learning Roadmap</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Target Role Skill-Gap Analysis
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Select any open internal role to measure your transition readiness and generate tailored development tracks.
        </p>
      </div>

      {/* Role Selector Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Target Career Role:
          </label>
          <select
            value={selectedRoleId}
            onChange={(e) => {
              setSelectedRoleId(e.target.value);
              setSearchParams({ role: e.target.value });
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

        <button
          onClick={handleRunAnalysis}
          disabled={analyzing || !selectedRoleId}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{analyzing ? 'Analyzing Gaps...' : 'Analyze Skill Gap'}</span>
        </button>
      </div>

      {/* Gap Analysis Results */}
      {analysis && (
        <div className="space-y-8">
          {/* Readiness Meter Hero */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Readiness Assessment
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Fit for {analysis.target_role_title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Based on your existing backend engineering depth and discovered UX empathy, you satisfy 4 out of 6 key competencies.
              </p>
            </div>

            {/* Circular/Big percentage badge */}
            <div className="flex items-center gap-4 bg-slate-900/90 border border-indigo-500/40 px-6 py-4 rounded-2xl shadow-inner">
              <div className="text-4xl font-extrabold text-indigo-400 tabular-nums">
                {analysis.readiness_score}%
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Role Readiness</div>
                <div className="text-[11px] text-emerald-400 font-medium">Strong Foundation</div>
              </div>
            </div>
          </div>

          {/* Comparison: You Already Have vs Skills to Develop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* You Already Have */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>You Already Have ({analysis.existing_skills.length})</span>
              </div>
              <div className="space-y-2.5">
                {analysis.existing_skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="font-semibold text-white">{skill}</span>
                    </div>
                    <Badge variant="success" size="sm">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills to Develop */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>Skills to Develop ({analysis.skill_gaps.length})</span>
              </div>
              <div className="space-y-2.5">
                {analysis.skill_gaps.map((gap) => (
                  <div
                    key={gap.skill_name}
                    className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{gap.skill_name}</span>
                      <Badge variant={gap.priority === 'HIGH' ? 'danger' : 'warning'} size="sm">
                        {gap.priority} Priority
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Current: Level {gap.current_level}/5</span>
                      <span>Required: Level {gap.required_level}/5</span>
                      <span className="text-rose-400 font-semibold">Gap: -{gap.gap_level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Learning Roadmap */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Recommended Development Roadmap
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Actionable learning tracks to bridge your competency gaps for {analysis.target_role_title}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.recommended_development_areas.map((rec, i) => (
                <LearningRecCard
                  key={i}
                  title={rec.title}
                  description={rec.description}
                  resourceType={rec.resource_type}
                  priority={rec.priority}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
