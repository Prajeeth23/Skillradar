export interface SkillGapItem {
  skill_name: string;
  category: string;
  current_level: number;
  required_level: number;
  gap_level: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface DevelopmentArea {
  title: string;
  description: string;
  resource_type: 'COURSE' | 'PROJECT' | 'MENTORSHIP' | 'CERTIFICATION';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface SkillGapAnalysis {
  employee_id: string;
  employee_name: string;
  target_role_id: string;
  target_role_title: string;
  readiness_score: number;
  existing_skills: string[];
  missing_skills: string[];
  skill_gaps: SkillGapItem[];
  recommended_development_areas: DevelopmentArea[];
}
