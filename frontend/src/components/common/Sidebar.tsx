import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Sparkles,
  GitFork,
  MessageSquare,
  Bell,
  Settings,
  ShieldCheck,
  Compass,
  FileCheck2,
  UserCircle2,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  isAi?: boolean;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavItems = (): NavItem[] => {
    if (user?.role === 'PLATFORM_ADMIN') {
      return [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Users', path: '/admin/users', icon: Users },
        { label: 'HR Management', path: '/admin/hr', icon: Building2 },
        { label: 'Employee Management', path: '/admin/employees', icon: Users },
        { label: 'Roles & Permissions', path: '/admin/roles', icon: ShieldCheck },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
        { label: 'Audit Logs', path: '/admin/audit', icon: FileCheck2 },
      ];
    }

    if (user?.role === 'HR') {
      return [
        { label: 'Dashboard', path: '/hr', icon: LayoutDashboard },
        { label: 'Employees', path: '/hr/employees', icon: Users },
        { label: 'Talent Discovery', path: '/hr/discovery', icon: Sparkles, isAi: true },
        { label: 'Internal Roles', path: '/hr/roles', icon: Briefcase },
        { label: 'Skill Gaps', path: '/hr/skill-gaps', icon: GitFork },
        { label: 'Notifications', path: '/hr/notifications', icon: Bell },
      ];
    }

    // EMPLOYEE default
    return [
      { label: 'Dashboard', path: '/employee', icon: LayoutDashboard },
      { label: 'My Profile', path: '/employee/profile', icon: UserCircle2 },
      { label: 'My Skills', path: '/employee/skills', icon: Sparkles },
      { label: 'Skill Gap', path: '/employee/skill-gap', icon: GitFork, isAi: true },
      { label: 'Opportunities', path: '/employee/opportunities', icon: Briefcase },
      { label: 'Career Roadmap', path: '/employee/roadmap', icon: Compass },
      { label: 'AI Career Assistant', path: '/employee/assistant', icon: MessageSquare, isAi: true, badge: 'AI' },
      { label: 'Notifications', path: '/employee/notifications', icon: Bell },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-[#0B0F19] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        {/* Role Workspace Banner */}
        <div className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Active Workspace</div>
            <div className="text-xs font-bold text-white mt-0.5">
              {user?.role === 'PLATFORM_ADMIN' && 'Platform Administration'}
              {user?.role === 'HR' && 'Talent Intelligence'}
              {user?.role === 'EMPLOYEE' && 'Career Development'}
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500" />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin' || item.path === '/hr' || item.path === '/employee'}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group',
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                )
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0 group-hover:text-indigo-400 transition-colors" />
                <span>{item.label}</span>
              </div>
              {item.isAi && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/15 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI
                </span>
              )}
              {item.badge && !item.isAi && (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Branding & AI Status */}
      <div className="p-4 m-3 rounded-xl bg-gradient-to-b from-slate-900/60 to-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Divergence Engine</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          AI detects capabilities beyond nominal titles using verified project achievements.
        </p>
      </div>
    </aside>
  );
};
