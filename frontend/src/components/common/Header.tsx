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
    <header className="h-16 border-b border-[#E5E5EA] bg-[#FFFFFF]/95 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/discover')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B4FE8] to-[#712AE2] flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">SkillRadar</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/20">
                AI MVP
              </span>
            </div>
            <p className="text-[11px] text-[#6B6B76] -mt-0.5">Beyond Titles. Discover Talent.</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative w-72">
          <Search className="w-4 h-4 absolute left-3 text-[#9B9BA5]" />
          <input
            type="text"
            placeholder="Search skills, roles, projects..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#F1F1F4] border border-[#E5E5EA] rounded-lg text-xs text-[#1A1A1E] placeholder-[#9B9BA5] focus:outline-none focus:border-[#5B4FE8] focus:ring-1 focus:ring-[#5B4FE8] transition-all"
          />
          <kbd className="hidden lg:inline-block absolute right-2.5 text-[10px] text-[#6B6B76] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E5E5EA] shadow-xs">
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FFFFFF] border border-[#E5E5EA] hover:bg-[#F1F1F4] text-[#1A1A1E] transition-colors shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="hidden sm:inline text-[#6B6B76]">Persona:</span>
            <span className="font-semibold text-[#1A1A1E] truncate max-w-[120px]">{user?.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B6B76]" />
          </button>

          {showPersonaMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl shadow-xl p-2 z-50">
              <div className="px-2 py-1.5 text-[11px] font-semibold text-[#9B9BA5] uppercase tracking-wider">
                1-Click Demo Persona Switcher
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => handlePersonaSwitch('employee_arjun')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#1A1A1E] hover:bg-[#F1F1F4] transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-[#5B4FE8]" />
                  <div>
                    <div className="font-medium text-[#1A1A1E]">Arjun Kumar (Featured Demo)</div>
                    <div className="text-[10px] text-[#6B6B76]">Backend Developer → Technical Leadership</div>
                  </div>
                </button>

                <button
                  onClick={() => handlePersonaSwitch('hr')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#1A1A1E] hover:bg-[#F1F1F4] transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-[#712AE2]" />
                  <div>
                    <div className="font-medium text-[#1A1A1E]">Sarah Jenkins (HR Lead)</div>
                    <div className="text-[10px] text-[#6B6B76]">Talent Discovery & Organization Matching</div>
                  </div>
                </button>

                <button
                  onClick={() => handlePersonaSwitch('employee_priya')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#1A1A1E] hover:bg-[#F1F1F4] transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-[#3B82F6]" />
                  <div>
                    <div className="font-medium text-[#1A1A1E]">Priya Patel (Frontend Lead)</div>
                    <div className="text-[10px] text-[#6B6B76]">Design Systems → Product Strategy</div>
                  </div>
                </button>

                <button
                  onClick={() => handlePersonaSwitch('admin')}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#1A1A1E] hover:bg-[#F1F1F4] transition-colors border-t border-[#E5E5EA] mt-1 pt-2"
                >
                  <Shield className="w-4 h-4 text-[#5B4FE8]" />
                  <div>
                    <div className="font-medium text-[#1A1A1E]">Platform Administrator</div>
                    <div className="text-[10px] text-[#6B6B76]">admin@acme.com</div>
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
            className="p-2 rounded-lg text-[#6B6B76] hover:text-[#1A1A1E] hover:bg-[#F1F1F4] border border-transparent hover:border-[#E5E5EA] transition-colors relative"
            title="In-App Talent Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#5B4FE8]" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E5E5EA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#1A1A1E]">Talent Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#5B4FE8]/15 text-[#5B4FE8] px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[#5B4FE8] hover:underline font-medium transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#E5E5EA]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#9B9BA5]">No notifications yet</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-3.5 hover:bg-[#F1F1F4]/70 cursor-pointer transition-colors ${
                        !n.is_read ? 'bg-[#5B4FE8]/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              !n.is_read ? 'bg-[#5B4FE8]' : 'bg-transparent'
                            }`}
                          />
                          <p className="text-xs font-semibold text-[#1A1A1E]">{n.title}</p>
                        </div>
                        <span className="text-[10px] text-[#9B9BA5] whitespace-nowrap font-mono">
                          {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6B76] mt-1 pl-3 leading-relaxed">{n.message}</p>
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
            className="flex items-center gap-2.5 p-1 pl-2.5 rounded-lg border border-[#E5E5EA] hover:border-[#5B4FE8]/40 bg-[#FFFFFF] transition-colors shadow-xs"
          >
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-[#1A1A1E] leading-none">{user?.name}</div>
              <div className="mt-1">
                <Badge variant={getRoleBadgeColor()} size="sm">
                  {user?.role}
                </Badge>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B4FE8] to-[#712AE2] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user?.name ? user.name[0] : 'U'}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl shadow-xl p-1.5 z-50">
              <div className="px-3 py-2 border-b border-[#E5E5EA] mb-1">
                <div className="text-xs font-medium text-[#1A1A1E] truncate">{user?.name}</div>
                <div className="text-[11px] text-[#6B6B76] truncate">{user?.email}</div>
              </div>
              <button
                onClick={logout}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition-colors"
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
