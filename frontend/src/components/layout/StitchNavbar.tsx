import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DEMO_USERS } from '../../mock/users';

export const StitchNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loginAsDemoUser } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { label: 'Discover', path: '/discover' },
    { label: 'Opportunities', path: '/opportunities' },
    { label: 'My Skills', path: '/my-skills' },
    { label: 'Divergence', path: '/divergence' },
    { label: 'Talent Radar', path: '/hr/discovery' },
    { label: 'Why Arjun?', path: '/why-arjun' },
  ];

  const isCurrent = (path: string) => {
    if (path === '/discover' && (location.pathname === '/' || location.pathname === '/discover')) {
      return true;
    }
    return location.pathname === path;
  };

  const handlePersonaSwitch = (key: keyof typeof DEMO_USERS) => {
    loginAsDemoUser(key);
    setShowProfileMenu(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#faf9fd]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e3e2e6]/60">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo matching reference screenshot */}
          <Link to="/discover" className="flex items-center gap-2.5 shrink-0 group">
            <svg className="w-6 h-6 text-[#2a14b4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="2.5" fill="#2a14b4" />
              <circle cx="6" cy="7" r="1.75" fill="#712ae2" />
              <circle cx="18" cy="7" r="1.75" fill="#712ae2" />
              <circle cx="5" cy="16" r="1.75" fill="#2a14b4" />
              <circle cx="19" cy="16" r="1.75" fill="#2a14b4" />
              <circle cx="12" cy="20" r="1.75" fill="#712ae2" />
              <path d="M12 12L6 7M12 12L18 7M12 12L5 16M12 12L19 16M12 12L12 20" stroke="#712ae2" strokeWidth="1.2" strokeOpacity="0.6" />
            </svg>
            <span className="font-['Plus_Jakarta_Sans'] text-[13px] tracking-wider text-[#1b1b1f] font-bold">
              SKILLRADAR
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map(item => {
              const active = isCurrent(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-lg text-[13px] transition-all font-['Plus_Jakarta_Sans'] ${
                    active
                      ? 'bg-[#f0eff4] text-[#1b1b1f] font-medium shadow-xs'
                      : 'text-[#464554] hover:bg-[#f0eff4]/60 hover:text-[#1b1b1f]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search Button */}
            <button
              aria-label="Search"
              onClick={() => setShowSearch(true)}
              className="p-1.5 rounded-lg text-[#525160] hover:bg-[#f0eff4] hover:text-[#1b1b1f] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">search</span>
            </button>

            {/* Filter / Tune Icon */}
            <button
              aria-label="Filter"
              className="p-1.5 rounded-lg text-[#525160] hover:bg-[#f0eff4] hover:text-[#1b1b1f] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">tune</span>
            </button>

            {/* Notifications Button */}
            <div className="relative" ref={notifRef}>
              <button
                aria-label="Notifications"
                onClick={() => setShowNotifications(prev => !prev)}
                className="relative p-1.5 rounded-lg text-[#525160] hover:bg-[#f0eff4] hover:text-[#1b1b1f] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#712ae2] ring-2 ring-[#faf9fd]"></span>
                )}
              </button>


              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#e3e2e6] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#e3e2e6] flex items-center justify-between">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[13px] text-[#1b1b1f]">
                      Notifications
                    </span>
                    <span className="text-[11px] font-mono text-[#777586]">{unreadCount} unread</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-[12px] text-[#777586]">No notifications</div>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`p-3 text-[12px] hover:bg-[#f5f3f7] cursor-pointer transition-colors ${
                            !n.is_read ? 'bg-purple-50/50' : ''
                          }`}
                        >
                          <div className="font-semibold text-[#1b1b1f]">{n.title}</div>
                          <div className="text-[#464554] text-[11px] mt-0.5">{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(prev => !prev)}
                className="flex items-center gap-2 pl-1 p-1 rounded-lg hover:bg-[#f5f3f7] transition-colors cursor-pointer"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e3e2e6]"
                  src="/assets/stitch/arjun_avatar.jpg"
                  onError={(e) => {
                    // Fallback to hosted URL if local load has any glitch
                    (e.target as HTMLImageElement).src =
                      'https://lh3.googleusercontent.com/aida/AEtjO1W3xlrX9U-m4YA3HmTsgJ5RCIa7lAhMH8ihGsmYWwaenkUmVUWWgUMBMktnUNSXvmDEn_nqcrtH3N4z0yKrLk9EARfA3RbkMtYYjJqABfUSNm9wiBr0K3BBH0Y2PyiEyZ2eokTyhsqSr0gA9sEbwd2Ef1q62QeNGWuy9_nlkTjuheYtYuNUzriXVnbd2WVrSDGjJyHjQltjWjAD9JeFg1WPAY_nf2wqtf43TQDsGDJHXead3ZVomxb0IPA';
                  }}
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#1b1b1f] font-semibold leading-tight">
                    {user?.name || 'Arjun Kumar'}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#777586] leading-tight">
                    {user?.role === 'PLATFORM_ADMIN' ? 'Platform Admin' : user?.role === 'HR' ? 'HR Talent Lead' : 'Executive AI'}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#e3e2e6] py-1.5 z-50 text-[13px] font-['Plus_Jakarta_Sans']">
                  <div className="px-3 py-2 border-b border-[#e3e2e6]">
                    <p className="font-semibold text-[#1b1b1f]">{user?.name || 'Arjun Kumar'}</p>
                    <p className="text-[11px] text-[#777586] font-mono">{user?.email || 'arjun.kumar@internal.corp'}</p>
                  </div>

                  <div className="py-1 border-b border-[#e3e2e6]">
                    <div className="px-3 py-1 text-[11px] font-semibold text-[#777586] uppercase tracking-wider">
                      Switch Persona
                    </div>
                    <button
                      onClick={() => handlePersonaSwitch('employee_arjun')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#f5f3f7] flex items-center justify-between text-[#1b1b1f] cursor-pointer"
                    >
                      <span>Arjun Kumar (Engineer)</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono">IC-5</span>
                    </button>
                    <button
                      onClick={() => handlePersonaSwitch('hr')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#f5f3f7] flex items-center justify-between text-[#1b1b1f] cursor-pointer"
                    >
                      <span>Sarah Jenkins (HR Lead)</span>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-mono">HR</span>
                    </button>
                    <button
                      onClick={() => handlePersonaSwitch('employee_priya')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#f5f3f7] flex items-center justify-between text-[#1b1b1f] cursor-pointer"
                    >
                      <span>Priya Patel (Designer)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">UI/UX</span>
                    </button>
                    <button
                      onClick={() => handlePersonaSwitch('admin')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#f5f3f7] flex items-center justify-between text-[#1b1b1f] cursor-pointer"
                    >
                      <span>Platform Admin</span>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-mono">ADMIN</span>
                    </button>
                  </div>


                  <div className="py-1">
                    <Link
                      to="/assessment/token-liam-tanaka-test-gamified"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-3 py-1.5 hover:bg-purple-50 text-purple-700"
                    >
                      Take Psychometric Test
                    </Link>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Modal (⌘K) */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e3e2e6] w-full max-w-lg overflow-hidden">
            <div className="p-3 border-b border-[#e3e2e6] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#777586]">search</span>
              <input
                autoFocus
                type="text"
                placeholder="Search capabilities, roles, telemetry, or candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-[14px] outline-none font-['Plus_Jakarta_Sans'] text-[#1b1b1f] placeholder:text-[#777586]"
              />
              <button
                onClick={() => setShowSearch(false)}
                className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#f5f3f7] text-[#777586] hover:bg-[#e9e7ec]"
              >
                ESC
              </button>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto text-[13px] font-['Plus_Jakarta_Sans']">
              <div className="px-2 py-1 text-[11px] font-semibold text-[#777586] uppercase tracking-wider">
                Quick Navigation
              </div>
              <div
                onClick={() => { setShowSearch(false); navigate('/discover'); }}
                className="px-3 py-2 rounded-lg hover:bg-[#f5f3f7] cursor-pointer flex items-center justify-between"
              >
                <span className="text-[#1b1b1f] font-medium">Discover — Title vs Actual Work</span>
                <span className="text-[11px] font-mono text-[#777586]">/discover</span>
              </div>
              <div
                onClick={() => { setShowSearch(false); navigate('/my-skills'); }}
                className="px-3 py-2 rounded-lg hover:bg-[#f5f3f7] cursor-pointer flex items-center justify-between"
              >
                <span className="text-[#1b1b1f] font-medium">My Skills — Capability Constellation</span>
                <span className="text-[11px] font-mono text-[#777586]">/my-skills</span>
              </div>
              <div
                onClick={() => { setShowSearch(false); navigate('/divergence'); }}
                className="px-3 py-2 rounded-lg hover:bg-[#f5f3f7] cursor-pointer flex items-center justify-between"
              >
                <span className="text-[#1b1b1f] font-medium">Divergence Engine — Where Title Ends</span>
                <span className="text-[11px] font-mono text-[#777586]">/divergence</span>
              </div>
              <div
                onClick={() => { setShowSearch(false); navigate('/why-arjun'); }}
                className="px-3 py-2 rounded-lg hover:bg-[#f5f3f7] cursor-pointer flex items-center justify-between"
              >
                <span className="text-[#1b1b1f] font-medium">Why Arjun? Match Explanation</span>
                <span className="text-[11px] font-mono text-[#777586]">/why-arjun</span>
              </div>
              <div
                onClick={() => { setShowSearch(false); navigate('/assessment/token-liam-tanaka-test-gamified'); }}
                className="px-3 py-2 rounded-lg hover:bg-purple-50 cursor-pointer flex items-center justify-between text-purple-700"
              >
                <span className="font-medium">Gamified Psychometric Assessment (10 Missions)</span>
                <span className="text-[11px] font-mono text-purple-500">/assessment</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
