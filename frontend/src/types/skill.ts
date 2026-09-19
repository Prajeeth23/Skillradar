export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface EmployeeSkill {
  id: string;
  skill_id: string;
  skill_name: string;
  category: string;
  proficiency: number; // 1 to 5
  confidence: number;  // 0.0 to 1.0
  source: string;      // project, resume, AI_inferred, HR_added
  evidence?: string;
  is_hidden: boolean;  // True if discovered by Divergence Engine
  last_updated: string;
}

export interface DiscoveredSkill {
  name: string;
  category: string;
  proficiency: number;
  confidence: number;
  type: 'explicit' | 'hidden' | 'transferable';
  evidence: string;
}

export interface DivergenceResult {
  employee_id: string;
  employee_name: string;
  current_job_title: string;
  analyzed_projects_count: number;
  explicit_skills: DiscoveredSkill[];
  hidden_skills: DiscoveredSkill[];
  transferable_skills: DiscoveredSkill[];
  divergence_summary: string;
}
