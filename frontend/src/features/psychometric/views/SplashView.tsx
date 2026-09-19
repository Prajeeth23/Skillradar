import React from 'react';
import { motion } from 'framer-motion';
import { usePsychometric } from '../PsychometricContext';
import { NeoButton } from '../components/NeoButton';
import { NeoCard } from '../components/NeoCard';
import { Sparkles, ArrowRight, Brain, BarChart3, Heart, Terminal, Compass, Eye } from 'lucide-react';

const DOMAINS = [
  { icon: Brain, label: 'Aptitude', desc: 'Logical & Spatial Diagnostics', color: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(34,211,238,0.15)]', border: 'border-cyan-500/20' },
  { icon: Sparkles, label: 'Personality', desc: 'Behavioral Mapping Metrics', color: 'text-pink-400', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]', border: 'border-pink-500/20' },
  { icon: BarChart3, label: 'Career Interest', desc: 'Role Clustering Analysis', color: 'text-emerald-400', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]', border: 'border-emerald-500/20' },
  { icon: Heart, label: 'Emotional Intelligence', desc: 'Interpersonal Capacity Index', color: 'text-violet-400', glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]', border: 'border-violet-500/20' },
  { icon: Compass, label: 'Career Approach', desc: 'Resourcefulness & Entrepreneurship', color: 'text-amber-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]', border: 'border-amber-500/20' },
];

import { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const SplashView: React.FC = () => {
  const { setPhase, employeeName } = usePsychometric();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-[8%] left-[10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Branding & Introduction */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold tracking-wide font-label-mono">
              <Terminal size={13} className="text-cyan-400" />
              SYSTEM DIAGNOSTICS DECK • {employeeName.toUpperCase()}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-headline-md font-extrabold tracking-tight leading-[1.05] bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              The Divergence
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Engine
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-body-base">
              An immersive branching-narrative psychometric evaluator. Step into 10 diagnostic mission simulations,
              manage high-stakes crises, build your workspace, and calibrate your cognitive traits.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 items-center flex-wrap pt-2">
            <NeoButton
              variant="primary"
              size="lg"
              onClick={() => setPhase('avatar')}
              className="gap-3 group max-w-xs"
            >
              Initiate System <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </NeoButton>
            <div className="flex gap-2 items-center text-xs text-slate-400 font-label-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM STATUS: CALIBRATED
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 w-full max-w-md mt-4 border-t border-white/5 pt-6">
            {[
              ['10 Stages', 'Missions'],
              ['5 Domains', 'Dimensions'],
              ['1:1 Profile', 'Mapping'],
            ].map(([val, lbl]) => (
              <div key={lbl} className="space-y-1">
                <span className="text-xl font-extrabold text-white block font-headline-md">{val}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider block font-label-mono">{lbl}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Diagnostic Domains Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          className="lg:col-span-5 w-full"
        >
          <NeoCard className="bg-slate-950/70 border-white/10 p-6 space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs text-slate-400 font-label-mono font-bold tracking-widest uppercase">
                  DIAGNOSTIC MATRIX
                </span>
              </div>
              <span className="text-xs text-slate-500 font-label-mono">V2.4</span>
            </div>

            <div className="space-y-3">
              {DOMAINS.map((dom, i) => {
                const Icon = dom.icon;
                return (
                  <motion.div
                    key={dom.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className={`flex items-center gap-4 p-3.5 rounded-2xl border bg-slate-900/50 transition-colors hover:bg-slate-900/80 ${dom.border} ${dom.glow}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl bg-slate-950/80 border ${dom.border} flex items-center justify-center ${dom.color}`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white leading-tight">{dom.label}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{dom.desc}</p>
                    </div>
                    <Eye size={14} className="ml-auto text-slate-600" />
                  </motion.div>
                );
              })}
            </div>
          </NeoCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashView;
