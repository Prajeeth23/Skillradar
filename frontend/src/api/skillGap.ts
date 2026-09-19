import { apiClient } from './client';
import { SkillGapAnalysis } from '../types/skillGap';
import { MOCK_INTERNAL_ROLES } from '../mock/roles';

export async function analyzeSkillGapApi(targetRoleId: string, employeeId?: string): Promise<SkillGapAnalysis> {
  try {
    const payload: Record<string, string> = { target_role_id: targetRoleId };
    if (employeeId) payload.employee_id = employeeId;
    const response = await apiClient.post<SkillGapAnalysis>('/skill-gaps/analyze', payload);
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, using mock skill gap analysis');
    const role = MOCK_INTERNAL_ROLES.find((r) => r.id === targetRoleId) || MOCK_INTERNAL_ROLES[0];
    return {
      employee_id: employeeId || 'emp-1001',
      employee_name: 'Marcus Vance',
      target_role_id: role.id,
      target_role_title: role.title,
      readiness_score: 75.0,
      existing_skills: ['Python', 'REST APIs', 'PostgreSQL', 'UX Collaboration'],
      missing_skills: ['React Component Architecture', 'TypeScript State Management'],
      skill_gaps: [
        {
          skill_name: 'React Component Architecture',
          category: 'Technical',
          current_level: 1,
          required_level: 4,
          gap_level: 3,
          priority: 'HIGH',
        },
        {
          skill_name: 'TypeScript State Management',
          category: 'Technical',
          current_level: 2,
          required_level: 3,
          gap_level: 1,
          priority: 'MEDIUM',
        },
      ],
      recommended_development_areas: [
        {
          title: 'Advanced React Component State & Hooks',
          description: 'Leverage your UX collaboration skills by building end-to-end design token UI components.',
          resource_type: 'COURSE',
          priority: 'HIGH',
        },
        {
          title: 'Internal Checkout Widget Frontend Pair Programming',
          description: 'Shadow the frontend team for 2 sprints to implement the client-side state machine for payment webhooks.',
          resource_type: 'PROJECT',
          priority: 'HIGH',
        },
      ],
    };
  }
}
