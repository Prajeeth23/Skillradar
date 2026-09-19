import React, { useState, useEffect } from 'react';
import { Sparkles, Building2, Calendar, FolderGit2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Employee } from '../../types/employee';
import { getMyProfileApi } from '../../api/employees';
import { getEmployeePsychometricsApi } from '../../api/psychometrics';
import { HiddenSkillCard } from '../../components/skills/HiddenSkillCard';
import { SkillProgressBar } from '../../components/skills/SkillProgressBar';
import { TraitRadarChart } from '../../components/skills/TraitRadarChart';
import { Badge } from '../../components/common/Badge';
import { EmployeePsychometrics } from '../../types/psychometric';

export const EmployeeProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Employee | null>(null);
  const [psychometrics, setPsychometrics] = useState<EmployeePsychometrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getMyProfileApi();
        setProfile(data);

        if (data?.id) {
          const psych = await getEmployeePsychometricsApi(data.id);
          setPsychometrics(psych);
        }
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
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5B4FE8] to-[#712AE2] flex items-center justify-center text-white font-extrabold text-2xl shadow-sm">
            {profile.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">{profile.name}</h2>
              <Badge variant="primary">{profile.employee_code}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B6B76] mt-1.5">
              <span className="text-[#5B4FE8] font-semibold">{profile.current_job_title}</span>
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
            {profile.bio && <p className="text-xs text-[#4B4B55] mt-2 max-w-2xl leading-relaxed">{profile.bio}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-[#9B9BA5] font-mono">Total Skills</div>
            <div className="text-xl font-bold text-[#1A1A1E] tabular-nums font-['Plus_Jakarta_Sans']">{profile.total_skills_count}</div>
          </div>
          <div className="w-px h-8 bg-[#E5E5EA]" />
          <div className="text-right">
            <div className="text-xs text-[#5B4FE8] font-semibold font-mono">✨ AI Discovered</div>
            <div className="text-xl font-bold text-[#5B4FE8] tabular-nums font-['Plus_Jakarta_Sans']">{profile.hidden_skills_count}</div>
          </div>
        </div>
      </div>

      {/* Behavioral Psychometric Profile (if completed) */}
      {psychometrics?.has_assessment && (
        <TraitRadarChart
          data={psychometrics.radar_data}
          summary={psychometrics.assessment?.trait_summary}
        />
      )}

      {/* AI-Discovered Skills (Prominent Section) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">AI-Discovered Hidden Talents</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/25 font-mono">
                ✨ Synthesis Engine v4.2
              </span>
            </div>
            <p className="text-xs text-[#6B6B76] mt-0.5">
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
        <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
          <h3 className="text-base font-bold text-[#1A1A1E] mb-1 font-['Plus_Jakarta_Sans']">Core Explicit Skills</h3>
          <p className="text-xs text-[#6B6B76] mb-5">Primary responsibilities associated with your position.</p>

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

        <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
          <h3 className="text-base font-bold text-[#1A1A1E] mb-1 font-['Plus_Jakarta_Sans']">Recent Project History</h3>
          <p className="text-xs text-[#6B6B76] mb-5">Verified deliverables contributing to your skill profile.</p>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {profile.projects?.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-[#F1F1F4] border border-[#E5E5EA] text-xs">
                <h4 className="font-bold text-[#1A1A1E]">{p.title}</h4>
                <p className="text-[#4B4B55] mt-1">{p.description}</p>
                {p.achievements && (
                  <p className="mt-2 text-[#5B4FE8] font-medium italic">
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
