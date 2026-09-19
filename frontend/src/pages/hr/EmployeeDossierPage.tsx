import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Briefcase,
  Calendar,
  Building2,
  FolderGit2,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Employee } from '../../types/employee';
import { DivergenceResult } from '../../types/skill';
import { getEmployeeDetailApi } from '../../api/employees';
import { runDivergenceEngineApi } from '../../api/skills';
import { DivergenceVisualizer } from '../../components/skills/DivergenceVisualizer';
import { HiddenSkillCard } from '../../components/skills/HiddenSkillCard';
import { SkillProgressBar } from '../../components/skills/SkillProgressBar';
import { Badge } from '../../components/common/Badge';

export const EmployeeDossierPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [divergenceData, setDivergenceData] = useState<DivergenceResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchDossier = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const emp = await getEmployeeDetailApi(id);
        setEmployee(emp);

        // Pre-populate initial divergence view
        const div = await runDivergenceEngineApi(id);
        setDivergenceData(div);
      } finally {
        setLoading(false);
      }
    };
    fetchDossier();
  }, [id]);

  const handleTriggerDivergence = async () => {
    if (!id) return;
    setAnalyzing(true);
    try {
      const result = await runDivergenceEngineApi(id);
      setDivergenceData(result);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading || !employee) {
    return (
      <div className="py-16 text-center text-slate-400 text-xs">
        Loading employee dossier...
      </div>
    );
  }

  const explicitSkills = employee.skills?.filter((s) => !s.is_hidden) || [];
  const hiddenSkills = employee.skills?.filter((s) => s.is_hidden) || [];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/hr/employees')}
        className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Employee Directory</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-500/20">
            {employee.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold text-white tracking-tight">{employee.name}</h2>
              <Badge variant="primary">{employee.employee_code}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1.5">
              <span className="text-indigo-400 font-semibold">{employee.current_job_title}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {employee.department}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {employee.years_of_experience} years experience
              </span>
            </div>
            {employee.bio && <p className="text-xs text-slate-300 mt-2 max-w-2xl">{employee.bio}</p>}
          </div>
        </div>

        {/* Trigger Divergence Engine CTA */}
        <button
          onClick={handleTriggerDivergence}
          disabled={analyzing}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-500/20 flex items-center gap-2 shrink-0"
        >
          {analyzing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-300" />
          )}
          <span>{analyzing ? 'Scanning Projects...' : 'Run Divergence Engine ✨'}</span>
        </button>
      </div>

      {/* Signature Divergence Flow Visualization */}
      {divergenceData && (
        <DivergenceVisualizer
          officialTitle={employee.current_job_title}
          department={employee.department}
          analyzedProjectsCount={divergenceData.analyzed_projects_count}
          explicitSkills={divergenceData.explicit_skills}
          hiddenSkills={divergenceData.hidden_skills}
          transferableSkills={divergenceData.transferable_skills}
          summary={divergenceData.divergence_summary}
        />
      )}

      {/* Distinctive Section: AI-Discovered Hidden & Transferable Skills */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">AI-Discovered Hidden Skills</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ✨ Divergence Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Capabilities identified from project deliverables that fall beyond their formal job title.
            </p>
          </div>
          <span className="text-xs text-purple-400 font-semibold">{hiddenSkills.length} Capabilities Discovered</span>
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

      {/* Explicit Core Technical Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-base font-bold text-white mb-1">Baseline Role Competencies</h3>
          <p className="text-xs text-slate-400 mb-5">
            Explicit skills directly associated with the {employee.current_job_title} title.
          </p>

          <div className="space-y-4">
            {explicitSkills.map((s) => (
              <SkillProgressBar
                key={s.id}
                skillName={s.skill_name}
                proficiency={s.proficiency}
                isAiDiscovered={false}
              />
            ))}
          </div>
        </div>

        {/* Verified Project Work Activities */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Analyzed Project History</h3>
            <span className="text-xs text-slate-400">{employee.projects?.length || 0} Projects</span>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {employee.projects?.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-white leading-snug">{p.title}</h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">2023–2024</span>
                </div>
                <p className="text-slate-300 mt-1.5 leading-relaxed">{p.description}</p>

                {p.achievements && (
                  <div className="mt-2.5 p-2 bg-indigo-950/20 border border-indigo-500/20 rounded-lg text-indigo-300">
                    <span className="font-semibold text-white mr-1">Achievement:</span>
                    {p.achievements}
                  </div>
                )}

                {p.technologies && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {p.technologies.split(',').map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px]">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
