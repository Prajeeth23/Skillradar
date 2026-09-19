import React from 'react';
import { motion } from 'framer-motion';
import { Mission } from '../types';
import { Award, Zap } from 'lucide-react';

interface MissionCompleteOverlayProps {
  mission: Mission | null;
  xp: number;
}

export const MissionCompleteOverlay: React.FC<MissionCompleteOverlayProps> = ({ mission, xp }) => {
  if (!mission) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: -20, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="max-w-sm w-full rounded-3xl border border-cyan-500/40 bg-slate-900/95 p-8 text-center shadow-[0_0_50px_rgba(0,219,231,0.3)] relative overflow-hidden"
      >
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-pink-500/20 blur-2xl rounded-full pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-5 text-cyan-400">
          <Award size={32} />
        </div>

        <span className="text-[10px] font-label-mono text-cyan-400 uppercase tracking-widest block mb-1">
          MISSION OBJECTIVE SECURED
        </span>
        <h3 className="text-xl font-headline-md font-extrabold text-white mb-2">{mission.title}</h3>
        <p className="text-xs text-slate-400 mb-6">{mission.categoryLabel}</p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-label-mono font-bold text-sm">
          <Zap size={16} className="text-amber-400 animate-pulse" />
          +{xp.toLocaleString()} XP CALIBRATED
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MissionCompleteOverlay;
