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
      title: 'Mission 1: Ambiguous High-Stakes Deadline',
      domain: 'Domain 1 • Execution & Problem Solving',
      xp_reward: 120,
      question: 'When facing a high-stakes project deadline with ambiguous requirements, what is your immediate first step?',
      options: [
        {
          id: 'q1_lead',
          text: 'Step up to establish project priorities, clarify core objectives, and assign clear ownership.',
          subtext: 'Strategic Prioritization, Direction, Accountability',
          tag: 'Leadership',
        },
        {
          id: 'q1_adapt',
          text: 'Pivot quickly, experiment with agile iterations, and embrace changing constraints as they arise.',
          subtext: 'Cognitive Agility, Agile Iteration, Rapid Learning',
          tag: 'Adaptability',
        },
        {
          id: 'q1_analyt',
          text: 'Break down the core problem into structured sub-tasks and analyze historical telemetry to find bottlenecks.',
          subtext: 'Root-Cause Analysis, Metrics, Systematic Deconstruction',
          tag: 'Analytical',
        },
        {
          id: 'q1_collab',
          text: 'Organize an alignment session with cross-functional peers to gather perspectives and decide collectively.',
          subtext: 'Consensus Building, Cross-Functional Empathy, Team Synergy',
          tag: 'Collaboration',
        },
      ],
    },
    {
      id: 2,
      title: 'Mission 2: Cross-Functional Strategy Conflict',
      domain: 'Domain 2 • Teamwork & Conflict Resolution',
      xp_reward: 110,
      question: 'In a team meeting where two senior colleagues strongly disagree on technical strategy, how do you respond?',
      options: [
        {
          id: 'q2_collab',
          text: 'Facilitate common ground, listen actively to both viewpoints, and foster genuine team consensus.',
          subtext: 'Active Listening, Bridge-Building, Mutual Trust',
          tag: 'Collaboration',
        },
        {
          id: 'q2_analyt',
          text: 'Construct an objective comparison matrix evaluating trade-offs, performance benchmarks, and risk vectors.',
          subtext: 'Decision Matrix, Benchmark Comparison, Objective Logic',
          tag: 'Analytical',
        },
        {
          id: 'q2_lead',
          text: 'Take accountability to propose a decisive path forward and guide the team decisively toward execution.',
          subtext: 'Decisive Guidance, Ownership, Execution Driver',
          tag: 'Leadership',
        },
        {
          id: 'q2_adapt',
          text: 'Suggest testing dual lightweight prototypes to adjust course based on early empirical results.',
          subtext: 'Empirical Prototyping, Hypothesis Testing, Flexibility',
          tag: 'Adaptability',
        },
      ],
    },
    {
      id: 3,
      title: 'Mission 3: Sudden Strategic Reorganization',
      domain: 'Domain 3 • Resilience & Change Management',
      xp_reward: 130,
      question: 'A major unexpected shift in company priorities requires discarding weeks of work. What is your reaction?',
      options: [
        {
          id: 'q3_adapt',
          text: 'Re-energize swiftly, discard obsolete assumptions, and welcome the opportunity to tackle new domain needs.',
          subtext: 'Resilience, Unlearning Obsolete Paradigms, Positive Reframe',
          tag: 'Adaptability',
        },
        {
          id: 'q3_lead',
          text: 'Rally team morale, articulate the strategic business context, and steer focus toward the new goal.',
          subtext: 'Inspirational Alignment, Communication, Vision Stewardship',
          tag: 'Leadership',
        },
        {
          id: 'q3_collab',
          text: 'Check in on teammates, balance shared workloads, and ensure everyone feels supported through the pivot.',
          subtext: 'Peer Empathy, Shared Workload, Team Solidarity',
          tag: 'Collaboration',
        },
        {
          id: 'q3_analyt',
          text: 'Analyze which components of the discarded work can be salvaged, refactored, or modularized for future utility.',
          subtext: 'Asset Optimization, Code Modularization, Efficiency Audit',
          tag: 'Analytical',
        },
      ],
    },
    {
      id: 4,
      title: 'Mission 4: System Performance Turnaround',
      domain: 'Domain 4 • Architecture & Optimization',
      xp_reward: 120,
      question: 'When tasked with optimizing an underperforming system or process, how do you begin?',
      options: [
        {
          id: 'q4_analyt',
          text: 'Deep-dive into telemetry, logs, and benchmark distributions to identify the statistical root cause.',
          subtext: 'Data Telemetry, Statistical Modeling, Empirical Investigation',
          tag: 'Analytical',
        },
        {
          id: 'q4_lead',
          text: 'Define a high-performance vision, set turnaround milestones, and inspire stakeholder commitment.',
          subtext: 'Performance Vision, Milestone Governance, Stakeholder Trust',
          tag: 'Leadership',
        },
        {
          id: 'q4_collab',
          text: 'Interview operators and stakeholders who interact with the system daily to understand human bottlenecks.',
          subtext: 'Qualitative Inquiry, User-Centric Feedback, Human Workflows',
          tag: 'Collaboration',
        },
        {
          id: 'q4_adapt',
          text: 'Implement rapid, iterative micro-experiments to gauge immediate responsiveness and adjust on the fly.',
          subtext: 'Chaos Testing, Rapid Prototyping, Live Experimentation',
          tag: 'Adaptability',
        },
      ],
    },
    {
      id: 5,
      title: 'Mission 5: Hackathon Innovation Sprint',
      domain: 'Domain 5 • Initiative & Entrepreneurial Drive',
      xp_reward: 150,
      question: 'What role do you naturally gravitate toward in an unguided cross-functional hackathon or initiative?',
      options: [
        {
          id: 'q5_lead',
          text: 'The driver who frames the vision, coordinates the roadmap, and keeps the team aligned on delivery.',
          subtext: 'Product Champion, Roadmap Coordination, Delivery Velocity',
          tag: 'Leadership',
        },
        {
          id: 'q5_collab',
          text: 'The bridge-builder who connects diverse teammates, ensures smooth communication, and fosters synergy.',
          subtext: 'Synergy Weaver, Cross-Disciplinary Harmony, Team Cohesion',
          tag: 'Collaboration',
        },
        {
          id: 'q5_adapt',
          text: 'The versatile generalist who plugs emerging skill gaps and adapts smoothly to unexpected hurdles.',
          subtext: 'Generalist Swiss-Army Knife, Gap Filler, High Agility',
          tag: 'Adaptability',
        },
        {
          id: 'q5_analyt',
          text: 'The architect who ensures logical consistency, algorithmic rigor, and robust data integrity.',
          subtext: 'System Architecture, Algorithmic Rigor, Data Integrity',
          tag: 'Analytical',
        },
      ],
    },
    {
      id: 6,
      title: 'Mission 6: Defining Engineering & Product Success',
      domain: 'Domain 6 • Value Alignment & Impact',
      xp_reward: 140,
      question: 'How do you evaluate whether a completed project was a true success?',
      options: [
        {
          id: 'q6_collab',
          text: 'By team cohesion, shared pride in ownership, and positive cross-department stakeholder feedback.',
          subtext: 'Shared Pride, Stakeholder Happiness, Organizational Goodwill',
          tag: 'Collaboration',
        },
        {
          id: 'q6_analyt',
          text: 'By quantitative KPIs, reduced defect rates, and measurable operational efficiency metrics.',
          subtext: 'Quantitative KPIs, SLO/SLA Reliability, Defect Deprecation',
          tag: 'Analytical',
        },
        {
          id: 'q6_lead',
          text: 'By organizational strategic impact, milestone attainment, and team member professional growth.',
          subtext: 'Strategic Impact, Mentorship Milestones, Enterprise ROI',
          tag: 'Leadership',
        },
        {
          id: 'q6_adapt',
          text: 'By how resiliently the solution adapts to future unpredictable changes and evolving user demands.',
          subtext: 'Future-Proof Architecture, Evolutionary Resilience, Extensibility',
          tag: 'Adaptability',
        },
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
  answers: string[],
  traitScores?: Record<string, number>,
  traitSummary?: string
): Promise<PsychometricAssessment> => {
  try {
    const res = await apiClient.post<PsychometricAssessment>(
      `/psychometrics/assessment/${token}/submit`,
      {
        answers,
        trait_scores: traitScores,
        trait_summary: traitSummary,
      }
    );
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock submission scoring', error);
    const mockScores = traitScores
      ? Object.entries(traitScores).map(([trait, score]) => ({
          trait: trait as any,
          score,
        }))
      : [
          { trait: 'LEADERSHIP' as const, score: 75.0 },
          { trait: 'ADAPTABILITY' as const, score: 66.7 },
          { trait: 'ANALYTICAL_THINKING' as const, score: 83.3 },
          { trait: 'COLLABORATION' as const, score: 91.7 },
        ];

    return {
      id: `mock-ass-${token}`,
      employee_id: 'emp-1001',
      status: 'COMPLETED',
      assessment_token: token,
      sent_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      trait_summary:
        traitSummary ||
        'Exhibits empathetic stakeholder bridge-building, cross-functional synergy, and decisive leadership guidance. Demonstrates outstanding aptitude for team alignment and complex product initiatives.',
      trait_scores: mockScores,
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
