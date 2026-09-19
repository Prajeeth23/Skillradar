import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  LogOut,
  Sparkles,
  ChevronDown,
  UserCheck,
  Briefcase,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DEMO_USERS } from '../../mock/users';
import { Badge } from './Badge';

export const Header: React.FC = () => {
  const { user, logout, loginAsDemoUser } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (personaRef.current && !personaRef.current.contains(event.target as Node)) {
        setShowPersonaMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePersonaSwitch = (key: keyof typeof DEMO_USERS) => {
    loginAsDemoUser(key);
    setShowPersonaMenu(false);
    const targetRole = DEMO_USERS[key].user.role;
    if (targetRole === 'PLATFORM_ADMIN') navigate('/admin');
    else if (targetRole === 'HR') navigate('/hr');
    else navigate('/employee');
  };

  const getRoleBadgeColor = () => {
    if (user?.role === 'PLATFORM_ADMIN') return 'purple';
    if (user?.role === 'HR') return 'amber';
    return 'primary';
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">SkillRadar</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5">Beyond Titles. Discover Talent.</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative w-72">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, roles, projects..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <kbd className="hidden lg:inline-block absolute right-2.5 text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Quick Switcher, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Hackathon Demo Persona Switcher */}
        <div className="relative" ref={personaRef}>
          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-slate-400">Persona:</span>
            <span className="font-semibold text-white truncate max-w-[120px]">{user?.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showPersonaMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#111827] border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
              <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                1-Click Demo Persona Switcher
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => handlePersonaSwitch('hr')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800/80 transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-medium text-white">HR Talent Intelligence</div>
                    <div className="text-[10px] text-slate-400">Sarah Jenkins (hr.sarah@acme.com)</div>
                  </div>
                </button>

                <button
                  onClick={() => handlePersonaSwitch('employee_marcus')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800/80 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="font-medium text-white">Employee (Marcus Vance)</div>
                    <div className="text-[10px] text-slate-400">Backend Dev → UX & Mentorship</div>
                  </div>
                </button>

                <button
                  onClick={() => handlePersonaSwitch('employee_elena')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800/80 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-medium text-white">Employee (Elena Rostova)</div>
                    <div className="text-[10px] text-slate-400">QA Engineer → DevOps CI/CD</div>
                  </div>
                </button>

                <button
                  onClick={() => handlePersonaSwitch('employee_sophia')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800/80 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">Employee (Sophia Chen)</div>
                    <div className="text-[10px] text-slate-400">Marketing → SQL Analytics</div>
                  </div>
                </button>

                <button
                  onClick={() => handlePersonaSwitch('admin')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800/80 transition-colors border-t border-slate-800/60 mt-1 pt-2"
                >
                  <Shield className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">Platform Administrator</div>
                    <div className="text-[10px] text-slate-400">admin@acme.com</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors relative"
            title="In-App Talent Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111827] border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-white">Talent Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">No notifications yet</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-3.5 hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        !n.is_read ? 'bg-indigo-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              !n.is_read ? 'bg-indigo-400' : 'bg-transparent'
                            }`}
                          />
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 pl-3 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Current User Profile Pill */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 pl-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white leading-none">{user?.name}</div>
              <div className="mt-1">
                <Badge variant={getRoleBadgeColor()} size="sm">
                  {user?.role}
                </Badge>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user?.name ? user.name[0] : 'U'}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50">
              <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                <div className="text-xs font-medium text-white truncate">{user?.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
              </div>
              <button
                onClick={logout}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
