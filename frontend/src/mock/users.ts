import { AuthUser } from '../types/auth';

export const DEMO_USERS: Record<string, { user: AuthUser; token: string }> = {
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
  employee_sophia: {
    user: {
      id: 'usr-emp-03',
      name: 'Sophia Chen',
      email: 'sophia.chen@acme.com',
      role: 'EMPLOYEE',
      organization_id: 'org-acme-01',
      employee_id: 'emp-1003',
    },
    token: 'mock-jwt-token-sophia',
  },
};
