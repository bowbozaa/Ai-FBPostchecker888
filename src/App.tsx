import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

// Original Pages
import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import Analysis from '@/pages/Analysis';
import Dashboard from '@/pages/Dashboard';
import Reports from '@/pages/Reports';
import NotFound from '@/pages/NotFound';

// FB Post Checker Pages
import FBPostChecker from '@/pages/FBPostChecker';
import FBCheckerDashboard from '@/pages/FBCheckerDashboard';
import FBCheckerSettings from '@/pages/FBCheckerSettings';
import FBMonitoring from '@/pages/FBMonitoring';

// AI Chat Pages
import AIChat from '@/pages/AIChat';
import AISettings from '@/pages/AISettings';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto max-w-6xl px-6 py-8">
            <Routes>
              {/* Original Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />

              {/* FB Post Checker Routes */}
              <Route path="/fb-post-checker" element={<FBPostChecker />} />
              <Route path="/fb-checker-dashboard" element={<FBCheckerDashboard />} />
              <Route path="/fb-checker-settings" element={<FBCheckerSettings />} />
              <Route path="/fb-monitoring" element={<FBMonitoring />} />

              {/* AI Chat Routes */}
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/ai-settings" element={<AISettings />} />

              {/* 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}
