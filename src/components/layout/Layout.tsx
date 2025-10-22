import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: 'หน้าแรก', href: '/', icon: '🏠' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'วิเคราะห์', href: '/analysis', icon: '🔍' },
    { name: 'รายงาน', href: '/reports', icon: '📈' },
    { name: 'ตั้งค่า', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-purple-200 bg-white/80 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-20 items-center">
          <div className="mr-8 flex">
            <Link to="/" className="mr-6 flex items-center space-x-3 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">🤖</span>
              <span className="hidden font-extrabold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent sm:inline-block">
                AI FB Post Checker 888
              </span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-purple-100 hover:text-purple-700"
                )}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-purple-200 bg-white/50 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <p className="text-sm text-muted-foreground font-medium">
            © 2025 AI FB Post Checker 888 • Powered by React + Vite ⚡
          </p>
          <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Version 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
}
