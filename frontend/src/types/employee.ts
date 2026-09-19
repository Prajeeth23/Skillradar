import { EmployeeSkill } from './skill';

export interface Project {
  id: string;
  employee_id: string;
  title: string;
  description: string;
  responsibilities?: string;
  achievements?: string;
  technologies?: string;
  start_date?: string;
  end_date?: string;
}

export interface Employee {
  id: string;
  user_id: string;
  name: string;
  email: string;
  employee_code: string;
  department: string;
  current_job_title: string;
  years_of_experience: number;
  bio?: string;
  total_skills_count: number;
  hidden_skills_count: number;
  skills?: EmployeeSkill[];
  projects?: Project[];
  created_at?: string;
  updated_at?: string;
}
