import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePsychometric } from '../PsychometricContext';
import { Mission } from '../types';
import {
  BasicChoiceRenderer,
  PatternGridRenderer,
  WorkspaceBuilderRenderer,
  InternshipCardsRenderer,
  ScenarioRenderer,
  BudgetSimRenderer,
  MultiStepRenderer,
} from '../components/MissionRenderers';
import { MissionCompleteOverlay } from '../components/MissionCompleteOverlay';
import { X, ZoomIn } from 'lucide-react';

export const AssessmentMissionView: React.FC = () => {
  const {
    missions,
    missionIndex,
    currentMission,
    avatar,
    totalXP,
    setPhase,
    employeeName,
  } = usePsychometric();

  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [completedMission, setCompletedMission] = useState<Mission | null>(null);
  const [pendingXP, setPendingXP] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const prevMissionRef = useRef<number>(missionIndex);

  useEffect(() => {
    if (missionIndex > prevMissionRef.current) {
      const prevMission = missions[prevMissionRef.current];
      setCompletedMission(prevMission || null);
      setPendingXP(prevMission?.xpReward || 0);
      setShowComplete(true);
      prevMissionRef.current = missionIndex;

      const timer = setTimeout(() => {
        setShowComplete(false);
        if (missionIndex >= missions.length) {
          setPhase('analysis');
        }
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [missionIndex, missions, setPhase]);

  useEffect(() => {
    if (missionIndex >= missions.length) {
      setPhase('analysis');
    }
  }, [missionIndex, missions.length, setPhase]);

  if (!currentMission) return null;

  const progress = (missionIndex / missions.length) * 100;

  const renderMissionContent = () => {
    switch (currentMission.type) {
      case 'basic_choice':
        return <BasicChoiceRenderer mission={currentMission} />;
      case 'pattern_grid':
        return <PatternGridRenderer mission={currentMission} />;
      case 'workspace_builder':
        return <WorkspaceBuilderRenderer mission={currentMission} />;
      case 'internship_cards':
        return <InternshipCardsRenderer mission={currentMission} />;
      case 'scenario':
        return <ScenarioRenderer mission={currentMission} />;
      case 'budget_sim':
        return <BudgetSimRenderer mission={currentMission} />;
      case 'multi_step':
        return <MultiStepRenderer mission={currentMission} />;
      default:
        return <p className="text-slate-500">Unknown mission type.</p>;
    }
  };

  return (
    <div className="min-h-screen pb-16 relative z-20">
      {/* Top Navigation Anchor */}
      <header className="fixed top-0 w-full border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 h-20 z-40 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 border border-cyan-500/50 flex items-center justify-center bg-cyan-500/10 text-2xl rounded-xl">
            {avatar?.emoji || '🧭'}
          </div>
          <div>
            <p className="font-label-mono text-[11px] text-slate-400 uppercase tracking-widest">
              Operator • {employeeName}
            </p>
            <h1 className="font-headline-md text-xl md:text-2xl text-cyan-300 tracking-tight uppercase leading-none font-bold">
              {avatar?.name || 'OPERATOR_ID_0X4492'}
            </h1>
          </div>
        </div>

        {/* Segmented Progress HUD */}
        <div className="hidden md:flex flex-col items-center gap-1.5">
          <div className="flex gap-1 segmented-progress">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={i < Math.floor(progress / 10) ? '' : 'inactive'} />
            ))}
          </div>
          <p className="font-label-mono text-[11px] text-cyan-400 animate-pulse tracking-widest">
            SYSTEM_SYNC: {Math.round(progress)}%
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-label-mono text-[11px] text-pink-400 uppercase tracking-widest">Experience</p>
            <p className="font-data-numeric text-[15px] font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,219,231,0.8)]">
              XP_{totalXP.toLocaleString()}
            </p>
          </div>
        </div>
      </header>

      {/* Main Mission Execution Zone */}
      <main className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4 md:p-6 pt-28 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMission.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl"
          >
            {/* Mission Card with Cyber Gradient Border */}
            <div className="gradient-border-mask shadow-2xl">
              <div className="glass-card flex flex-col md:flex-row min-h-[380px]">
                {/* Left Column: Mission Details */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 border border-pink-500/40 px-3 py-1 bg-pink-500/10 rounded-lg">
                      <span className="font-label-mono text-[11px] text-pink-300 uppercase font-semibold">
                        [ MISSION_OBJECTIVE_0{currentMission.number} ]
                      </span>
                      <span className="text-[10px] text-slate-400 font-label-mono">• {currentMission.categoryLabel}</span>
                    </div>

                    <h2 className="font-headline-md text-3xl md:text-4xl text-white tracking-tight uppercase font-extrabold">
                      {currentMission.title}
                    </h2>

                    <p className="text-slate-300 font-body-base max-w-lg leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {currentMission.setup}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-400 font-label-mono">
                    <span>STAGE {currentMission.number} / {missions.length}</span>
                    <span className="text-cyan-400 font-semibold">REWARD: +{currentMission.xpReward} XP</span>
                  </div>
                </div>

                {/* Right Column: Visual Preview */}
                {currentMission.imageUrl && (
                  <div
                    className="flex-1 relative overflow-hidden group cursor-pointer min-h-[250px] md:min-h-auto bg-slate-950 flex items-center justify-center"
                    onClick={() => setSelectedImage(currentMission.imageUrl || null)}
                  >
                    <img
                      alt="Mission visual telemetry"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      src={currentMission.imageUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                    <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                      <div className="text-cyan-400 font-label-mono text-[10px] tracking-widest border border-cyan-500/40 px-2.5 py-1 bg-cyan-950/60 rounded">
                        TELEMETRY READY
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white">
                      <ZoomIn size={13} className="text-cyan-400" /> Click to enlarge visual
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mission Interactive Options */}
            <div className="mt-8 w-full max-w-3xl mx-auto relative z-30">
              {renderMissionContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mission Complete Overlay */}
      <AnimatePresence>
        {showComplete && (
          <MissionCompleteOverlay mission={completedMission} xp={pendingXP} />
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl p-4 md:p-12"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged visual aid"
              className="w-auto h-auto max-w-full max-h-full rounded-2xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,219,231,0.4)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssessmentMissionView;
