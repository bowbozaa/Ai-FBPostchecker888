import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileSearch, Settings, BarChart3, Shield } from 'lucide-react';

const menuItems = [
  { path: '/', icon: Home, label: 'หน้าแรก' },
  { path: '/analyze', icon: FileSearch, label: 'วิเคราะห์โพสต์' },
  { path: '/reports', icon: BarChart3, label: 'รายงาน' },
  { path: '/settings', icon: Settings, label: 'ตั้งค่า' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Shield className="h-8 w-8" />
            <span className="hidden sm:inline">FB Post Monitor</span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
