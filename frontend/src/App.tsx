import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';

// Auth Page
import { LoginPage } from './pages/auth/LoginPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';

// HR Pages
import { HRDashboard } from './pages/hr/HRDashboard';
import { EmployeeDirectory } from './pages/hr/EmployeeDirectory';
import { EmployeeDossierPage } from './pages/hr/EmployeeDossierPage';
import { InternalRolesPage } from './pages/hr/InternalRolesPage';
import { TalentMatchingPage } from './pages/hr/TalentMatchingPage';
import { HRSkillGapsPage } from './pages/hr/HRSkillGapsPage';

// Employee Pages
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { EmployeeProfilePage } from './pages/employee/EmployeeProfilePage';
import { SkillGapAnalysisPage } from './pages/employee/SkillGapAnalysisPage';
import { InternalOpportunitiesPage } from './pages/employee/InternalOpportunitiesPage';
import { CareerAssistantPage } from './pages/employee/CareerAssistantPage';
import { AssessmentPage } from './pages/employee/AssessmentPage';

const RootRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role === 'PLATFORM_ADMIN') return <Navigate to="/admin" replace />;
  if (user.role === 'HR') return <Navigate to="/hr" replace />;
  return <Navigate to="/employee" replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/assessment/:token" element={<AssessmentPage />} />

            {/* Root Dispatcher */}
            <Route path="/" element={<RootRedirect />} />

            {/* Platform Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['PLATFORM_ADMIN']}>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="hr" element={<UserManagement />} />
              <Route path="employees" element={<UserManagement />} />
              <Route path="roles" element={<UserManagement />} />
              <Route path="settings" element={<UserManagement />} />
              <Route path="audit" element={<UserManagement />} />
            </Route>

            {/* HR Protected Routes */}
            <Route
              path="/hr"
              element={
                <ProtectedRoute allowedRoles={['HR', 'PLATFORM_ADMIN']}>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<HRDashboard />} />
              <Route path="employees" element={<EmployeeDirectory />} />
              <Route path="employees/:id" element={<EmployeeDossierPage />} />
              <Route path="discovery" element={<TalentMatchingPage />} />
              <Route path="roles" element={<InternalRolesPage />} />
              <Route path="skill-gaps" element={<HRSkillGapsPage />} />
              <Route path="notifications" element={<HRDashboard />} />
            </Route>

            {/* Employee Protected Routes */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<EmployeeDashboard />} />
              <Route path="profile" element={<EmployeeProfilePage />} />
              <Route path="skills" element={<EmployeeProfilePage />} />
              <Route path="skill-gap" element={<SkillGapAnalysisPage />} />
              <Route path="opportunities" element={<InternalOpportunitiesPage />} />
              <Route path="roadmap" element={<SkillGapAnalysisPage />} />
              <Route path="assistant" element={<CareerAssistantPage />} />
              <Route path="notifications" element={<EmployeeDashboard />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
