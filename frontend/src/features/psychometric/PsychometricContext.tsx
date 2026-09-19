import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AvatarOption, Mission, CareerCluster } from './types';
import {
  AVATARS,
  MISSIONS,
  normalizeTrait,
  computeCareerMatches,
  computeSkillRadarCoreTraits,
  RANGES,
} from './psychometricData';

interface RawTraits {
  aptitudeCorrect: number;
  aptitudeTotal: number;
  O: number;
  C: number;
  E: number;
  A: number;
  STR: number;
  R: number;
  I: number;
  AR: number;
  SO: number;
  EN: number;
  CO: number;
  RISK: number;
  DEC: number;
  IND: number;
  AMB: number;
  [key: string]: number;
}

const initialRaw: RawTraits = {
  aptitudeCorrect: 0,
  aptitudeTotal: 2,
  O: 0,
  C: 0,
  E: 0,
  A: 0,
  STR: 0,
  R: 0,
  I: 0,
  AR: 0,
  SO: 0,
  EN: 0,
  CO: 0,
  RISK: 0,
  DEC: 0,
  IND: 0,
  AMB: 0,
};

export type AssessmentPhase = 'splash' | 'avatar' | 'assessment' | 'analysis' | 'report';

interface PsychometricContextType {
  phase: AssessmentPhase;
  setPhase: (phase: AssessmentPhase) => void;
  avatar: AvatarOption | null;
  selectAvatar: (avatar: AvatarOption) => void;
  missionIndex: number;
  setMissionIndex: React.Dispatch<React.SetStateAction<number>>;
  totalXP: number;
  completedIds: string[];
  missions: Mission[];
  currentMission: Mission | null;
  applyTraits: (deltas?: Record<string, number> | null) => void;
  recordAptitude: (correct: boolean) => void;
  completeMission: (missionId: string, bonusXP?: number) => void;
  getAllNormalized: () => Record<string, number>;
  getAptitudeScore: () => number;
  getCareerMatches: () => CareerCluster[];
  getSkillRadarTraits: () => Record<string, number>;
  employeeName: string;
  setEmployeeName: (name: string) => void;
  token?: string;
  answersSummary: Record<string, any>;
  recordAnswer: (missionId: string, answer: any) => void;
}

const PsychometricContext = createContext<PsychometricContextType | null>(null);

export const PsychometricProvider: React.FC<{
  children: React.ReactNode;
  initialEmployeeName?: string;
  token?: string;
}> = ({ children, initialEmployeeName = 'Team Member', token }) => {
  const [phase, setPhase] = useState<AssessmentPhase>('splash');
  const [avatar, setAvatar] = useState<AvatarOption | null>(AVATARS[0]);
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const [totalXP, setTotalXP] = useState<number>(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [raw, setRaw] = useState<RawTraits>({ ...initialRaw });
  const [employeeName, setEmployeeName] = useState<string>(initialEmployeeName);
  const [answersSummary, setAnswersSummary] = useState<Record<string, any>>({});

  const applyTraits = useCallback((deltas?: Record<string, number> | null) => {
    if (!deltas) return;
    setRaw((prev) => {
      const next = { ...prev };
      Object.entries(deltas).forEach(([k, v]) => {
        if (k in next) {
          next[k] = (next[k] || 0) + v;
        } else {
          next[k] = v;
        }
      });
      return next;
    });
  }, []);

  const recordAptitude = useCallback((correct: boolean) => {
    if (correct) {
      setRaw((prev) => ({ ...prev, aptitudeCorrect: prev.aptitudeCorrect + 1 }));
    }
  }, []);

  const completeMission = useCallback((missionId: string, bonusXP = 0) => {
    const mission = MISSIONS.find((m) => m.id === missionId);
    const xp = (mission?.xpReward || 0) + bonusXP;
    setTotalXP((prev) => prev + xp);
    setCompletedIds((prev) => (prev.includes(missionId) ? prev : [...prev, missionId]));
    setMissionIndex((prev) => prev + 1);
  }, []);

  const recordAnswer = useCallback((missionId: string, answer: any) => {
    setAnswersSummary((prev) => ({ ...prev, [missionId]: answer }));
  }, []);

  const getAllNormalized = useCallback((): Record<string, number> => {
    const keys = Object.keys(RANGES);
    const out: Record<string, number> = {};
    keys.forEach((k) => {
      out[k] = normalizeTrait(raw[k] || 0, k);
    });
    return out;
  }, [raw]);

  const getAptitudeScore = useCallback((): number => {
    return Math.round((raw.aptitudeCorrect / raw.aptitudeTotal) * 100);
  }, [raw]);

  const getCareerMatches = useCallback((): CareerCluster[] => {
    const scores = getAllNormalized();
    return computeCareerMatches(scores);
  }, [getAllNormalized]);

  const getSkillRadarTraits = useCallback((): Record<string, number> => {
    const scores = getAllNormalized();
    return computeSkillRadarCoreTraits(scores);
  }, [getAllNormalized]);

  const selectAvatar = useCallback(
    (av: AvatarOption) => {
      setAvatar(av);
      if (av.initTraits) {
        applyTraits(av.initTraits);
      }
    },
    [applyTraits]
  );

  const currentMission = useMemo(() => {
    return MISSIONS[missionIndex] || null;
  }, [missionIndex]);

  return (
    <PsychometricContext.Provider
      value={{
        phase,
        setPhase,
        avatar,
        selectAvatar,
        missionIndex,
        setMissionIndex,
        totalXP,
        completedIds,
        missions: MISSIONS,
        currentMission,
        applyTraits,
        recordAptitude,
        completeMission,
        getAllNormalized,
        getAptitudeScore,
        getCareerMatches,
        getSkillRadarTraits,
        employeeName,
        setEmployeeName,
        token,
        answersSummary,
        recordAnswer,
      }}
    >
      {children}
    </PsychometricContext.Provider>
  );
};

export const usePsychometric = (): PsychometricContextType => {
  const ctx = useContext(PsychometricContext);
  if (!ctx) {
    throw new Error('usePsychometric must be used inside a PsychometricProvider');
  }
  return ctx;
};
