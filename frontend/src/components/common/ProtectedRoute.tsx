import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-slate-400 text-xs">
        Loading SkillRadar session...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const getHomePath = () => {
      if (user.role === 'PLATFORM_ADMIN') return '/admin';
      if (user.role === 'HR') return '/hr';
      return '/employee';
    };

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">403 — Access Restricted</h2>
        <p className="text-xs text-slate-400 max-w-md mt-2 mb-6 leading-relaxed">
          Your current account role (<span className="text-rose-400 font-semibold">{user.role}</span>) does not have
          permission to access this section.
        </p>
        <button
          onClick={() => navigate(getHomePath())}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
        >
          Return to {user.role === 'HR' ? 'HR Dashboard' : user.role === 'PLATFORM_ADMIN' ? 'Admin' : 'Employee Dashboard'}
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
