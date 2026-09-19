import { apiClient } from './client';
import { RoleMatchesResponse, EmployeeRoleMatchCard } from '../types/matching';
import { MOCK_CANDIDATE_MATCHES } from '../mock/matches';
import { MOCK_INTERNAL_ROLES } from '../mock/roles';

export async function matchRoleCandidatesApi(roleId: string): Promise<RoleMatchesResponse> {
  try {
    const response = await apiClient.post<RoleMatchesResponse>(`/matching/roles/${roleId}`);
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, using mock candidate matches for role:', roleId);
    const role = MOCK_INTERNAL_ROLES.find((r) => r.id === roleId) || MOCK_INTERNAL_ROLES[0];
    const matches = MOCK_CANDIDATE_MATCHES[roleId] || MOCK_CANDIDATE_MATCHES['role-fintech-01'];
    return {
      role_id: role.id,
      role_title: role.title,
      total_candidates_evaluated: 10,
      top_matches: matches,
    };
  }
}

export async function getMyRecommendationsApi(): Promise<EmployeeRoleMatchCard[]> {
  try {
    const response = await apiClient.get<EmployeeRoleMatchCard[]>('/matching/me/recommendations');
    return response.data;
  } catch (err) {
    return [
      {
        role_id: 'role-fintech-01',
        role_title: 'Product Engineer (Fintech)',
        department: 'Engineering',
        match_score: 86.5,
        matching_skills: ['Python', 'FastAPI', 'PostgreSQL', 'UX Collaboration'],
        missing_skills: ['React Component State'],
        transferable_skills: ['UX Collaboration', 'Technical Mentorship', 'Production Incident Triage'],
        explanation: 'Your combination of high-throughput API architecture and verified UX collaboration on the checkout redesign makes you a compelling internal candidate.',
        generated_at: new Date().toISOString(),
      },
      {
        role_id: 'role-devops-02',
        role_title: 'Platform / DevOps Engineer',
        department: 'Infrastructure',
        match_score: 72.0,
        matching_skills: ['Python', 'Production Incident Triage'],
        missing_skills: ['CI/CD Pipelines', 'Docker'],
        transferable_skills: ['Production Incident Triage'],
        explanation: 'Strong operational incident handling and Python foundation provide a solid runway for platform engineering.',
        generated_at: new Date().toISOString(),
      },
    ];
  }
}
