import { HashRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import StatsPage from './pages/Stats';
import UsersPage from './pages/Users';
import Layout from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useTheme } from './hooks/useTheme';
import { useNotifications } from './hooks/useNotifications';
import N8nBuilder from './pages/N8nBuilder';
import PostCreatorPage from './pages/PostCreator';
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import { SpeedInsights } from "@vercel/speed-insights/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Main application component with all the pages and logic
function MainApp() {
  const { theme } = useTheme();
  const notifications = useNotifications();
  const { user, isLoaded } = useUser();

  // RBAC logic - to be fully implemented in Phase 2
  const hasPermission = (permission: string): boolean => {
    if (!isLoaded || !user) return false;
    // For now, allow all logged in users. In Phase 2, we'll check user.publicMetadata.role
    console.log(`Checking permission (stub): ${permission} for user ${user.id}`);
    return true;
  };

  const isSuperAdmin = (): boolean => {
    if (!isLoaded || !user) return false;
    // In Phase 2, check for specific roles
    return true;
  };

  if (!isLoaded) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      } flex items-center justify-center`}>
        <div className="text-center">
          <div className={`w-8 h-8 border-4 ${theme === 'dark' ? 'border-blue-400/30 border-t-blue-400' : 'border-blue-600/30 border-t-blue-600'} rounded-full animate-spin`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <SignedIn>
        <Layout 
          notifications={notifications}
          hasPermission={hasPermission}
        >
          <Routes>
            <Route index element={<HomePage notifications={notifications} />} />
            <Route path="post-creator" element={<PostCreatorPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="settings" element={<SettingsPage hasPermission={hasPermission} />} />
            <Route path="n8n-builder" element={<N8nBuilder />} />
            <Route path="users" element={<UsersPage hasPermission={hasPermission} isSuperAdmin={isSuperAdmin()} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </SignedOut>
    </div>
  );
}

// Component to provide Clerk and Router context
function App() {
  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <MainApp />
    </ClerkProvider>
  );
}

// Top-level export with ErrorBoundary and Router
export default function Root() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  );
}