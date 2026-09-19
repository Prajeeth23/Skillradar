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
import { getEmployeePsychometricsApi, sendAssessmentLinkApi } from '../../api/psychometrics';
import { DivergenceVisualizer } from '../../components/skills/DivergenceVisualizer';
import { HiddenSkillCard } from '../../components/skills/HiddenSkillCard';
import { SkillProgressBar } from '../../components/skills/SkillProgressBar';
import { TraitRadarChart } from '../../components/skills/TraitRadarChart';
import { Badge } from '../../components/common/Badge';
import { EmployeePsychometrics } from '../../types/psychometric';
import { Send, Copy, Check, ShieldAlert } from 'lucide-react';

export const EmployeeDossierPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [divergenceData, setDivergenceData] = useState<DivergenceResult | null>(null);
  const [psychometrics, setPsychometrics] = useState<EmployeePsychometrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [sendingAssessment, setSendingAssessment] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

        // Fetch psychometric assessment status
        const psych = await getEmployeePsychometricsApi(id);
        setPsychometrics(psych);
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

  const handleSendAssessment = async () => {
    if (!id) return;
    setSendingAssessment(true);
    try {
      const linkData = await sendAssessmentLinkApi(id);
      setShareUrl(linkData.share_url);
      setPsychometrics((prev) =>
        prev ? { ...prev, status: 'PENDING' } : null
      );
    } finally {
      setSendingAssessment(false);
    }
  };

  const handleCopyLink = () => {
    if (!shareUrl) return;
    const fullUrl = `${window.location.origin}${shareUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
        className="text-xs font-medium text-[#6B6B76] hover:text-[#1A1A1E] flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Employee Directory</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5B4FE8] to-[#712AE2] flex items-center justify-center text-white font-extrabold text-2xl shadow-sm">
            {employee.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">{employee.name}</h2>
              <Badge variant="primary">{employee.employee_code}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B6B76] mt-1.5">
              <span className="text-[#5B4FE8] font-semibold">{employee.current_job_title}</span>
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
            {employee.bio && <p className="text-xs text-[#4B4B55] mt-2 max-w-2xl leading-relaxed">{employee.bio}</p>}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Psychometric Assessment Status / Trigger */}
          {psychometrics?.has_assessment ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#22C55E]/10 text-[#16a34a] border border-[#22C55E]/20 text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              Psychometrics Completed
            </span>
          ) : (
            <button
              onClick={handleSendAssessment}
              disabled={sendingAssessment || psychometrics?.status === 'PENDING'}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                psychometrics?.status === 'PENDING'
                  ? 'bg-amber-500/10 text-amber-700 border-amber-500/20'
                  : 'bg-[#F1F1F4] hover:bg-[#E5E5EA] text-[#1A1A1E] border-[#E5E5EA] cursor-pointer shadow-xs'
              }`}
            >
              {sendingAssessment ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 text-[#5B4FE8]" />
              )}
              <span>
                {psychometrics?.status === 'PENDING'
                  ? 'Assessment Pending'
                  : 'Send Assessment Link'}
              </span>
            </button>
          )}

          {/* Trigger Divergence Engine CTA */}
          <button
            onClick={handleTriggerDivergence}
            disabled={analyzing}
            className="px-4 py-2.5 rounded-xl bg-[#5B4FE8] hover:bg-[#4A3FD1] text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            {analyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-white" />
            )}
            <span>{analyzing ? 'Scanning Telemetry...' : 'Run Synthesis Engine ✨'}</span>
          </button>
        </div>
      </div>

      {/* Share Link Banner when dispatched */}
      {shareUrl && (
        <div className="p-4 bg-[#F4F3FF] border border-[#5B4FE8]/25 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#5B4FE8]/15 text-[#5B4FE8]">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A1E]">Shareable Assessment Link Generated</p>
              <p className="text-[11px] text-[#6B6B76]">
                Send this test link to <span className="text-[#1A1A1E] font-medium">{employee.name}</span> to complete their 6-question evaluation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono bg-[#FFFFFF] px-3 py-1.5 rounded-lg text-[#1A1A1E] border border-[#E5E5EA] truncate max-w-xs">
              {window.location.origin}{shareUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-[#5B4FE8] hover:bg-[#4A3FD1] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Trait Radar Chart Display (if assessment completed) */}
      {psychometrics?.has_assessment && (
        <TraitRadarChart
          data={psychometrics.radar_data}
          summary={psychometrics.assessment?.trait_summary}
        />
      )}

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
              <h3 className="text-lg font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">AI-Discovered Hidden Skills</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/25 font-mono">
                ✨ Synthesis Engine v4.2
              </span>
            </div>
            <p className="text-xs text-[#6B6B76] mt-0.5">
              Capabilities identified from project deliverables that fall beyond their formal job title.
            </p>
          </div>
          <span className="text-xs text-[#5B4FE8] font-semibold font-mono">{hiddenSkills.length} Capabilities Discovered</span>
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
        <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
          <h3 className="text-base font-bold text-[#1A1A1E] mb-1 font-['Plus_Jakarta_Sans']">Baseline Role Competencies</h3>
          <p className="text-xs text-[#6B6B76] mb-5">
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
        <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">Analyzed Telemetry & Project History</h3>
            <span className="text-xs text-[#6B6B76] font-mono">{employee.projects?.length || 0} Sources</span>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {employee.projects?.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-[#F1F1F4] border border-[#E5E5EA] text-xs">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-[#1A1A1E] leading-snug">{p.title}</h4>
                  <span className="text-[10px] text-[#9B9BA5] font-mono whitespace-nowrap">2023–2024</span>
                </div>
                <p className="text-[#4B4B55] mt-1.5 leading-relaxed">{p.description}</p>

                {p.achievements && (
                  <div className="mt-2.5 p-2 bg-[#F4F3FF] border border-[#5B4FE8]/15 rounded-lg text-[#5B4FE8]">
                    <span className="font-semibold text-[#1A1A1E] mr-1">Achievement:</span>
                    {p.achievements}
                  </div>
                )}

                {p.technologies && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {p.technologies.split(',').map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-[#FFFFFF] text-[#4B4B55] border border-[#E5E5EA] rounded text-[10px] font-mono">
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
