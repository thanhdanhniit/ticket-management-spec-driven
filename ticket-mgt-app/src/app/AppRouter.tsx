import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import SettingsLayout from '../layouts/SettingsLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// ── Auth ─────────────────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));

// ── Dashboard ─────────────────────────────────────────────────────────────────
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'));

// ── Settings pages ────────────────────────────────────────────────────────────
const UsersPage = lazy(() => import('../features/settings/pages/UsersPage'));
const PermissionsPage = lazy(() => import('../features/settings/pages/PermissionsPage'));
const TeamsPage = lazy(() => import('../features/settings/pages/TeamsPage'));
const PostmortemTemplatesPage = lazy(() => import('../features/settings/pages/PostmortemTemplatesPage'));
const AuditLogsPage = lazy(() => import('../features/settings/pages/AuditLogsPage'));

// ── Escalation Policies ───────────────────────────────────────────────────────
const EscalationPoliciesPage = lazy(() => import('../features/escalation-policy/pages/EscalationPoliciesPage'));

// ── Services ──────────────────────────────────────────────────────────────────
const ServiceListPage = lazy(() => import('../features/services/pages/ServiceListPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner fullPage />
  </div>
);

const ComingSoon = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400 gap-2">
    <p className="text-lg font-semibold">{label}</p>
    <p className="text-sm">This module is coming soon.</p>
  </div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Public ──────────────────────────────────────────────────────── */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── Protected ───────────────────────────────────────────────────── */}
          <Route element={<ProtectedRoute />}>

            {/* Main two-column layout (GlobalSidebar + TopNav + content) */}
            <Route element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/incidents" element={<ComingSoon label="Incidents" />} />
              <Route path="/escalation-policies" element={<EscalationPoliciesPage />} />
              <Route path="/services" element={<ServiceListPage />} />
              <Route path="/schedules" element={<ComingSoon label="Schedules" />} />
              <Route path="/runbooks" element={<ComingSoon label="Runbooks" />} />
              <Route path="/postmortems" element={<ComingSoon label="Postmortems" />} />
              <Route path="/analytics" element={<ComingSoon label="Analytics" />} />
            </Route>

            {/* Settings — triple-column (GlobalSidebar + SettingsSidebar + content) */}
            <Route element={<MainLayout />}>
              <Route path="/settings" element={<SettingsLayout />}>
                {/* Default redirect → users list */}
                <Route index element={<Navigate to="/settings/users" replace />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="permissions" element={<PermissionsPage />} />
                <Route path="teams" element={<TeamsPage />} />
                <Route path="postmortem-templates" element={<PostmortemTemplatesPage />} />
                <Route path="audit-logs" element={<AuditLogsPage />} />
              </Route>
            </Route>

          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
