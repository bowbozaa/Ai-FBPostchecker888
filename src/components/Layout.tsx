/** 
 * Layout Component - Main layout with navigation and notification system
 */

import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { 
  Shield, Settings, BarChart3, Users, LogOut, Bell, 
  Menu, X, Sun, Moon, Home, Activity, Zap, Globe, SquarePen,
  CheckCircle, AlertTriangle, XCircle, Info
} from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/**
 * Interface สำหรับ User
 */
interface User {
  id: string
  username: string
  email: string
  role: string
  permissions?: string[]
}

/**
 * Interface สำหรับ Notification
 */
interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: Date
  read?: boolean
  postId?: string
  riskLevel?: number
}

/**
 * Interface สำหรับ Layout Props
 */
interface LayoutProps {
  user: User
  onLogout: () => void
  notifications: {
    notifications: Notification[]
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
    markAsRead: (id: string) => void
    clearAll: () => void
  }
  hasPermission: (permission: string) => boolean
}

/**
 * Layout Component with Fixed Notification System
 */
export default function Layout({ user, onLogout, notifications, hasPermission }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  /**
   * Navigation items with permissions
   */
  const navigationItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/',
      permission: 'dashboard_view'
    },
    {
      name: 'สร้างโพสต์ใหม่',
      icon: SquarePen,
      path: '/post-creator',
      permission: 'analysis_run'
    },
    {
      name: 'Statistics',
      icon: BarChart3,
      path: '/stats',
      permission: 'stats_view'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      permission: 'keywords_manage'
    },
    {
      name: 'Users',
      icon: Users,
      path: '/users',
      permission: 'users_view'
    },
    {
      name: 'n8n Flow',
      icon: Globe,
      path: '/n8n-builder',
      permission: 'api_config'
    }
  ].filter(item => hasPermission(item.permission))

  /**
   * Get notification icon
   */
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
      case 'error': return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
      default: return <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
    }
  }

  /**
   * Get notification background color
   */
  const getNotificationBg = (type: string) => {
    const baseClasses = theme === 'dark' ? 'border-white/10' : 'border-gray-200'
    switch (type) {
      case 'success': 
        return `${theme === 'dark' ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'} ${baseClasses}`
      case 'error': 
        return `${theme === 'dark' ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'} ${baseClasses}`
      case 'warning': 
        return `${theme === 'dark' ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'} ${baseClasses}`
      default: 
        return `${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'} ${baseClasses}`
    }
  }

  /**
   * Close sidebar when route changes
   */
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  /**
   * Close notifications when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showNotifications && !target.closest('[data-notification-panel]') && !target.closest('[data-notification-button]')) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifications])

  const unreadCount = notifications.notifications.filter(n => !n.read).length

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${theme === 'dark' ? 'bg-slate-800/95 backdrop-blur-sm border-r border-white/10' : 'bg-white/95 backdrop-blur-sm border-r border-gray-200'} shadow-2xl`}>
        
        {/* Logo & Brand */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-purple-700'} rounded-xl flex items-center justify-center shadow-lg`}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>FB Checker</h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} font-medium`}>v2.0 AI</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={`lg:hidden p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg'
                        : 'bg-blue-100 text-blue-700 border border-blue-200 shadow-md'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className={`p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} rounded-xl mb-4`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'} rounded-full flex items-center justify-center`}>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate`}>
                  {user.username}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs bg-transparent">
                {user.role}
              </Badge>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {user.permissions?.length || 0} permissions
              </span>
            </div>
          </div>

          <Button
            onClick={onLogout}
            variant="outline"
            className={`w-full ${theme === 'dark' ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-red-300 text-red-600 hover:bg-red-50'} bg-transparent`}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className={`sticky top-0 z-30 ${theme === 'dark' ? 'bg-slate-800/95 backdrop-blur-sm border-b border-white/10' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`lg:hidden p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div>
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {navigationItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
                </h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Welcome back, {user.username}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${theme === 'dark' ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  data-notification-button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-xl ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                  )}
                </button>

                {/* Notification Panel */}
                {showNotifications && (
                  <div 
                    data-notification-panel
                    className={`absolute right-0 top-full mt-2 w-96 max-h-[500px] ${theme === 'dark' ? 'bg-slate-800/95 border-white/20' : 'bg-white border-gray-200'} rounded-2xl border shadow-2xl backdrop-blur-sm z-50 overflow-hidden`}
                  >
                    {/* Header */}
                    <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          การแจ้งเตือน ({notifications.notifications.length})
                        </h3>
                        {notifications.notifications.length > 0 && (
                          <button
                            onClick={notifications.clearAll}
                            className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}
                          >
                            อ่านทั้งหมด
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.notifications.length > 0 ? (
                        <div className="p-2">
                          {notifications.notifications.slice(0, 10).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 m-2 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-md ${getNotificationBg(notification.type)} ${!notification.read ? 'ring-2 ring-blue-500/20' : ''}`}
                              onClick={() => notifications.markAsRead(notification.id)}
                            >
                              <div className="flex items-start space-x-3">
                                {getNotificationIcon(notification.type)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate pr-2`}>
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    )}
                                  </div>
                                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-2`}>
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {notification.timestamp.toLocaleString('th-TH')}
                                    </span>
                                    {notification.riskLevel && (
                                      <Badge variant="outline" className="text-xs bg-transparent">
                                        Risk: {notification.riskLevel}/5
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="font-medium mb-1">ไม่มีการแจ้งเตือน</p>
                          <p className="text-sm">การแจ้งเตือนจะปรากฏที่นี่</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative">
          <Outlet />
        </main>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-[100] space-y-3 max-w-sm">
        {notifications.notifications
          .filter(n => !n.read)
          .slice(0, 3)
          .map((notification) => (
            <div
              key={`toast-${notification.id}`}
              className={`transform transition-all duration-500 ease-out animate-in slide-in-from-right-full ${getNotificationBg(notification.type)} rounded-xl border shadow-lg p-4 backdrop-blur-sm`}
            >
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {notification.title}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {notification.message.length > 100 
                      ? `${notification.message.substring(0, 100)}...` 
                      : notification.message
                    }
                  </p>
                </div>
                <button
                  onClick={() => notifications.markAsRead(notification.id)}
                  className={`flex-shrink-0 p-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
