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
    <aside className="w-64 border-r border-[#E5E5EA] bg-[#FFFFFF] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        {/* Role Workspace Banner */}
        <div className="px-3.5 py-3 rounded-xl bg-[#F1F1F4] border border-[#E5E5EA] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#9B9BA5] tracking-wider">Active Workspace</div>
            <div className="text-xs font-bold text-[#1A1A1E] mt-0.5 font-['Plus_Jakarta_Sans']">
              {user?.role === 'PLATFORM_ADMIN' && 'Platform Administration'}
              {user?.role === 'HR' && 'Talent Intelligence'}
              {user?.role === 'EMPLOYEE' && 'Career Development'}
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#5B4FE8]" />
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
                    ? 'bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/20 font-semibold shadow-xs'
                    : 'text-[#6B6B76] hover:text-[#1A1A1E] hover:bg-[#F1F1F4]'
                )
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0 group-hover:text-[#5B4FE8] transition-colors" />
                <span>{item.label}</span>
              </div>
              {item.isAi && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#5B4FE8] bg-[#5B4FE8]/10 px-1.5 py-0.5 rounded border border-[#5B4FE8]/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI
                </span>
              )}
              {item.badge && !item.isAi && (
                <span className="text-[10px] font-semibold text-[#6B6B76] bg-[#F1F1F4] px-1.5 py-0.5 rounded border border-[#E5E5EA]">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Branding & AI Status */}
      <div className="p-4 m-3 rounded-xl bg-[#F4F3FF] border border-[#5B4FE8]/20 text-xs">
        <div className="flex items-center gap-2 text-[#5B4FE8] font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Synthesis Engine v4.2</span>
        </div>
        <p className="text-[11px] text-[#6B6B76] leading-relaxed">
          AI continuously detects latent capabilities beyond nominal titles from actual telemetry.
        </p>
      </div>
    </aside>
  );
};
