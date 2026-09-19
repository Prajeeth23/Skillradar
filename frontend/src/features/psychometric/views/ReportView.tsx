import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePsychometric } from '../PsychometricContext';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';
import { TraitRadarChart } from '../../../components/skills/TraitRadarChart';
import { submitAssessmentApi } from '../../../api/psychometrics';
import { PsychometricAssessment, RadarDataPoint } from '../../../types/psychometric';
import {
  Brain,
  Briefcase,
  Star,
  CheckCircle2,
  Share2,
  Compass,
  ArrowRight,
  Loader2,
  Sparkles,
} from 'lucide-react';

const TRAIT_GROUPS = [
  {
    label: 'Big 5 Personality Profile',
    icon: Brain,
    color: 'from-pink-500 to-rose-500',
    textColor: 'text-pink-400',
    bg: 'bg-pink-500/5',
    border: 'border-pink-500/20',
    traits: [
      { key: 'O', name: 'Openness to Experience' },
      { key: 'C', name: 'Conscientiousness' },
      { key: 'E', name: 'Extraversion' },
      { key: 'A', name: 'Agreeableness' },
      { key: 'STR', name: 'Stress Resilience' },
    ],
  },
  {
    label: 'RIASEC Career Interests',
    icon: Briefcase,
    color: 'from-emerald-400 to-teal-500',
    textColor: 'text-emerald-400',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20',
    traits: [
      { key: 'R', name: 'Realistic (Hands-on)' },
      { key: 'I', name: 'Investigative (Analytical)' },
      { key: 'AR', name: 'Artistic (Creative)' },
      { key: 'SO', name: 'Social (People)' },
      { key: 'EN', name: 'Enterprising (Leadership)' },
      { key: 'CO', name: 'Conventional (Structured)' },
    ],
  },
  {
    label: 'Work Style & Approach Indices',
    icon: Star,
    color: 'from-amber-400 to-orange-500',
    textColor: 'text-amber-400',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
    traits: [
      { key: 'RISK', name: 'Risk Tolerance' },
      { key: 'DEC', name: 'Decisiveness' },
      { key: 'IND', name: 'Autonomy & Independence' },
      { key: 'AMB', name: 'Ambiguity Tolerance' },
    ],
  },
];

const TraitBar: React.FC<{ name: string; score: number; color: string }> = ({ name, score, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-300 font-medium">{name}</span>
      <span className="text-white font-label-mono font-bold">{score}%</span>
    </div>
    <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  </div>
);

import { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ReportView: React.FC = () => {
  const {
    avatar,
    totalXP,
    getAllNormalized,
    getCareerMatches,
    getSkillRadarTraits,
    employeeName,
    token,
    answersSummary,
  } = usePsychometric();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedResult, setSubmittedResult] = useState<PsychometricAssessment | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const scores = getAllNormalized();
  const matches = getCareerMatches();
  const topMatch = matches[0];
  const coreTraits = getSkillRadarTraits();

  const radarData: RadarDataPoint[] = [
    { trait: 'Leadership', score: coreTraits['LEADERSHIP'], fullMark: 100 },
    { trait: 'Adaptability', score: coreTraits['ADAPTABILITY'], fullMark: 100 },
    { trait: 'Analytical Thinking', score: coreTraits['ANALYTICAL_THINKING'], fullMark: 100 },
    { trait: 'Collaboration', score: coreTraits['COLLABORATION'], fullMark: 100 },
  ];

  const handleSyncWithSkillRadar = async () => {
    if (!token) {
      setSubmitError('No assessment token found.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Build summary description
      const summaryText = `Demonstrates strong ${topMatch?.title} alignment (${topMatch?.matchPct}% match). Operator identity: ${avatar?.name || 'Explorer'}. Cognitive strengths: Leadership (${coreTraits['LEADERSHIP']}%), Adaptability (${coreTraits['ADAPTABILITY']}%), Analytical (${coreTraits['ANALYTICAL_THINKING']}%), Collaboration (${coreTraits['COLLABORATION']}%).`;

      // Answer strings array
      const answerList = Object.entries(answersSummary).map(([k, v]) => `${k}:${typeof v === 'object' ? JSON.stringify(v) : v}`);

      const result = await submitAssessmentApi(token, answerList, coreTraits, summaryText);
      setSubmittedResult(result);
    } catch (err: any) {
      console.error('Error submitting assessment:', err);
      setSubmitError('Unable to synchronize results with SkillRadar server. Your answers are retained.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 relative z-20">
      <div className="absolute top-[5%] left-[10%] w-[800px] h-[400px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 mb-10"
        >
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] text-cyan-400 uppercase tracking-widest font-label-mono block">
              FINAL DIAGNOSTIC REPORT • {employeeName.toUpperCase()}
            </span>
            <h1 className="text-3xl md:text-5xl font-headline-md font-extrabold text-white tracking-tight">
              Cognitive Diagnostic Profile
            </h1>
            <p className="text-sm text-slate-400 font-body-base">
              Comprehensive multidimensional evaluation across Big 5, RIASEC, and SkillRadar core competencies.
            </p>
          </div>

          {avatar && (
            <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/10 bg-slate-950/70 shadow-xl flex-shrink-0">
              <span className="text-3xl">{avatar.emoji}</span>
              <div>
                <p className="text-white font-bold text-sm leading-tight">{avatar.name}</p>
                <span className="text-[11px] text-slate-400 font-label-mono tracking-wider block mt-0.5">
                  XP_{totalXP.toLocaleString()} CALIBRATED
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Sync Success or Prompt Banner */}
        {submittedResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="text-emerald-300 font-bold text-sm">
                  Profile Synchronized with SkillRadar Enterprise
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Your psychometric scores have been updated in the employee directory and HR talent graph.
                </p>
              </div>
            </div>
            <Link
              to="/employee"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold font-label-mono uppercase transition-colors"
            >
              Open Dashboard <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="mb-8 p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles size={22} className="text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="text-cyan-200 font-bold text-sm">
                  Ready to finalize your official assessment record?
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Push your cognitive traits directly into SkillRadar for personalized skill matching and career roadmaps.
                </p>
              </div>
            </div>
            <button
              onClick={handleSyncWithSkillRadar}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-label-mono font-bold text-xs uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,219,231,0.3)] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Synchronizing...
                </>
              ) : (
                <>
                  Sync with SkillRadar <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}

        {submitError && (
          <div className="mb-8 p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs">
            {submitError}
          </div>
        )}

        {/* Core Layout: 2 Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: SkillRadar Radar & Top Career Cluster */}
          <div className="lg:col-span-5 space-y-6">
            {/* Top Match Card */}
            {topMatch && (
              <motion.div variants={itemVariants}>
                <NeoCard className="bg-gradient-to-br from-cyan-950/60 to-slate-950/80 border-cyan-500/30 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400 font-label-mono uppercase tracking-widest">
                      PRIMARY CAREER ALIGNMENT
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-label-mono text-xs font-bold border border-cyan-500/30">
                      {topMatch.matchPct}% MATCH
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{topMatch.icon}</span>
                    <div>
                      <h3 className="text-2xl font-headline-md font-extrabold text-white">{topMatch.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{topMatch.desc}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[10px] text-slate-400 font-label-mono uppercase block mb-2">
                      RECOMMENDED ARCHETYPES & ROLES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {topMatch.roles.map((r) => (
                        <span
                          key={r}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-[11px] text-cyan-300 font-medium"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </NeoCard>
              </motion.div>
            )}

            {/* SkillRadar 4-Trait Radar Chart */}
            <motion.div variants={itemVariants}>
              <NeoCard className="bg-slate-950/70 border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass size={16} className="text-cyan-400" />
                    <h3 className="font-headline-md font-bold text-white text-base">SkillRadar Competency Radar</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-label-mono">4-AXIS BENCHMARK</span>
                </div>

                <div className="h-64 flex items-center justify-center">
                  <TraitRadarChart data={radarData} />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs font-label-mono">
                  <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex justify-between">
                    <span className="text-slate-400">LEADERSHIP</span>
                    <span className="text-cyan-300 font-bold">{coreTraits['LEADERSHIP']}%</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex justify-between">
                    <span className="text-slate-400">ADAPTABILITY</span>
                    <span className="text-emerald-300 font-bold">{coreTraits['ADAPTABILITY']}%</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex justify-between">
                    <span className="text-slate-400">ANALYTICAL</span>
                    <span className="text-indigo-300 font-bold">{coreTraits['ANALYTICAL_THINKING']}%</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex justify-between">
                    <span className="text-slate-400">COLLABORATION</span>
                    <span className="text-pink-300 font-bold">{coreTraits['COLLABORATION']}%</span>
                  </div>
                </div>
              </NeoCard>
            </motion.div>
          </div>

          {/* Right Column: Detailed Trait Breakdowns */}
          <div className="lg:col-span-7 space-y-6">
            {TRAIT_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <motion.div key={group.label} variants={itemVariants}>
                  <NeoCard className={`bg-slate-950/70 ${group.border} p-6 space-y-4`}>
                    <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <div className={`p-2 rounded-xl bg-slate-900 ${group.textColor}`}>
                        <Icon size={18} />
                      </div>
                      <h3 className="font-headline-md font-bold text-white text-base">{group.label}</h3>
                    </div>

                    <div className="space-y-3.5">
                      {group.traits.map((t) => (
                        <TraitBar
                          key={t.key}
                          name={t.name}
                          score={scores[t.key] || 50}
                          color={group.color}
                        />
                      ))}
                    </div>
                  </NeoCard>
                </motion.div>
              );
            })}

            {/* Other Career Clusters */}
            <motion.div variants={itemVariants}>
              <NeoCard className="bg-slate-950/70 border-white/10 p-6 space-y-4">
                <h3 className="font-headline-md font-bold text-white text-base">
                  All Evaluated Career Clusters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matches.slice(1).map((cl) => (
                    <div
                      key={cl.id}
                      className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cl.icon}</span>
                        <div>
                          <p className="text-white text-xs font-bold">{cl.title}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{cl.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-label-mono font-bold text-slate-300">{cl.matchPct}%</span>
                    </div>
                  ))}
                </div>
              </NeoCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportView;
