import React, { useState, useEffect } from 'react'
import { Dashboard } from './pages/Dashboard'
import { PostMonitor } from './pages/PostMonitor'
import { Settings } from './pages/Settings'
import { AdminPanel } from './pages/AdminPanel'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { LayoutDashboard, FileSearch, Settings as SettingsIcon, LogOut, Shield } from 'lucide-react'

type Page = 'dashboard' | 'monitor' | 'settings' | 'admin'
type AuthPage = 'login' | 'register'

interface User {
  id: number
  username: string
  email: string
  is_admin: boolean
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [authPage, setAuthPage] = useState<AuthPage>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    setLoading(false)
  }, [])

  const handleLogin = (token: string, userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
    setCurrentPage('dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    if (authPage === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthPage('register')}
        />
      )
    } else {
      return (
        <Register
          onSwitchToLogin={() => setAuthPage('login')}
        />
      )
    }
  }

  const navigation = [
    { id: 'dashboard' as Page, name: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitor' as Page, name: 'Post Monitor', icon: FileSearch },
    { id: 'settings' as Page, name: 'Settings', icon: SettingsIcon },
    ...(user?.is_admin ? [{ id: 'admin' as Page, name: 'Admin Panel', icon: Shield }] : []),
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

          {/* User Info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            {user?.is_admin && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                  Admin
                </span>
              </div>
            )}
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

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              ออกจากระบบ
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              AI Facebook Post Checker
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              v2.0.0 with Auth
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
          {currentPage === 'admin' && user?.is_admin && <AdminPanel />}
        </main>
      </div>
    </div>
  )
}

export default App
