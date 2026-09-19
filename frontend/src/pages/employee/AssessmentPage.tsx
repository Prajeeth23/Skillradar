import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAssessmentByTokenApi } from '../../api/psychometrics';
import {
  PsychometricProvider,
  usePsychometric,
} from '../../features/psychometric/PsychometricContext';
import { BackgroundAnimation } from '../../features/psychometric/components/BackgroundAnimation';
import { SplashView } from '../../features/psychometric/views/SplashView';
import { AvatarSelectView } from '../../features/psychometric/views/AvatarSelectView';
import { AssessmentMissionView } from '../../features/psychometric/views/AssessmentMissionView';
import { AnalysisView } from '../../features/psychometric/views/AnalysisView';
import { ReportView } from '../../features/psychometric/views/ReportView';
import { Loader2, Compass } from 'lucide-react';

const AssessmentWorkflow: React.FC = () => {
  const { phase } = usePsychometric();

  switch (phase) {
    case 'splash':
      return <SplashView />;
    case 'avatar':
      return <AvatarSelectView />;
    case 'assessment':
      return <AssessmentMissionView />;
    case 'analysis':
      return <AnalysisView />;
    case 'report':
      return <ReportView />;
    default:
      return <SplashView />;
  }
};

export const AssessmentPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employeeName, setEmployeeName] = useState<string>('Team Member');
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
        setIsLoading(false);
      })
      .catch(() => {
        // Fall back gracefully with mock data so candidate is never blocked
        setEmployeeName('Team Member');
        setIsLoading(false);
      });
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-slate-300 p-4">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
        <p className="text-sm font-label-mono font-bold tracking-widest text-cyan-300 uppercase">
          INITIALIZING COGNITIVE ENGINE...
        </p>
        <span className="text-xs text-slate-400 font-label-mono mt-1">
          Calibrating situational simulation missions
        </span>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-slate-300 p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
          <Compass className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Simulation Unavailable</h2>
          <p className="text-sm text-slate-400 mb-6">{errorMsg}</p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-cyan-600 text-slate-950 font-label-mono font-bold text-sm hover:bg-cyan-500 transition-colors uppercase"
          >
            Return to SkillRadar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PsychometricProvider initialEmployeeName={employeeName} token={token}>
      <div className="min-h-screen select-none text-slate-100 font-body-base antialiased relative z-0 bg-[#0B0F19] overflow-x-hidden">
        <BackgroundAnimation />
        <AssessmentWorkflow />
      </div>
    </PsychometricProvider>
  );
};

export default AssessmentPage;
