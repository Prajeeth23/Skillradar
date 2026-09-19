import { AuthUser } from '../types/auth';

export const DEMO_USERS: Record<string, { user: AuthUser; token: string }> = {
  employee_arjun: {
    user: {
      id: 'usr-emp-arjun',
      name: 'Arjun Kumar',
      email: 'arjun.mehta@acme.com',
      role: 'EMPLOYEE',
      organization_id: 'org-acme-01',
      employee_id: 'emp-arjun-01',
    },
    token: 'mock-jwt-token-arjun',
  },
  hr: {
    user: {
      id: 'usr-hr-01',
      name: 'Sarah Jenkins',
      email: 'hr.sarah@acme.com',
      role: 'HR',
      organization_id: 'org-acme-01',
    },
    token: 'mock-jwt-token-hr',
  },
  employee_priya: {
    user: {
      id: 'usr-emp-priya',
      name: 'Priya Patel',
      email: 'priya.patel@acme.com',
      role: 'EMPLOYEE',
      organization_id: 'org-acme-01',
      employee_id: 'emp-priya-01',
    },
    token: 'mock-jwt-token-priya',
  },
  employee_elena: {
    user: {
      id: 'usr-emp-02',
      name: 'Elena Rostova',
      email: 'elena.rostova@acme.com',
      role: 'EMPLOYEE',
      organization_id: 'org-acme-01',
      employee_id: 'emp-1002',
    },
    token: 'mock-jwt-token-elena',
  },
  employee_marcus: {
    user: {
      id: 'usr-emp-01',
      name: 'Marcus Vance',
      email: 'marcus.vance@acme.com',
      role: 'EMPLOYEE',
      organization_id: 'org-acme-01',
      employee_id: 'emp-1001',
    },
    token: 'mock-jwt-token-marcus',
  },
  admin: {
    user: {
      id: 'usr-admin-01',
      name: 'Platform Administrator',
      email: 'admin@acme.com',
      role: 'PLATFORM_ADMIN',
      organization_id: 'org-acme-01',
    },
    token: 'mock-jwt-token-admin',
  },
};

