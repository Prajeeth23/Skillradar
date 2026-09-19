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
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminRolesPage } from './pages/admin/AdminRolesPage';

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

// Stitch Flagship Pages
import { StitchLayout } from './components/layout/StitchLayout';
import { DiscoverPage } from './pages/stitch/DiscoverPage';
import { CapabilityConstellationPage } from './pages/stitch/CapabilityConstellationPage';
import { DivergencePage } from './pages/stitch/DivergencePage';
import { WhyArjunPage } from './pages/stitch/WhyArjunPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Assessment Route - UNTOUCHED */}
            <Route path="/assessment/:token" element={<AssessmentPage />} />

            {/* Auth Page */}
            <Route path="/login" element={<LoginPage />} />

            {/* Stitch Flagship UI Experience */}
            <Route element={<StitchLayout />}>
              <Route path="/" element={<DiscoverPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/my-skills" element={<CapabilityConstellationPage />} />
              <Route path="/divergence" element={<DivergencePage />} />
              <Route path="/why-arjun" element={<WhyArjunPage />} />
              <Route path="/opportunities" element={<InternalOpportunitiesPage />} />
              <Route path="/talent-radar" element={<TalentMatchingPage />} />
            </Route>

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
              <Route path="roles" element={<AdminRolesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="audit" element={<AdminAuditLogsPage />} />
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
              <Route path="skills" element={<CapabilityConstellationPage />} />
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
