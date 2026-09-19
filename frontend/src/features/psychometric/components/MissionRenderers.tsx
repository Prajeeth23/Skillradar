import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePsychometric } from '../PsychometricContext';
import { Mission, ChoiceOption, GridChoice, WorkspaceItem, InternshipChoice, ScenarioChoice, CrisisChoice, MultiStepChoice } from '../types';
import { NeoButton } from './NeoButton';
import { NeoCard } from './NeoCard';
import { Check, CheckCircle2, Lightbulb, MessageSquare, AlertTriangle } from 'lucide-react';

const SHAPE_SVG = {
  sq: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  ci: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  tr: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <polygon points="12,2 22,20 2,20" />
    </svg>
  ),
};

// ─── 1. BASIC CHOICE RENDERER ───────────────────────────────────────────────
export const BasicChoiceRenderer: React.FC<{ mission: Mission }> = ({ mission }) => {
  const { applyTraits, completeMission, recordAnswer } = usePsychometric();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: ChoiceOption) => {
    if (selected) return;
    setSelected(choice.id);
    recordAnswer(mission.id, choice.text);
    applyTraits(choice.traits);
    setTimeout(() => completeMission(mission.id, 0), 800);
  };

  return (
    <div className="flex flex-col gap-3">
      {mission.choices?.map((c, i) => {
        const isSelected = selected === c.id;
        const isDisabled = selected !== null && !isSelected;
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={!selected ? { x: 4 } : {}}
            whileTap={!selected ? { scale: 0.99 } : {}}
            onClick={() => handleSelect(c)}
            className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 relative overflow-hidden flex items-start gap-4
              ${
                isSelected
                  ? 'border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_25px_rgba(0,219,231,0.25)]'
                  : 'border-white/5 bg-slate-950/40 hover:border-cyan-500/30 hover:bg-slate-900/40'
              }
              ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
            `}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                ${isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900/60'}`}
            >
              {isSelected && <Check size={12} strokeWidth={3} />}
            </div>
            <div className="space-y-0.5">
              <p className="text-white text-sm font-semibold leading-relaxed">{c.text}</p>
              {c.subtext && <p className="text-slate-400 text-xs leading-normal">{c.subtext}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── 2. PATTERN GRID RENDERER ───────────────────────────────────────────────
export const PatternGridRenderer: React.FC<{ mission: Mission }> = ({ mission }) => {
  const { applyTraits, recordAptitude, completeMission, recordAnswer } = usePsychometric();
  const [solved, setSolved] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleChoice = (c: GridChoice) => {
    if (solved !== null) return;
    setSolved(c.id);
    recordAnswer(mission.id, `${c.shape}-${c.n}`);
    recordAptitude(c.correct);
    applyTraits(c.correct ? { I: 2, R: 1 } : {});
    setTimeout(() => completeMission(mission.id, 0), 1000);
  };

  return (
    <div className="space-y-6">
      <NeoCard className="bg-slate-950/60 border-white/10 p-6">
        <div className="grid grid-cols-3 gap-3.5 max-w-sm mx-auto">
          {mission.grid?.map((cell, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-2xl border flex flex-wrap items-center justify-center gap-1 p-2 transition-all duration-300
                ${
                  cell === null
                    ? solved
                      ? 'border-cyan-500/60 bg-cyan-500/20 shadow-[0_0_20px_rgba(0,219,231,0.3)]'
                      : 'border-dashed border-cyan-500/40 bg-cyan-500/5 text-xl font-mono text-cyan-400 font-bold'
                    : 'border-white/10 bg-slate-900/60 text-cyan-400'
                }`}
            >
              {cell === null ? (
                solved ? (
                  (() => {
                    const c = mission.choicesForGrid?.find((ch) => ch.id === solved);
                    if (!c) return '?';
                    return Array(c.n)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i} className="animate-pulse">
                          {SHAPE_SVG[c.shape]}
                        </span>
                      ));
                  })()
                ) : (
                  '?'
                )
              ) : (
                Array(cell.n)
                  .fill(0)
                  .map((_, i) => <span key={i}>{SHAPE_SVG[cell.shape]}</span>)
              )}
            </div>
          ))}
        </div>
      </NeoCard>

      <div className="flex justify-start">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition-colors font-label-mono uppercase tracking-wider cursor-pointer"
          >
            <Lightbulb size={13} className="text-amber-400" /> CALIBRATION TIP
          </button>
        ) : (
          <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 font-body-base">
            💡 {mission.hint}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mission.choicesForGrid?.map((c, i) => {
          const isSelected = solved === c.id;
          const isDisabled = solved !== null && !isSelected;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={!solved ? { scale: 1.03 } : {}}
              whileTap={!solved ? { scale: 0.98 } : {}}
              onClick={() => handleChoice(c)}
              className={`cursor-pointer rounded-2xl border p-4 flex flex-wrap justify-center items-center gap-1 min-h-[70px] transition-all duration-300
                ${
                  isSelected
                    ? 'border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,219,231,0.25)] text-cyan-300'
                    : 'border-white/5 bg-slate-950/40 hover:border-white/15 hover:bg-slate-900/40 text-cyan-400'
                }
                ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
              `}
            >
              {Array(c.n)
                .fill(0)
                .map((_, j) => (
                  <span key={j}>{SHAPE_SVG[c.shape]}</span>
                ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─── 3. WORKSPACE BUILDER RENDERER ──────────────────────────────────────────
export const WorkspaceBuilderRenderer: React.FC<{ mission: Mission }> = ({ mission }) => {
  const { applyTraits, completeMission, recordAnswer } = usePsychometric();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState<boolean>(false);
  const max = mission.maxSelections || 5;

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < max) {
        next.add(id);
      }
      return next;
    });
  };

  const submit = () => {
    if (selected.size !== max || submitted) return;
    setSubmitted(true);
    const selectedItems = mission.items?.filter((i) => selected.has(i.id)) || [];
    recordAnswer(mission.id, selectedItems.map((i) => i.label));
    selectedItems.forEach((i) => applyTraits(i.traits));
    setTimeout(() => completeMission(mission.id, 0), 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="text-xs text-slate-400 font-label-mono tracking-widest uppercase">CATALOGUE SELECTOR</span>
        <span
          className={`text-xs font-label-mono font-bold px-3 py-1 rounded-full border 
          ${
            selected.size === max
              ? 'text-pink-400 border-pink-500/20 bg-pink-500/10 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
              : 'text-slate-500 border-white/5 bg-slate-900/40'
          }`}
        >
          {selected.size} / {max} LOCKED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-2">
        {mission.items?.map((item: WorkspaceItem, i: number) => {
          const isSelected = selected.has(item.id);
          const isDisabled = !isSelected && selected.size >= max;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={!submitted && !isDisabled ? { scale: 1.01 } : {}}
              whileTap={!submitted && !isDisabled ? { scale: 0.99 } : {}}
              onClick={() => toggle(item.id)}
              className={`flex items-center gap-4 cursor-pointer rounded-2xl border p-4 transition-all duration-300
                ${
                  isSelected
                    ? 'border-pink-500/50 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.2)]'
                    : 'border-white/5 bg-slate-950/40 hover:border-white/15'
                }
                ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
              `}
            >
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-white font-bold text-sm truncate leading-snug">{item.label}</p>
                <p className="text-slate-400 text-xs truncate mt-0.5">{item.desc}</p>
              </div>
              {isSelected && <CheckCircle2 className="text-pink-400 flex-shrink-0" size={18} />}
            </motion.div>
          );
        })}
      </div>

      <NeoButton
        variant={selected.size === max ? 'rose' : 'slate'}
        size="md"
        disabled={selected.size !== max || submitted}
        onClick={submit}
        className="w-full"
      >
        Lock Workspace Modules ({selected.size}/{max})
      </NeoButton>
    </div>
  );
};

// ─── 4. INTERNSHIP CARDS RENDERER ───────────────────────────────────────────
export const InternshipCardsRenderer: React.FC<{ mission: Mission }> = ({ mission }) => {
  const { applyTraits, completeMission, recordAnswer } = usePsychometric();
  const [selected, setSelected] = useState<string | null>(null);

  const handle = (c: InternshipChoice) => {
    if (selected) return;
    setSelected(c.id);
    recordAnswer(mission.id, c.title);
    applyTraits(c.traits);
    setTimeout(() => completeMission(mission.id, 0), 900);
  };

  const choices = mission.internshipChoices || [];

  return (
    <div
      className={`grid gap-4 ${
        choices.length <= 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {choices.map((c, i) => {
        const isSelected = selected === c.id;
        const isDisabled = selected !== null && !isSelected;
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={!selected ? { y: -5, scale: 1.01 } : {}}
            whileTap={!selected ? { scale: 0.98 } : {}}
            onClick={() => handle(c)}
            style={{ boxShadow: isSelected ? `0 0 35px ${c.glow}` : undefined }}
            className={`relative cursor-pointer rounded-3xl border p-5 overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[220px]
              ${
                isSelected
                  ? `border-white/30 bg-slate-900/80`
                  : `border-white/5 bg-slate-950/40 hover:border-white/20`
              }
              ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
            `}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-${
                isSelected ? '25' : '10'
              } transition-opacity pointer-events-none`}
            />
            {isSelected && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
                <Check size={14} className="text-white" />
              </div>
            )}

            <div className="relative z-10 space-y-4">
              <div className="text-4xl">{c.icon}</div>
              <div className="space-y-1">
                <h3 className="font-headline-md font-extrabold text-white text-base leading-snug">{c.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{c.desc}</p>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-white/5">
              {c.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-slate-400 font-label-mono">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── 5. SCENARIO CHAT RENDERER ──────────────────────────────────────────────
export const ScenarioRenderer: React.FC<{ mission: Mission }> = ({ mission }) => {
  const { applyTraits, completeMission, recordAnswer } = usePsychometric();
  const [selected, setSelected] = useState<string | null>(null);
  const [branchActive, setBranchActive] = useState<boolean>(false);

  const character = mission.character;
  const choices = mission.scenarioChoices || [];

  const handleChoice = (c: ScenarioChoice) => {
    if (selected) return;
    setSelected(c.id);
    recordAnswer(mission.id, c.text);
    applyTraits(c.traits);
    if (c.branch) {
      setTimeout(() => setBranchActive(true), 800);
    } else {
      setTimeout(() => completeMission(mission.id, 0), 2000);
    }
  };

  const chosenChoice = selected ? choices.find((c) => c.id === selected) : null;

  const finishBranch = () => {
    if (chosenChoice?.branch) {
      applyTraits(chosenChoice.branch.bonusTraits);
      completeMission(mission.id, chosenChoice.branch.bonusXP);
    }
  };

  if (!character) return null;

  return (
    <div className="space-y-6">
      <NeoCard className="bg-slate-950/60 border-white/10 overflow-hidden p-0 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-slate-950/40">
          <div className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-lg">
            {character.avatar}
          </div>
          <div>
            <p className="font-bold text-white text-xs leading-none">{character.name}</p>
            <p className="text-[10px] text-slate-400 font-label-mono mt-1 uppercase tracking-widest">{character.role}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-label-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            SECURE LINK
          </div>
        </div>

        <div className="px-5 py-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <MessageSquare size={13} className="text-slate-500" />
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-label-mono">{character.context}</p>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-base flex-shrink-0">
              {character.avatar}
            </div>
            <div className="bg-slate-900/80 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              <p className="text-slate-200 text-sm leading-relaxed">{character.message}</p>
            </div>
          </div>

          {selected && chosenChoice && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
              <div className="bg-indigo-600/80 border border-indigo-400/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm shadow-[0_4px_12px_rgba(99,102,241,0.25)]">
                <p className="text-white text-sm leading-relaxed">{chosenChoice.text}</p>
              </div>
            </motion.div>
          )}

          {selected && chosenChoice && chosenChoice.response && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-base flex-shrink-0">
                {character.avatar}
              </div>
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm">
                <p className="text-slate-300 text-sm leading-relaxed italic">{chosenChoice.response}</p>
              </div>
            </motion.div>
          )}
        </div>
      </NeoCard>

      {/* Choices list if branch is not active */}
      {!branchActive && (
        <div className="space-y-2.5">
          {choices.map((c) => {
            const isSelected = selected === c.id;
            const isDisabled = selected !== null && !isSelected;
            return (
              <motion.div
                key={c.id}
                whileHover={!selected ? { x: 4 } : {}}
                whileTap={!selected ? { scale: 0.99 } : {}}
                onClick={() => handleChoice(c)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300
                  ${
                    isSelected
                      ? 'border-indigo-500/60 bg-indigo-500/15 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                      : 'border-white/5 bg-slate-950/40 hover:border-white/15 hover:bg-slate-900/40'
                  }
                  ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
                `}
              >
                <p className="text-white font-semibold text-sm leading-relaxed">{c.text}</p>
                <p className="text-slate-400 text-xs mt-1">{c.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Branching modal / narrative card */}
      <AnimatePresence>
        {branchActive && chosenChoice?.branch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-3xl border border-indigo-500/30 bg-slate-950/90 p-6 space-y-5 shadow-[0_0_40px_rgba(99,102,241,0.25)]"
          >
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] text-indigo-400 font-label-mono tracking-widest uppercase">
                COMMUNICATION RESOLUTION
              </span>
              <h4 className="text-lg font-bold text-white mt-1">{chosenChoice.branch.title}</h4>
            </div>

            <div className="space-y-3">
              {chosenChoice.branch.narrative.map((p, idx) => (
                <p key={idx} className="text-slate-300 text-sm leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="text-xs text-emerald-300 font-medium">✨ {chosenChoice.branch.resolution}</p>
              <span className="text-[10px] font-label-mono text-emerald-400 mt-1 block">
                BONUS EARNED: +{chosenChoice.branch.bonusXP} XP
              </span>
            </div>

            <NeoButton variant="indigo" size="md" onClick={finishBranch} className="w-full">
              Proceed to Next Mission
            </NeoButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── 6. BUDGET SIMULATION RENDERER ──────────────────────────────────────────
export const BudgetSimRenderer: React.FC<{ mission: Mission }> = ({ mission }) => {
  const { applyTraits, completeMission, recordAnswer } = usePsychometric();
  const [phase, setPhase] = useState<1 | 2>(1); // 1 = sliders, 2 = crisis
  const [crisisChosen, setCrisisChosen] = useState<string | null>(null);

  const defaultAllocations: Record<string, number> = {};
  mission.categories?.forEach((c) => {
    defaultAllocations[c.id] = c.defaultPct;
  });
  const [allocations, setAllocations] = useState<Record<string, number>>(defaultAllocations);

  const handleSliderChange = (catId: string, val: string) => {
    setAllocations((prev) => ({
      ...prev,
      [catId]: parseInt(val, 10) || 0,
    }));
  };

  const totalPct = Object.values(allocations).reduce((sum, v) => sum + v, 0);
  const isAllocationValid = totalPct === 100;
  const budgetTotal = mission.budget || 20000;
  const totalAmount = Math.round((totalPct / 100) * budgetTotal);

  const handleCrisis = (c: CrisisChoice) => {
    if (crisisChosen) return;
    setCrisisChosen(c.id);
    recordAnswer(mission.id, { allocations, crisis: c.text });
    applyTraits(c.traits);
    setTimeout(() => completeMission(mission.id, 0), 1200);
  };

  if (phase === 1) {
    return (
      <div className="space-y-6">
        <div
          className={`rounded-2xl border p-4 flex items-center justify-between transition-all duration-300
          ${
            isAllocationValid
              ? 'border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              : 'border-amber-500/30 bg-amber-500/10'
          }`}
        >
          <div>
            <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-label-mono">TOTAL ALLOCATED</span>
            <span className="text-xl font-label-mono font-extrabold text-white">
              ₹{totalAmount.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-slate-400">/ ₹{budgetTotal.toLocaleString('en-IN')}</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-label-mono">ALLOCATION SUM</span>
            <span className={`text-xl font-label-mono font-extrabold ${isAllocationValid ? 'text-emerald-400' : 'text-amber-400'}`}>
              {totalPct}%
            </span>
          </div>
        </div>

        {!isAllocationValid && (
          <p className="text-xs text-amber-400 text-center animate-pulse font-label-mono flex items-center justify-center gap-1">
            <AlertTriangle size={13} /> ALLOCATION BALANCE MUST EQUAL EXACTLY 100%
          </p>
        )}

        <div className="space-y-5">
          {mission.categories?.map((cat) => {
            const pct = allocations[cat.id] || 0;
            const amount = Math.round((pct / 100) * budgetTotal);
            return (
              <div key={cat.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                    <span className="text-lg">{cat.icon}</span> {cat.label}
                  </span>
                  <span className="text-white font-label-mono text-sm font-bold">
                    ₹{amount.toLocaleString('en-IN')}{' '}
                    <span className="text-slate-400 text-xs font-normal font-label-mono">({pct}%)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pct}
                  onChange={(e) => handleSliderChange(cat.id, e.target.value)}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        <NeoButton
          variant={isAllocationValid ? 'amber' : 'slate'}
          size="md"
          disabled={!isAllocationValid}
          onClick={() => setPhase(2)}
          className="w-full"
        >
          Confirm Allocation Balance & Continue
        </NeoButton>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4">
        <p className="text-rose-400 font-bold text-xs uppercase tracking-wider mb-1 font-label-mono flex items-center gap-1.5">
          <AlertTriangle size={14} /> {mission.crisisTitle}
        </p>
        <p className="text-slate-200 text-sm leading-relaxed">{mission.crisisEvent}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {mission.crisisChoices?.map((c, i) => {
          const isSelected = crisisChosen === c.id;
          const isDisabled = crisisChosen !== null && !isSelected;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={!crisisChosen ? { scale: 1.02 } : {}}
              whileTap={!crisisChosen ? { scale: 0.98 } : {}}
              onClick={() => handleCrisis(c)}
              className={`cursor-pointer rounded-2xl border p-4 flex items-center gap-4 transition-all duration-300
                ${
                  isSelected
                    ? 'border-amber-500/60 bg-amber-500/15 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                    : 'border-white/5 bg-slate-950/40 hover:border-white/15 hover:bg-slate-900/40'
                }
                ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
              `}
            >
              <span className="text-3xl">{c.icon}</span>
              <div>
                <p className="text-white font-bold text-sm leading-none">{c.text}</p>
                <p className="text-slate-400 text-xs mt-1.5 leading-none">{c.subtext}</p>
              </div>
              {isSelected && <CheckCircle2 className="ml-auto text-amber-400 flex-shrink-0" size={18} />}
            </motion.div>
          );
        })}
      </div>

      {crisisChosen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-emerald-400 font-semibold text-xs font-label-mono uppercase tracking-wider pt-2"
        >
          ✓ Calibrating resolution strategy...
        </motion.p>
      )}
    </motion.div>
  );
};

// ─── 7. MULTI-STEP RENDERER ────────────────────────────────────────────────
export const MultiStepRenderer: React.FC<{ mission: Mission }> = ({ mission }) => {
  const { applyTraits, completeMission, recordAnswer } = usePsychometric();
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [stepSelected, setStepSelected] = useState<string | null>(null);

  const steps = mission.steps || [];
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const handleStepChoice = (c: MultiStepChoice) => {
    if (stepSelected) return;
    setStepSelected(c.text);
    applyTraits(c.traits);
    setTimeout(() => {
      if (isLast) {
        recordAnswer(mission.id, c.text);
        completeMission(mission.id, 0);
      } else {
        setStepSelected(null);
        setStepIndex((prev) => prev + 1);
      }
    }, 700);
  };

  if (!step) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-5"
      >
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500
                ${
                  i < stepIndex
                    ? 'bg-cyan-500'
                    : i === stepIndex
                    ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,219,231,0.6)]'
                    : 'bg-slate-800'
                }`}
            />
          ))}
        </div>

        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-label-mono block mb-1">
            {step.title}
          </span>
          <h3 className="text-xl font-headline-md font-extrabold text-white leading-snug">{step.prompt}</h3>
        </div>

        <div className="space-y-2.5">
          {step.choices.map((c, i) => {
            const isSelected = stepSelected === c.text;
            const isDisabled = stepSelected !== null && !isSelected;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={!stepSelected ? { x: 5 } : {}}
                whileTap={!stepSelected ? { scale: 0.99 } : {}}
                onClick={() => handleStepChoice(c)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300
                  ${
                    isSelected
                      ? 'border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,219,231,0.25)]'
                      : 'border-white/5 bg-slate-950/40 hover:border-white/15 hover:bg-slate-900/40'
                  }
                  ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
                `}
              >
                <p className="text-white font-bold text-sm leading-snug">{c.text}</p>
                <p className="text-slate-400 text-xs mt-1 leading-normal">{c.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
