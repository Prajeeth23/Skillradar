import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole } from '../types/auth';
import { loginApi, getMeApi } from '../api/auth';
import { DEMO_USERS } from '../mock/users';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginAsDemoUser: (key: keyof typeof DEMO_USERS) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialize session from localStorage or default to HR / Marcus for quick evaluation
    const storedToken = localStorage.getItem('skillradar_token');
    const storedUser = localStorage.getItem('skillradar_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('skillradar_token');
        localStorage.removeItem('skillradar_user');
      }
    } else {
      // Default to Arjun Kumar for premier talent discovery experience
      const defaultPersona = DEMO_USERS.employee_arjun;
      setToken(defaultPersona.token);
      setUser(defaultPersona.user);
      localStorage.setItem('skillradar_token', defaultPersona.token);
      localStorage.setItem('skillradar_user', JSON.stringify(defaultPersona.user));

      // Silently exchange for real backend JWT if available
      loginApi('arjun.mehta@acme.com', 'employee123')
        .then((resp) => {
          setToken(resp.access_token);
          setUser(resp.user);
          localStorage.setItem('skillradar_token', resp.access_token);
          localStorage.setItem('skillradar_user', JSON.stringify(resp.user));
        })
        .catch(() => {
          // Graceful fallback to mock mode
        });
    }
    setIsLoading(false);
  }, []);


  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const resp = await loginApi(email, pass);
      setToken(resp.access_token);
      setUser(resp.user);
      localStorage.setItem('skillradar_token', resp.access_token);
      localStorage.setItem('skillradar_user', JSON.stringify(resp.user));
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemoUser = async (key: keyof typeof DEMO_USERS) => {
    const persona = DEMO_USERS[key];
    if (!persona) return;

    // Set immediate mock state for snappy UI feedback
    setToken(persona.token);
    setUser(persona.user);
    localStorage.setItem('skillradar_token', persona.token);
    localStorage.setItem('skillradar_user', JSON.stringify(persona.user));

    // Attempt live token exchange
    try {
      let pass = 'employee123';
      if (persona.user.role === 'PLATFORM_ADMIN') pass = 'admin123';
      else if (persona.user.role === 'HR') pass = 'hr123';

      const resp = await loginApi(persona.user.email, pass);
      setToken(resp.access_token);
      setUser(resp.user);
      localStorage.setItem('skillradar_token', resp.access_token);
      localStorage.setItem('skillradar_user', JSON.stringify(resp.user));
    } catch {
      // Offline fallback preserved
    }
  };

  const switchRole = async (role: UserRole) => {
    if (!user) return;
    let targetKey: keyof typeof DEMO_USERS = 'hr';
    if (role === 'PLATFORM_ADMIN') targetKey = 'admin';
    else if (role === 'EMPLOYEE') targetKey = 'employee_marcus';

    await loginAsDemoUser(targetKey);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('skillradar_token');
    localStorage.removeItem('skillradar_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        loginAsDemoUser,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
