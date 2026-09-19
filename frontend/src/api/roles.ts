import { apiClient } from './client';
import { InternalRole } from '../types/role';
import { MOCK_INTERNAL_ROLES } from '../mock/roles';

export async function getRolesApi(): Promise<InternalRole[]> {
  try {
    const response = await apiClient.get<InternalRole[]>('/roles');
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, using mock roles');
    return MOCK_INTERNAL_ROLES;
  }
}

export async function getRoleDetailApi(roleId: string): Promise<InternalRole> {
  try {
    const response = await apiClient.get<InternalRole>(`/roles/${roleId}`);
    return response.data;
  } catch (err) {
    const found = MOCK_INTERNAL_ROLES.find((r) => r.id === roleId);
    if (found) return found;
    return MOCK_INTERNAL_ROLES[0];
  }
}

export async function createRoleApi(roleData: Partial<InternalRole>): Promise<InternalRole> {
  try {
    const response = await apiClient.post<InternalRole>('/roles', roleData);
    return response.data;
  } catch (err) {
    const newRole: InternalRole = {
      id: `role-custom-${Date.now()}`,
      organization_id: 'org-acme-01',
      title: roleData.title || 'New Role',
      department: roleData.department || 'Engineering',
      description: roleData.description || '',
      status: 'OPEN',
      created_at: new Date().toISOString(),
      skills: roleData.skills || [],
    };
    MOCK_INTERNAL_ROLES.unshift(newRole);
    return newRole;
  }
}
