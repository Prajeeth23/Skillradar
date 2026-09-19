import React, { useState, useEffect } from 'react';
import { Sparkles, Building2, Calendar, FolderGit2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employee } from '../../types/employee';
import { getMyProfileApi } from '../../api/employees';
import { HiddenSkillCard } from '../../components/skills/HiddenSkillCard';
import { SkillProgressBar } from '../../components/skills/SkillProgressBar';
import { Badge } from '../../components/common/Badge';

export const EmployeeProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getMyProfileApi();
        setProfile(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <div className="py-16 text-center text-slate-400 text-xs">
        Loading personal talent profile...
      </div>
    );
  }

  const explicitSkills = profile.skills?.filter((s) => !s.is_hidden) || [];
  const hiddenSkills = profile.skills?.filter((s) => s.is_hidden) || [];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-500/20">
            {profile.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h2>
              <Badge variant="primary">{profile.employee_code}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1.5">
              <span className="text-indigo-400 font-semibold">{profile.current_job_title}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {profile.department}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {profile.years_of_experience} years experience
              </span>
            </div>
            {profile.bio && <p className="text-xs text-slate-300 mt-2 max-w-2xl">{profile.bio}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Skills</div>
            <div className="text-xl font-bold text-white tabular-nums">{profile.total_skills_count}</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-right">
            <div className="text-xs text-purple-400 font-semibold">✨ AI Discovered</div>
            <div className="text-xl font-bold text-purple-300 tabular-nums">{profile.hidden_skills_count}</div>
          </div>
        </div>
      </div>

      {/* AI-Discovered Skills (Prominent Section) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">AI-Discovered Hidden Talents</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ✨ Divergence Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Capabilities extracted from your project achievements that exceed your formal job title.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hiddenSkills.map((s) => (
            <HiddenSkillCard
              key={s.id}
              skillName={s.skill_name}
              category={s.category}
              confidence={s.confidence}
              evidence={s.evidence}
              source={s.source}
              proficiency={s.proficiency}
            />
          ))}
        </div>
      </div>

      {/* Core Explicit Skills & Project History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-base font-bold text-white mb-1">Core Explicit Skills</h3>
          <p className="text-xs text-slate-400 mb-5">Primary responsibilities associated with your position.</p>

          <div className="space-y-4">
            {explicitSkills.map((s) => (
              <SkillProgressBar
                key={s.id}
                skillName={s.skill_name}
                proficiency={s.proficiency}
              />
            ))}
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-base font-bold text-white mb-1">Recent Project History</h3>
          <p className="text-xs text-slate-400 mb-5">Verified deliverables contributing to your skill profile.</p>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {profile.projects?.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <h4 className="font-bold text-white">{p.title}</h4>
                <p className="text-slate-300 mt-1">{p.description}</p>
                {p.achievements && (
                  <p className="mt-2 text-indigo-300 font-medium italic">
                    Achievement: {p.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
