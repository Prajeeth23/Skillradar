import React from 'react';
import { AssessmentQuestion } from '../../types/psychometric';
import { CheckCircle2, Circle } from 'lucide-react';

interface AssessmentQuestionCardProps {
  question: AssessmentQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export const AssessmentQuestionCard: React.FC<AssessmentQuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Progress header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <div className="w-32 sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Prompt */}
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 leading-relaxed">
        {question.question}
      </h2>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letterLabel = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectOption(option.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-semibold text-xs transition-colors ${
                  isSelected
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                }`}
              >
                {letterLabel}
              </div>

              <span
                className={`text-sm leading-relaxed transition-colors flex-1 ${
                  isSelected ? 'text-white font-medium' : 'text-slate-300 group-hover:text-slate-200'
                }`}
              >
                {option.text}
              </span>

              <div className="shrink-0 pt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-700 group-hover:text-slate-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
