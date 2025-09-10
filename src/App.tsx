import { HashRouter, Route, Routes, Navigate } from 'react-router'
import { useState, useEffect } from 'react'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import SettingsPage from './pages/Settings'
import StatsPage from './pages/Stats'
import UsersPage from './pages/Users'
import GrayHatPage from './pages/GrayHat'
import Layout from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useTheme } from './hooks/useTheme'
import { useNotifications } from './hooks/useNotifications'
import N8nBuilder from './pages/N8nBuilder'
import PostCreatorPage from './pages/PostCreator'

/**
 * Interface สำหรับข้อมูล User
 */
interface User {
  id: string
  username: string
  email: string
  role: string
  permissions?: string[]
}

/**
 * App component - Main routing และ authentication พร้อม Theme & Notifications
 */
export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const notifications = useNotifications()

  /**
   * Role-based permissions preset - แก้ไขสิทธิ์ให้ชัดเจน
   */
  const rolePermissions = {
    'Administrator': [
      'dashboard_view', 'analysis_run', 'analysis_view', 'stats_view',
      'keywords_manage', 'api_config', 'export_reports', 'users_manage', 'users_view',
      'users_create', 'users_edit', 'users_delete', 'system_admin'
    ],
    'Admin': [
      'dashboard_view', 'analysis_run', 'analysis_view', 'stats_view',
      'keywords_manage', 'api_config', 'export_reports', 'users_manage', 'users_view',
      'users_create', 'users_edit', 'users_delete'
    ],
    'Manager': [
      'dashboard_view', 'analysis_run', 'analysis_view', 'stats_view',
      'keywords_manage', 'export_reports', 'users_view'
    ],
    'User': [
      'dashboard_view', 'analysis_run', 'analysis_view', 'stats_view'
    ],
    'Viewer': [
      'dashboard_view', 'analysis_view', 'stats_view'
    ]
  }

  /**
   * ตรวจสอบการล็อกอินจาก localStorage
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('fb-checker-user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // กำหนด permissions ตาม role อัตโนมัติ
        const userWithPermissions = {
          ...parsedUser,
          permissions: rolePermissions[parsedUser.role as keyof typeof rolePermissions] || []
        }
        setUser(userWithPermissions)
      } catch (error) {
        localStorage.removeItem('fb-checker-user')
      }
    }
    setIsLoading(false)
  }, [])

  /**
   * ฟังก์ชันล็อกอิน
   */
  const handleLogin = (userData: User) => {
    // กำหนด permissions ตาม role อัตโนมัติ
    const userWithPermissions = {
      ...userData,
      permissions: rolePermissions[userData.role as keyof typeof rolePermissions] || []
    }
    
    setUser(userWithPermissions)
    localStorage.setItem('fb-checker-user', JSON.stringify(userWithPermissions))
  }

  /**
   * ฟังก์ชันล็อกเอาท์
   */
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('fb-checker-user')
  }

  /**
   * ตรวจสอบสิทธิ์การเข้าถึง - เข้มงวดมากขึ้น
   */
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    
    // Administrator มีสิทธิ์เข้าถึงทุกอย่าง
    if (user.role === 'Administrator') return true
    
    // Admin มีสิทธิ์เข้าถึงเกือบทุกอย่าง ยกเว้น system_admin
    if (user.role === 'Admin' && permission !== 'system_admin') return true
    
    // ตรวจสอบจาก permissions array อย่างเข้มงวด
    return user.permissions?.includes(permission) || false
  }

  /**
   * ตรวจสอบว่าเป็น Super Admin หรือไม่
   */
  const isSuperAdmin = (): boolean => {
    return user?.role === 'Administrator' || user?.role === 'Admin'
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      } flex items-center justify-center`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-2xl mb-4`}>
            <div className={`w-8 h-8 border-4 ${theme === 'dark' ? 'border-blue-400/30 border-t-blue-400' : 'border-blue-600/30 border-t-blue-600'} rounded-full animate-spin`}></div>
          </div>
          <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-xl font-medium`}>
            กำลังโหลด...
          </div>
          <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm mt-2`}>
            กำลังตรวจสอบการเข้าสู่ระบบ
          </div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <HashRouter>
        <Routes>
          {!user ? (
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          ) : (
            <Route path="/" element={
              <Layout 
                user={user} 
                onLogout={handleLogout} 
                notifications={notifications}
                hasPermission={hasPermission}
              />
            }>
              <Route index element={<HomePage notifications={notifications} />} />
              
              <Route path="post-creator" element={
                hasPermission('analysis_run') ? 
                <PostCreatorPage /> : 
                <Navigate to="/unauthorized" />
              } />

              <Route path="stats" element={
                hasPermission('stats_view') ? 
                <StatsPage /> : 
                <Navigate to="/unauthorized" />
              } />
              
              <Route path="settings" element={
                hasPermission('keywords_manage') || hasPermission('api_config') ? 
                <SettingsPage /> : 
                <Navigate to="/unauthorized" />
              } />

              <Route path="n8n-builder" element={
                hasPermission('api_config') ? 
                <N8nBuilder /> : 
                <Navigate to="/unauthorized" />
              } />
              
              <Route path="users" element={
                hasPermission('users_manage') || hasPermission('users_view') ? 
                <UsersPage 
                  hasPermission={hasPermission}
                  currentUser={user}
                  isSuperAdmin={isSuperAdmin()}
                /> : 
                <Navigate to="/unauthorized" />
              } />
              
              <Route path="unauthorized" element={
                <div className="container mx-auto px-6 py-8 text-center">
                  <div className={`${theme === 'dark' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-red-100 text-red-600 border-red-300'} p-8 rounded-2xl border max-w-md mx-auto`}>
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
                    <p className="mb-4">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
                      <p>บทบาทปัจจุบัน: <span className="font-medium">{user.role}</span></p>
                      <p>สิทธิ์ที่มี: {user.permissions?.length || 0} รายการ</p>
                    </div>
                    <button
                      onClick={() => window.history.back()}
                      className={`px-6 py-3 ${
                        theme === 'dark' 
                          ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30' 
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-600 border-blue-300'
                      } border rounded-xl transition-all duration-300`}
                    >
                      ← กลับหน้าเดิม
                    </button>
                  </div>
                </div>
              } />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
        </HashRouter>
      </div>
    </ErrorBoundary>
  )
}
