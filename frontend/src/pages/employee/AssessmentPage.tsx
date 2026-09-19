import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAssessmentByTokenApi, submitAssessmentApi } from '../../api/psychometrics';
import { AssessmentQuestion, PsychometricAssessment, RadarDataPoint } from '../../types/psychometric';
import { AssessmentQuestionCard } from '../../components/skills/AssessmentQuestionCard';
import { TraitRadarChart } from '../../components/skills/TraitRadarChart';
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle, Compass, Loader2 } from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employeeName, setEmployeeName] = useState<string>('Team Member');
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedResult, setCompletedResult] = useState<PsychometricAssessment | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setErrorMsg('Invalid assessment link.');
      setIsLoading(false);
      return;
    }

    getAssessmentByTokenApi(token)
      .then((data) => {
        setEmployeeName(data.employee_name);
        setQuestions(data.questions);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMsg('Unable to load assessment questions. Link may be invalid or expired.');
        setIsLoading(false);
      });
  }, [token]);

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!token) return;

    // Collate answers in question order
    const orderedAnswers: string[] = [];
    for (let i = 0; i < questions.length; i++) {
      const ans = answers[i];
      if (!ans) {
        alert(`Please provide an answer for Question ${i + 1} before submitting.`);
        setCurrentIdx(i);
        return;
      }
      orderedAnswers.push(ans);
    }

    setIsSubmitting(true);
    try {
      const result = await submitAssessmentApi(token, orderedAnswers);
      setCompletedResult(result);
    } catch (e) {
      alert('Error submitting assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-slate-300 p-4">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Loading psychometric evaluation...</p>
      </div>
    );
  }

  if (errorMsg || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-slate-300 p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <Compass className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Assessment Unavailable</h2>
          <p className="text-sm text-slate-400 mb-6">{errorMsg || 'No questions available.'}</p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-colors"
          >
            Return to SkillRadar
          </Link>
        </div>
      </div>
    );
  }

  // Completion view
  if (completedResult) {
    const scoresMap: Record<string, number> = {};
    completedResult.trait_scores.forEach((ts) => {
      scoresMap[ts.trait] = ts.score;
    });

    const radarData: RadarDataPoint[] = [
      { trait: 'Leadership', score: scoresMap['LEADERSHIP'] || 0, fullMark: 100 },
      { trait: 'Adaptability', score: scoresMap['ADAPTABILITY'] || 0, fullMark: 100 },
      { trait: 'Analytical Thinking', score: scoresMap['ANALYTICAL_THINKING'] || 0, fullMark: 100 },
      { trait: 'Collaboration', score: scoresMap['COLLABORATION'] || 0, fullMark: 100 },
    ];

    return (
      <div className="min-h-screen bg-[#0B0F19] py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header banner */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Assessment Completed!
            </h1>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Thank you, <span className="text-white font-medium">{employeeName}</span>. Your responses
              have been analyzed and incorporated into your SkillRadar profile.
            </p>
          </div>

          {/* Radar Chart Display */}
          <TraitRadarChart
            data={radarData}
            summary={completedResult.trait_summary}
            className="mb-8"
          />

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/employee/profile"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-500/20"
            >
              View Full Skill Profile
            </Link>
            <Link
              to="/employee"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeQuestion = questions[currentIdx];
  const isSelected = !!answers[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;

  return (
    <div className="min-h-screen bg-[#0B0F19] py-10 px-4 sm:px-6 flex flex-col justify-between">
      {/* Top Navbar */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            SR
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            SkillRadar
          </span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 ml-1">
            Psychometric Engine
          </span>
        </div>
        <div className="text-xs text-slate-400">
          Candidate: <span className="text-slate-200 font-medium">{employeeName}</span>
        </div>
      </div>

      {/* Main Question Card Container */}
      <div className="max-w-2xl mx-auto w-full my-auto">
        <AssessmentQuestionCard
          question={activeQuestion}
          currentIndex={currentIdx}
          totalQuestions={questions.length}
          selectedOptionId={answers[currentIdx]}
          onSelectOption={handleSelectOption}
        />

        {/* Navigation Bar */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isSelected || isSubmitting}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg ${
                !isSelected || isSubmitting
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Calculating Scores...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Submit Assessment
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isSelected}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                !isSelected
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 cursor-pointer'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-2xl mx-auto w-full text-center mt-12 text-xs text-slate-500">
        SkillRadar Behavioral Intelligence — Situational Judgment & Trait Alignment
      </div>
    </div>
  );
};
