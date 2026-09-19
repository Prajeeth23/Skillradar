import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Sparkles,
  Briefcase,
  GitMerge,
  ArrowRight,
  TrendingUp,
  UserCheck,
  AlertCircle,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';

export const HRDashboard: React.FC = () => {
  const navigate = useNavigate();

  const workforceSkills = [
    { name: 'Python', count: 42, pct: 85, color: 'bg-indigo-500' },
    { name: 'SQL Analytics', count: 36, pct: 72, color: 'bg-blue-500' },
    { name: 'REST APIs', count: 31, pct: 62, color: 'bg-cyan-500' },
    { name: 'UX Collaboration', count: 24, pct: 48, color: 'bg-purple-500', isHidden: true },
    { name: 'CI/CD Pipelines', count: 21, pct: 42, color: 'bg-emerald-500', isHidden: true },
    { name: 'Technical Mentorship', count: 18, pct: 36, color: 'bg-amber-500', isHidden: true },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Talent Intelligence Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time workforce capability discovery and internal mobility matching.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/hr/discovery')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Find Internal Talent</span>
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Employees"
          value="128"
          icon={Users}
          change="+8 this quarter"
          color="indigo"
          description="Across 6 departments"
        />
        <StatCard
          label="Skills Identified"
          value="436"
          icon={Sparkles}
          change="+64 AI Discovered"
          color="purple"
          description="Verified with project evidence"
        />
        <StatCard
          label="Internal Roles"
          value="12"
          icon={Briefcase}
          change="4 Priority Openings"
          color="amber"
          description="Targeting internal transfer"
        />
        <StatCard
          label="Potential Talent Matches"
          value="34"
          icon={GitMerge}
          change="86% avg top match"
          color="emerald"
          description="High alignment detected"
        />
      </div>

      {/* Main Grid: Workforce Skills + AI Talent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Workforce Skills Distribution */}
        <div className="lg:col-span-2 bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Workforce Skills Inventory</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribution of verified explicit and AI-discovered transferable skills.
              </p>
            </div>
            <span className="text-xs text-indigo-400 font-medium cursor-pointer hover:underline" onClick={() => navigate('/hr/employees')}>
              View Directory →
            </span>
          </div>

          <div className="space-y-4">
            {workforceSkills.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{s.name}</span>
                    {s.isHidden && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        ✨ Hidden Talent
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 tabular-nums font-medium">
                    {s.count} practitioners ({s.pct}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${s.color}`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Talent Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">AI Talent Alerts</h3>
            <span className="text-xs font-semibold text-purple-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Live
            </span>
          </div>

          {/* Alert Card 1: New Talent Match */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-sm relative group">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <Badge variant="primary" size="sm">
                New Talent Match
              </Badge>
              <span className="text-[10px] text-slate-400 ml-auto">10m ago</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              3 employees match the newly created Product Engineer (Fintech) opening.
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Top candidate Marcus Vance (Backend Dev) demonstrated transferable UX collaboration, yielding an 86.5% match.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => navigate('/hr/discovery')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <span>View Candidate Matches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Alert Card 2: Hidden Skill Discovered */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 shadow-sm relative group">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <Badge variant="purple" size="sm">
                Hidden Skill Discovered
              </Badge>
              <span className="text-[10px] text-slate-400 ml-auto">1h ago</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Divergence Engine detected CI/CD and DevOps in QA Engineer Elena Rostova.
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Verified by GitHub Actions standard workflow project deliverables.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => navigate('/hr/employees/emp-1002')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <span>Inspect Employee Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
