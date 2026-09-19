import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Award,
  GitFork,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { SkillProgressBar } from '../../components/skills/SkillProgressBar';
import { getMyRecommendationsApi } from '../../api/matching';
import { EmployeeRoleMatchCard } from '../../types/matching';
import { Badge } from '../../components/common/Badge';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<EmployeeRoleMatchCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      try {
        const data = await getMyRecommendationsApi();
        setRecommendations(data);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  const employeeSkills = [
    { name: 'Python', pct: 92, isAi: false },
    { name: 'REST APIs & FastAPI', pct: 88, isAi: false },
    { name: 'PostgreSQL Database', pct: 84, isAi: false },
    { name: 'UX Collaboration', pct: 78, isAi: true },
    { name: 'Technical Mentorship', pct: 82, isAi: true },
    { name: 'Production Incident Triage', pct: 86, isAi: true },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Personal Career Intelligence</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Good morning, {user?.name || 'Arun'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Your SkillRadar talent profile is active with verified and AI-discovered transferable skills.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Skills Identified"
          value="24"
          icon={Sparkles}
          change="+3 AI Discovered"
          color="indigo"
          description="Verified capabilities"
        />
        <StatCard
          label="Strong Skills"
          value="12"
          icon={Award}
          change="Proficiency > 80%"
          color="emerald"
          description="High confidence"
        />
        <StatCard
          label="Development Areas"
          value="5"
          icon={GitFork}
          change="2 High Priority"
          color="amber"
          description="Target role gaps"
        />
        <StatCard
          label="Internal Opportunities"
          value="4"
          icon={Briefcase}
          change="86.5% Top Match"
          color="purple"
          description="Recommended roles"
        />
      </div>

      {/* Main Grid: My Skill Profile vs Recommended Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: My Skill Profile */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">My Skill Profile</h3>
              <p className="text-xs text-slate-400">Core proficiencies & discovered capabilities</p>
            </div>
            <button
              onClick={() => navigate('/employee/skills')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {employeeSkills.map((s) => (
              <SkillProgressBar
                key={s.name}
                skillName={s.name}
                proficiency={4}
                percentage={s.pct}
                isAiDiscovered={s.isAi}
              />
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/25 text-xs text-slate-300 flex items-start gap-2.5">
            <span className="text-amber-400 text-sm shrink-0">✨</span>
            <p className="leading-relaxed">
              <span className="font-semibold text-white">Transferable strengths:</span> Your recent checkout redesign and mentorship work unlocked high-confidence abilities in UX collaboration and technical leadership.
            </p>
          </div>
        </div>

        {/* Right: Recommended Internal Roles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Recommended Opportunities</h3>
              <p className="text-xs text-slate-400">Internal roles tailored to your demonstrated talents</p>
            </div>
            <button
              onClick={() => navigate('/employee/opportunities')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Explore All →
            </button>
          </div>

          <div className="space-y-4">
            {recommendations.slice(0, 2).map((rec) => (
              <div
                key={rec.role_id}
                className="bg-[#111827] border border-slate-800 rounded-2xl p-5 hover:border-slate-700/80 transition-all shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{rec.role_title}</h4>
                      <Badge variant={rec.match_score >= 85 ? 'success' : 'primary'} size="sm">
                        {rec.match_score >= 85 ? 'Exceptional Match' : 'Strong Match'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{rec.department} Department</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-indigo-400 tabular-nums">
                      {rec.match_score.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Match Score</div>
                  </div>
                </div>

                {/* Why Matched Snippet */}
                <div className="mt-3.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-indigo-300 mr-1.5">Why you match:</span>
                  {rec.explanation}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{rec.matching_skills.slice(0, 2).join(', ')}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/employee/skill-gap?role=${rec.role_id}`)}
                    className="font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Analyze Skill Gap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
