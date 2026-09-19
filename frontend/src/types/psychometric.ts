export type TraitType =
  | 'LEADERSHIP'
  | 'ADAPTABILITY'
  | 'ANALYTICAL_THINKING'
  | 'COLLABORATION';

export type AssessmentStatus = 'PENDING' | 'COMPLETED';

export interface TraitScore {
  trait: TraitType;
  score: number;
}

export interface PsychometricAssessment {
  id: string;
  employee_id: string;
  status: AssessmentStatus;
  assessment_token: string;
  sent_at: string;
  completed_at?: string;
  trait_summary?: string;
  trait_scores: TraitScore[];
}

export interface AssessmentQuestionOption {
  id: string;
  text: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: AssessmentQuestionOption[];
}

export interface AssessmentQuestionsResponse {
  assessment_id: string;
  employee_name: string;
  status: AssessmentStatus;
  questions: AssessmentQuestion[];
}

export interface AssessmentShareLinkResponse {
  assessment_id: string;
  assessment_token: string;
  share_url: string;
  employee_name: string;
  status: AssessmentStatus;
  sent_at: string;
}

export interface RadarDataPoint {
  trait: string;
  score: number;
  fullMark: number;
}

export interface EmployeePsychometrics {
  employee_id: string;
  employee_name: string;
  has_assessment: boolean;
  status: AssessmentStatus;
  assessment?: PsychometricAssessment;
  radar_data: RadarDataPoint[];
}
