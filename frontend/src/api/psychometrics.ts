import { apiClient } from './client';
import {
  AssessmentQuestionsResponse,
  AssessmentShareLinkResponse,
  EmployeePsychometrics,
  PsychometricAssessment,
} from '../types/psychometric';

// Mock questions for offline fallback
const MOCK_QUESTIONS: AssessmentQuestionsResponse = {
  assessment_id: 'mock-assessment-01',
  employee_name: 'Marcus Vance',
  status: 'PENDING',
  questions: [
    {
      id: 1,
      question: 'When facing a high-stakes project deadline with ambiguous requirements, what is your immediate first step?',
      options: [
        { id: 'q1_lead', text: 'Step up to establish project priorities, clarify objectives, and assign clear responsibilities.' },
        { id: 'q1_adapt', text: 'Pivot quickly, experiment with agile iterations, and embrace changing constraints as they arise.' },
        { id: 'q1_analyt', text: 'Break down the core problem into structured sub-tasks and analyze historical data to find bottlenecks.' },
        { id: 'q1_collab', text: 'Organize an alignment session with cross-functional peers to gather perspectives and decide collectively.' },
      ],
    },
    {
      id: 2,
      question: 'In a team meeting where two senior colleagues strongly disagree on technical strategy, how do you respond?',
      options: [
        { id: 'q2_collab', text: 'Facilitate common ground, listen actively to both viewpoints, and foster team consensus.' },
        { id: 'q2_analyt', text: 'Construct an objective comparison matrix evaluating trade-offs, performance metrics, and risks.' },
        { id: 'q2_lead', text: 'Take accountability to propose a decisive path forward and guide the team toward execution.' },
        { id: 'q2_adapt', text: 'Suggest testing dual lightweight prototypes to adjust course based on early empirical results.' },
      ],
    },
    {
      id: 3,
      question: 'A major unexpected shift in company priorities requires discarding weeks of work. What is your reaction?',
      options: [
        { id: 'q3_adapt', text: 'Re-energize swiftly, discard obsolete assumptions, and welcome the opportunity to tackle new domain needs.' },
        { id: 'q3_lead', text: 'Rally team morale, articulate the strategic business context, and steer focus toward the new goal.' },
        { id: 'q3_collab', text: 'Check in on teammates, balance shared workloads, and ensure everyone feels supported through the pivot.' },
        { id: 'q3_analyt', text: 'Analyze which components of the discarded work can be salvaged or modularized for future utility.' },
      ],
    },
    {
      id: 4,
      question: 'When tasked with optimizing an underperforming system or process, how do you begin?',
      options: [
        { id: 'q4_analyt', text: 'Deep-dive into telemetry, logs, and benchmark distributions to identify the statistical root cause.' },
        { id: 'q4_lead', text: 'Define a high-performance vision, set turnaround milestones, and inspire stakeholder commitment.' },
        { id: 'q4_collab', text: 'Interview operators and stakeholders who interact with the system daily to understand human bottlenecks.' },
        { id: 'q4_adapt', text: 'Implement rapid, iterative micro-experiments to gauge immediate responsiveness and adjust on the fly.' },
      ],
    },
    {
      id: 5,
      question: 'What role do you naturally gravitate toward in an unguided cross-functional hackathon or initiative?',
      options: [
        { id: 'q5_lead', text: 'The driver who frames the vision, coordinates the roadmap, and keeps the team aligned on delivery.' },
        { id: 'q5_collab', text: 'The bridge-builder who connects diverse teammates, ensures smooth communication, and fosters synergy.' },
        { id: 'q5_adapt', text: 'The versatile generalist who plugs emerging skill gaps and adapts smoothly to unexpected hurdles.' },
        { id: 'q5_analyt', text: 'The architect who ensures logical consistency, algorithmic rigor, and robust data integrity.' },
      ],
    },
    {
      id: 6,
      question: 'How do you evaluate whether a completed project was a true success?',
      options: [
        { id: 'q6_collab', text: 'By team cohesion, shared pride in ownership, and positive cross-department stakeholder feedback.' },
        { id: 'q6_analyt', text: 'By quantitative KPIs, reduced defect rates, and measurable operational efficiency metrics.' },
        { id: 'q6_lead', text: 'By organizational strategic impact, milestone attainment, and team member professional growth.' },
        { id: 'q6_adapt', text: 'By how resiliently the solution adapts to future unpredictable changes and evolving user demands.' },
      ],
    },
  ],
};

export const sendAssessmentLinkApi = async (
  employeeId: string
): Promise<AssessmentShareLinkResponse> => {
  try {
    const res = await apiClient.post<AssessmentShareLinkResponse>(
      `/psychometrics/${employeeId}/send-link`
    );
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock assessment link', error);
    const mockToken = `token-mock-${employeeId}-${Date.now().toString().slice(-4)}`;
    return {
      assessment_id: `mock-ass-${employeeId}`,
      assessment_token: mockToken,
      share_url: `/assessment/${mockToken}`,
      employee_name: 'Employee',
      status: 'PENDING',
      sent_at: new Date().toISOString(),
    };
  }
};

export const getAssessmentByTokenApi = async (
  token: string
): Promise<AssessmentQuestionsResponse> => {
  try {
    const res = await apiClient.get<AssessmentQuestionsResponse>(
      `/psychometrics/assessment/${token}`
    );
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock questions', error);
    return {
      ...MOCK_QUESTIONS,
      assessment_id: `mock-ass-${token}`,
    };
  }
};

export const submitAssessmentApi = async (
  token: string,
  answers: string[]
): Promise<PsychometricAssessment> => {
  try {
    const res = await apiClient.post<PsychometricAssessment>(
      `/psychometrics/assessment/${token}/submit`,
      { answers }
    );
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock submission scoring', error);
    return {
      id: `mock-ass-${token}`,
      employee_id: 'emp-1001',
      status: 'COMPLETED',
      assessment_token: token,
      sent_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      trait_summary:
        'Exhibits empathetic stakeholder bridge-building, cross-functional synergy, and decisive leadership guidance. Demonstrates outstanding aptitude for team alignment and complex product initiatives.',
      trait_scores: [
        { trait: 'LEADERSHIP', score: 75.0 },
        { trait: 'ADAPTABILITY', score: 66.7 },
        { trait: 'ANALYTICAL_THINKING', score: 83.3 },
        { trait: 'COLLABORATION', score: 91.7 },
      ],
    };
  }
};

export const getEmployeePsychometricsApi = async (
  employeeId: string
): Promise<EmployeePsychometrics> => {
  try {
    const res = await apiClient.get<EmployeePsychometrics>(
      `/psychometrics/${employeeId}`
    );
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock psychometrics', error);
    // Pre-seeded mock for emp-1001 (Marcus), emp-1002 (Elena), emp-1003 (Sophia)
    const isCompleted = ['emp-1001', 'emp-1002', 'emp-1003'].includes(employeeId);

    if (!isCompleted) {
      return {
        employee_id: employeeId,
        employee_name: 'Employee',
        has_assessment: false,
        status: 'PENDING',
        assessment: undefined,
        radar_data: [],
      };
    }

    return {
      employee_id: employeeId,
      employee_name: 'Marcus Vance',
      has_assessment: true,
      status: 'COMPLETED',
      assessment: {
        id: `mock-ass-${employeeId}`,
        employee_id: employeeId,
        status: 'COMPLETED',
        assessment_token: `token-mock-${employeeId}`,
        sent_at: '2026-03-01T10:00:00Z',
        completed_at: '2026-03-01T10:15:00Z',
        trait_summary:
          'Exhibits empathetic stakeholder bridge-building, cross-functional synergy, and decisive leadership guidance. Demonstrates outstanding aptitude for team alignment and complex product initiatives.',
        trait_scores: [
          { trait: 'LEADERSHIP', score: 75.0 },
          { trait: 'ADAPTABILITY', score: 66.7 },
          { trait: 'ANALYTICAL_THINKING', score: 83.3 },
          { trait: 'COLLABORATION', score: 91.7 },
        ],
      },
      radar_data: [
        { trait: 'Leadership', score: 75.0, fullMark: 100 },
        { trait: 'Adaptability', score: 66.7, fullMark: 100 },
        { trait: 'Analytical Thinking', score: 83.3, fullMark: 100 },
        { trait: 'Collaboration', score: 91.7, fullMark: 100 },
      ],
    };
  }
};
