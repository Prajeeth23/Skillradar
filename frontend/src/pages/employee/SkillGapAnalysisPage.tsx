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
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5B4FE8] uppercase tracking-wider mb-1 font-mono">
          <GitFork className="w-4 h-4 text-[#5B4FE8]" />
          <span>Competency Delta & Learning Roadmap</span>
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">
          Target Role Skill-Gap Analysis
        </h2>
        <p className="text-xs text-[#6B6B76] mt-1">
          Select any open internal role to measure your transition readiness and generate tailored development tracks.
        </p>
      </div>

      {/* Role Selector Card */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <label className="block text-xs font-semibold text-[#1A1A1E] mb-1.5 font-['Plus_Jakarta_Sans']">
            Target Career Role:
          </label>
          <select
            value={selectedRoleId}
            onChange={(e) => {
              setSelectedRoleId(e.target.value);
              setSearchParams({ role: e.target.value });
            }}
            className="w-full px-3.5 py-2.5 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] font-medium focus:outline-none focus:border-[#5B4FE8]"
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
          className="px-5 py-2.5 rounded-xl bg-[#5B4FE8] hover:bg-[#4A3FD1] text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>{analyzing ? 'Analyzing Gaps...' : 'Analyze Skill Gap'}</span>
        </button>
      </div>

      {/* Gap Analysis Results */}
      {analysis && (
        <div className="space-y-8">
          {/* Readiness Meter Hero */}
          <div className="bg-gradient-to-r from-[#F4F3FF] via-[#FFFFFF] to-[#F4F3FF] border border-[#5B4FE8]/20 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-[#5B4FE8] uppercase tracking-wider font-mono">
                Readiness Assessment
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1E] mt-1 font-['Plus_Jakarta_Sans']">
                Fit for {analysis.target_role_title}
              </h3>
              <p className="text-xs text-[#6B6B76] mt-1 max-w-md leading-relaxed">
                Based on your existing engineering depth and discovered transferable vectors, you satisfy key required competencies.
              </p>
            </div>

            {/* Circular/Big percentage badge */}
            <div className="flex items-center gap-4 bg-[#FFFFFF] border border-[#5B4FE8]/30 px-6 py-4 rounded-2xl shadow-xs">
              <div className="text-4xl font-extrabold text-[#5B4FE8] tabular-nums font-['Plus_Jakarta_Sans']">
                {analysis.readiness_score}%
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#1A1A1E] uppercase tracking-wider font-mono">Role Readiness</div>
                <div className="text-[11px] text-[#16a34a] font-semibold">Strong Foundation</div>
              </div>
            </div>
          </div>

          {/* Comparison: You Already Have vs Skills to Develop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* You Already Have */}
            <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#16a34a] uppercase tracking-wider mb-4 font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>You Already Have ({analysis.existing_skills.length})</span>
              </div>
              <div className="space-y-2.5">
                {analysis.existing_skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F1F1F4] border border-[#E5E5EA] text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span className="font-semibold text-[#1A1A1E]">{skill}</span>
                    </div>
                    <Badge variant="success" size="sm">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills to Develop */}
            <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-4 font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Skills to Develop ({analysis.skill_gaps.length})</span>
              </div>
              <div className="space-y-2.5">
                {analysis.skill_gaps.map((gap) => (
                  <div
                    key={gap.skill_name}
                    className="p-3 rounded-xl bg-[#F1F1F4] border border-[#E5E5EA] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1A1A1E]">{gap.skill_name}</span>
                      <Badge variant={gap.priority === 'HIGH' ? 'danger' : 'warning'} size="sm">
                        {gap.priority} Priority
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#6B6B76] font-mono">
                      <span>Current: Level {gap.current_level}/5</span>
                      <span>Required: Level {gap.required_level}/5</span>
                      <span className="text-rose-600 font-semibold">Gap: -{gap.gap_level}</span>
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
                <h3 className="text-lg font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">
                  Recommended Development Roadmap
                </h3>
                <p className="text-xs text-[#6B6B76] mt-0.5">
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
