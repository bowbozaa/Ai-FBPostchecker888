import React, { useState } from 'react'
import { Dashboard } from './pages/Dashboard'
import { PostMonitor } from './pages/PostMonitor'
import { Settings } from './pages/Settings'
import { LayoutDashboard, FileSearch, Settings as SettingsIcon } from 'lucide-react'

type Page = 'dashboard' | 'monitor' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const navigation = [
    { id: 'dashboard' as Page, name: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitor' as Page, name: 'Post Monitor', icon: FileSearch },
    { id: 'settings' as Page, name: 'Settings', icon: SettingsIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">FB Post Shield</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              AI Facebook Post Checker
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              v1.0.0
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="min-h-screen">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'monitor' && <PostMonitor />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  )
}

export default App
