import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePsychometric } from '../PsychometricContext';
import { Cpu, Check } from 'lucide-react';

const STEPS = [
  'Aptitude Profile',
  'Personality Mapping',
  'Career Interest Alignment',
  'Work Style Analysis',
  'Emotional Intelligence Index',
  'Career Match Computation',
];

export const AnalysisView: React.FC = () => {
  const { totalXP, setPhase } = usePsychometric();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 750);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('report'), 900);
      return () => clearTimeout(t);
    }
  }, [step, setPhase]);

  const pct = Math.round((step / STEPS.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full space-y-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-cyan-500/15 border-2 border-cyan-400/40 text-cyan-400 mb-4 mx-auto shadow-[0_0_30px_rgba(0,219,231,0.3)]">
            <Cpu size={36} className="animate-pulse" />
          </div>
          <h2 className="text-3xl font-headline-md font-extrabold text-white tracking-tight">
            Analysing Cognitive Profile
          </h2>
          <p className="text-slate-400 mt-2 text-sm font-body-base">
            Synthesizing {totalXP.toLocaleString()} XP worth of situational mission decisions...
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-label-mono">
            <span>DIAGNOSTIC MATRIX CALIBRATING</span>
            <span className="text-cyan-400 font-bold">{pct}%</span>
          </div>
          <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 rounded-full"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Diagnostic Steps List */}
        <div className="space-y-2.5 text-left">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step - 1;
            return (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -16 }}
                animate={i < step ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300
                  ${
                    active
                      ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,219,231,0.15)]'
                      : done
                      ? 'border-slate-800 bg-slate-900/40'
                      : 'border-transparent opacity-40'
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors
                  ${done ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'}`}
                >
                  {done ? <Check size={12} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-sm font-medium ${done ? 'text-slate-200' : 'text-slate-500'}`}>
                  {s}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
