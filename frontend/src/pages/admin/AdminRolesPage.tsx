import React, { useState } from 'react';
import { ShieldCheck, Edit3, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

interface Permission {
  id: string;
  label: string;
  description: string;
}

interface RoleDefinition {
  id: string;
  name: string;
  label: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const ALL_PERMISSIONS: Permission[] = [
  { id: 'view_employees', label: 'View Employees', description: 'Browse employee directory' },
  { id: 'manage_employees', label: 'Manage Employees', description: 'Create, update, and delete employee profiles' },
  { id: 'view_skills', label: 'View Skills', description: 'View skill inventory and AI-discovered vectors' },
  { id: 'manage_skills', label: 'Manage Skills', description: 'Edit and curate the canonical skill library' },
  { id: 'view_roles', label: 'View Internal Roles', description: 'Browse open internal opportunities' },
  { id: 'manage_roles', label: 'Manage Internal Roles', description: 'Create, update, and close role postings' },
  { id: 'run_matching', label: 'Run Talent Matching', description: 'Execute AI divergence and matching engine' },
  { id: 'view_audit', label: 'View Audit Logs', description: 'Access security audit trail' },
  { id: 'manage_settings', label: 'Manage Settings', description: 'Configure platform and AI engine settings' },
  { id: 'manage_users', label: 'Manage Users', description: 'Provision, deactivate, and delete user accounts' },
  { id: 'send_assessments', label: 'Send Assessments', description: 'Dispatch psychometric calibration links' },
  { id: 'view_dossier', label: 'View Employee Dossier', description: 'Access comprehensive talent profiles' },
];

const INITIAL_ROLES: RoleDefinition[] = [
  {
    id: 'platform_admin',
    name: 'PLATFORM_ADMIN',
    label: 'Platform Administrator',
    description: 'Full platform governance with unrestricted access to all modules, settings, and audit capabilities.',
    userCount: 1,
    permissions: ALL_PERMISSIONS.map((p) => p.id),
  },
  {
    id: 'hr',
    name: 'HR',
    label: 'HR / Talent Intelligence',
    description: 'Access to employee profiles, talent matching, skill gap analysis, psychometric assessments, and dossier views.',
    userCount: 2,
    permissions: [
      'view_employees',
      'manage_employees',
      'view_skills',
      'view_roles',
      'manage_roles',
      'run_matching',
      'send_assessments',
      'view_dossier',
    ],
  },
  {
    id: 'employee',
    name: 'EMPLOYEE',
    label: 'Employee',
    description: 'Self-service access to personal profile, skills constellation, skill gap analysis, and career opportunities.',
    userCount: 10,
    permissions: ['view_skills', 'view_roles'],
  },
];

export const AdminRolesPage: React.FC = () => {
  const [roles] = useState<RoleDefinition[]>(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState<string>('platform_admin');

  const activeRole = roles.find((r) => r.id === selectedRole) || roles[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">Roles & Permission Matrix</h2>
        <p className="text-xs text-[#6B6B76] mt-1">
          Configure role-based access control (RBAC) policies governing platform feature access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Selector */}
        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedRole === role.id
                  ? 'bg-[#5B4FE8]/10 border-[#5B4FE8]/30 shadow-xs'
                  : 'bg-[#FFFFFF] border-[#E5E5EA] hover:border-[#5B4FE8]/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">{role.label}</span>
                <Badge variant={role.name === 'PLATFORM_ADMIN' ? 'purple' : role.name === 'HR' ? 'amber' : 'secondary'}>
                  {role.userCount} users
                </Badge>
              </div>
              <p className="text-[11px] text-[#6B6B76] leading-relaxed">{role.description}</p>
              <div className="mt-2 text-[10px] font-mono text-[#9B9BA5]">
                {role.permissions.length} / {ALL_PERMISSIONS.length} permissions
              </div>
            </button>
          ))}
        </div>

        {/* Permission Matrix */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5B4FE8]" />
              <h3 className="text-base font-bold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">
                {activeRole.label} Permissions
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#9B9BA5] bg-[#F1F1F4] px-2 py-1 rounded border border-[#E5E5EA]">
              {activeRole.name}
            </span>
          </div>

          <div className="space-y-2">
            {ALL_PERMISSIONS.map((perm) => {
              const hasPermission = activeRole.permissions.includes(perm.id);
              return (
                <div
                  key={perm.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    hasPermission
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-[#F1F1F4] border-[#E5E5EA] opacity-50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-medium text-[#1A1A1E]">{perm.label}</div>
                    <div className="text-[11px] text-[#9B9BA5]">{perm.description}</div>
                  </div>
                  {hasPermission ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#E5E5EA] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
