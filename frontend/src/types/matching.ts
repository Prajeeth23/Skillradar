export interface CandidateMatchResult {
  employee_id: string;
  employee_name: string;
  current_job_title: string;
  department: string;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  transferable_skills: string[];
  explanation: string;
  evidence: string[];
  generated_at: string;
}

export interface RoleMatchesResponse {
  role_id: string;
  role_title: string;
  total_candidates_evaluated: number;
  top_matches: CandidateMatchResult[];
}

export interface EmployeeRoleMatchCard {
  role_id: string;
  role_title: string;
  department: string;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  transferable_skills: string[];
  explanation: string;
  generated_at: string;
}
