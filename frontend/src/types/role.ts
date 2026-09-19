export interface RoleSkill {
  id: string;
  skill_id: string;
  skill_name: string;
  category: string;
  required_level: number; // 1 to 5
  importance: 'MANDATORY' | 'PREFERRED' | 'BONUS';
}

export interface InternalRole {
  id: string;
  organization_id: string;
  title: string;
  department: string;
  description: string;
  requirements?: string;
  status: 'OPEN' | 'DRAFT' | 'FILLED' | 'CLOSED';
  created_by?: string;
  created_at: string;
  skills: RoleSkill[];
}
