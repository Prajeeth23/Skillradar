import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface AIAnalysisLoaderProps {
  onComplete?: () => void;
  targetRoleTitle: string;
}

export const AIAnalysisLoader: React.FC<AIAnalysisLoaderProps> = ({
  onComplete,
  targetRoleTitle,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Reading verified employee project experience & task achievements...',
    'Comparing technical proficiencies against role requirements...',
    'Activating Divergence Engine to detect transferable & hidden skills...',
    'Synthesizing competency gap deltas & ranking candidates...',
    'Generating explainable AI match rationales backed by project evidence...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 600);
          }
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-[#111827] border border-indigo-500/40 rounded-2xl p-8 max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Analyzing Organization Skill Profiles</h3>
          <p className="text-xs text-slate-400">Target Role: <span className="text-indigo-400 font-semibold">{targetRoleTitle}</span></p>
        </div>
      </div>

      <div className="space-y-3.5">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                isDone
                  ? 'text-emerald-400 font-medium'
                  : isCurrent
                  ? 'text-white font-semibold'
                  : 'text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className="leading-relaxed">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
