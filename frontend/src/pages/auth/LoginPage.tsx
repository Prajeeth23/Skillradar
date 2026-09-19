import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Shield, Briefcase, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../mock/users';

export const LoginPage: React.FC = () => {
  const { login, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('hr.sarah@acme.com');
  const [password, setPassword] = useState('hr123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      // Route based on role
      if (email.includes('admin')) navigate('/admin');
      else if (email.includes('hr')) navigate('/hr');
      else navigate('/employee');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = (key: keyof typeof DEMO_USERS) => {
    loginAsDemoUser(key);
    const targetRole = DEMO_USERS[key].user.role;
    if (targetRole === 'PLATFORM_ADMIN') navigate('/admin');
    else if (targetRole === 'HR') navigate('/hr');
    else navigate('/employee');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5B4FE8] to-[#712AE2] shadow-md mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">SkillRadar</h1>
        <p className="mt-1.5 text-sm font-medium text-[#6B6B76]">
          Beyond Titles. Discover Talent.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-[#FFFFFF] py-8 px-6 shadow-xl rounded-2xl border border-[#E5E5EA] sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-xs text-rose-600 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] placeholder-[#9B9BA5] focus:outline-none focus:border-[#5B4FE8] focus:ring-1 focus:ring-[#5B4FE8] transition-all"
                placeholder="name@acme.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] placeholder-[#9B9BA5] focus:outline-none focus:border-[#5B4FE8] focus:ring-1 focus:ring-[#5B4FE8] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#5B4FE8] hover:bg-[#4A3FD1] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to SkillRadar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Hackathon Persona Switcher */}
          <div className="mt-8 pt-6 border-t border-[#E5E5EA]">
            <div className="text-[11px] font-bold text-[#9B9BA5] uppercase tracking-wider mb-3 text-center font-mono">
              Instant 1-Click Hackathon Personas
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDemoSelect('employee_arjun')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E5EA] hover:border-[#5B4FE8]/40 hover:bg-[#F4F3FF]/40 text-left transition-all group shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#5B4FE8]/10 text-[#5B4FE8]">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A1E] group-hover:text-[#5B4FE8] transition-colors font-['Plus_Jakarta_Sans']">
                      Arjun Kumar (Featured Employee Demo)
                    </div>
                    <div className="text-[10px] text-[#6B6B76]">Backend Dev → Technical Leadership</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#9B9BA5] group-hover:text-[#5B4FE8] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('hr')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E5EA] hover:border-[#712AE2]/40 hover:bg-[#F4F3FF]/40 text-left transition-all group shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#712AE2]/10 text-[#712AE2]">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A1E] group-hover:text-[#712AE2] transition-colors font-['Plus_Jakarta_Sans']">
                      HR Talent Intelligence (Sarah)
                    </div>
                    <div className="text-[10px] text-[#6B6B76]">Talent Discovery & Role Matching</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#9B9BA5] group-hover:text-[#712AE2] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('admin')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E5EA] hover:border-[#5B4FE8]/40 hover:bg-[#F4F3FF]/40 text-left transition-all group shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#5B4FE8]/10 text-[#5B4FE8]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A1E] group-hover:text-[#5B4FE8] transition-colors font-['Plus_Jakarta_Sans']">
                      Platform Administrator
                    </div>
                    <div className="text-[10px] text-[#6B6B76]">Tenant & User Governance</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#9B9BA5] group-hover:text-[#5B4FE8] transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
