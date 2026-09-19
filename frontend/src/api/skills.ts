import { apiClient } from './client';
import { DivergenceResult, Skill } from '../types/skill';
import { MOCK_SKILLS } from '../mock/skills';
import { MOCK_EMPLOYEES } from '../mock/employees';

export async function runDivergenceEngineApi(employeeId: string): Promise<DivergenceResult> {
  try {
    const response = await apiClient.post<DivergenceResult>(`/skills/divergence/analyze/${employeeId}`);
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, using mock divergence result for employee:', employeeId);
    const emp = MOCK_EMPLOYEES.find((e) => e.id === employeeId) || MOCK_EMPLOYEES[0];
    
    return {
      employee_id: emp.id,
      employee_name: emp.name,
      current_job_title: emp.current_job_title,
      analyzed_projects_count: emp.projects?.length || 3,
      explicit_skills: [
        {
          name: 'Python',
          category: 'Technical',
          proficiency: 4,
          confidence: 0.95,
          type: 'explicit',
          evidence: 'Built payment processing microservices and database ingestion layers.',
        },
        {
          name: 'PostgreSQL',
          category: 'Technical',
          proficiency: 4,
          confidence: 0.92,
          type: 'explicit',
          evidence: 'Optimized complex relational queries and eliminated database lock contention.',
        },
      ],
      hidden_skills: [
        {
          name: 'UX Collaboration',
          category: 'Interpersonal',
          proficiency: 3,
          confidence: 0.88,
          type: 'hidden',
          evidence: 'Partnered with product designers on multi-step checkout redesign, improving completion rate by 18%.',
        },
        {
          name: 'Production Incident Triage',
          category: 'Technical',
          proficiency: 4,
          confidence: 0.91,
          type: 'hidden',
          evidence: 'Diagnosed and resolved critical production payment gateway timeout spikes during peak traffic.',
        },
      ],
      transferable_skills: [
        {
          name: 'Technical Mentorship',
          category: 'Leadership',
          proficiency: 4,
          confidence: 0.89,
          type: 'transferable',
          evidence: 'Mentored 3 junior developers on API standards and testing, reducing ramp-up time from 8 to 3 weeks.',
        },
      ],
      divergence_summary: `${emp.name} routinely operates beyond the standard ${emp.current_job_title} scope, demonstrating strong cross-functional design empathy and leadership potential backed by project deliverables.`,
    };
  }
}

export async function getSkillsCatalogApi(): Promise<Skill[]> {
  try {
    const response = await apiClient.get<Skill[]>('/skills');
    return response.data;
  } catch (err) {
    return MOCK_SKILLS;
  }
}
