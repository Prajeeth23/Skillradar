import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePsychometric } from '../PsychometricContext';
import { AVATARS } from '../psychometricData';
import { NeoButton } from '../components/NeoButton';
import { NeoCard } from '../components/NeoCard';
import { UserCheck, Cpu, ArrowLeft } from 'lucide-react';

const traitLabels: Record<string, string> = {
  O: 'Openness',
  RISK: 'Risk Tolerance',
  C: 'Conscientiousness',
  R: 'Realistic',
  DEC: 'Decisiveness',
  EN: 'Enterprising',
  AR: 'Artistic',
};

export const AvatarSelectView: React.FC = () => {
  const { avatar, selectAvatar, setPhase } = usePsychometric();

  React.useEffect(() => {
    if (!avatar) selectAvatar(AVATARS[0]);
  }, [avatar, selectAvatar]);

  const handleContinue = () => {
    if (!avatar) return;
    setPhase('assessment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Column: Holographic Character Profile Viewer */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setPhase('splash')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-label-mono mb-2 cursor-pointer"
            >
              <ArrowLeft size={13} /> BACK TO DECK
            </button>
            <span className="text-xs text-cyan-400 font-label-mono font-bold tracking-widest uppercase block">
              PROFILE CALIBRATION
            </span>
            <h2 className="text-4xl font-headline-md font-extrabold text-white">Select Core Identity</h2>
            <p className="text-sm text-slate-400 max-w-sm font-body-base">
              Every identity sets the initial calibration baseline for your diagnostic cognitive telemetry.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {avatar && (
              <motion.div
                key={avatar.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <NeoCard className="bg-slate-950/70 border-white/10 p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div
                      className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${avatar.gradient} flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(0,219,231,0.3)] mx-auto border border-white/20`}
                    >
                      {avatar.emoji}
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="text-2xl font-headline-md font-extrabold text-white">{avatar.name}</h3>
                      <p className="text-xs font-label-mono text-cyan-400 tracking-wider uppercase">{avatar.tagline}</p>
                    </div>

                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <span className="text-[10px] text-slate-500 font-label-mono tracking-widest uppercase block">
                        CALIBRATION OFFSETS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(avatar.initTraits).map(([trait, val]) => (
                          <div
                            key={trait}
                            className="px-3 py-1 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-1.5 text-xs text-slate-300 font-label-mono"
                          >
                            <Cpu size={11} className="text-cyan-400" />
                            {traitLabels[trait] || trait}: +{val}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5">
                    <NeoButton variant="primary" size="lg" onClick={handleContinue} className="w-full gap-3">
                      Lock Selection & Initiate <UserCheck size={18} />
                    </NeoButton>
                  </div>
                </NeoCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Grid of Avatars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {AVATARS.map((av) => {
            const isSelected = avatar?.id === av.id;
            return (
              <motion.div
                key={av.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectAvatar(av)}
                className={`relative cursor-pointer rounded-3xl border-2 p-5 h-full transition-all duration-300 flex flex-col gap-4 overflow-hidden
                  ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,219,231,0.25)]'
                      : 'border-white/5 bg-slate-950/40 hover:border-white/20 hover:bg-slate-900/40'
                  }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${av.gradient} transition-opacity duration-300 pointer-events-none ${
                    isSelected ? 'opacity-15' : 'opacity-0'
                  }`}
                />

                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${av.gradient} flex items-center justify-center text-2xl border border-white/10`}
                  >
                    {av.emoji}
                  </div>
                  <div>
                    <h4 className="font-headline-md font-extrabold text-white text-base leading-tight">{av.name}</h4>
                    <span className="text-[10px] text-slate-400 font-label-mono uppercase tracking-widest">
                      {av.tagline.split(' • ')[0]}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed relative z-10 mt-1">
                  Initialize calibration matrix profiles with properties focusing on {av.tagline.toLowerCase()}.
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectView;
