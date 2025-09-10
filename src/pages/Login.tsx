import { useState } from 'react'
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react'

/**
 * Interface สำหรับข้อมูล User
 */
interface User {
  id: string
  username: string
  email: string
  role: string
}

/**
 * Interface สำหรับ Login props
 */
interface LoginProps {
  onLogin: (user: User) => void
}

/**
 * Login Page - หน้าเข้าสู่ระบบ
 */
export default function LoginPage({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  /**
   * ข้อมูลผู้ใช้ทดสอบ
   */
  const testUsers = [
    { id: '1', username: 'admin', password: 'admin123', email: 'admin@fbchecker.com', role: 'Administrator' },
    { id: '2', username: 'user', password: 'user123', email: 'user@fbchecker.com', role: 'User' },
    { id: '3', username: 'manager', password: 'manager123', email: 'manager@fbchecker.com', role: 'Manager' },
    { id: '4', username: 'viewer', password: 'viewer123', email: 'viewer@fbchecker.com', role: 'Viewer' }
  ]

  /**
   * ฟังก์ชันเข้าสู่ระบบ
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // จำลอง API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // ตรวจสอบข้อมูลผู้ใช้
    const user = testUsers.find(u => u.username === username && u.password === password)
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      onLogin(userWithoutPassword)
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
    }

    setIsLoading(false)
  }

  /**
   * Quick Login Function
   */
  const quickLogin = (userType: string) => {
    const user = testUsers.find(u => u.username === userType)
    if (user) {
      setUsername(user.username)
      setPassword(user.password)
      // Auto submit after setting values
      setTimeout(() => {
        const { password: _, ...userWithoutPassword } = user
        onLogin(userWithoutPassword)
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-2xl mb-4">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FB Post Checker</h1>
          <p className="text-blue-300">🤖 AI-Powered Risk Analysis System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/30 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-black/30 border-white/20 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-gray-300 text-sm">
                จดจำการเข้าสู่ระบบ
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>กำลังเข้าสู่ระบบ...</span>
                </>
              ) : (
                <span>🚀 เข้าสู่ระบบ</span>
              )}
            </button>
          </form>

          {/* Quick Login Buttons */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <h3 className="text-gray-300 text-sm font-medium mb-4 text-center">🎯 เข้าสู่ระบบด่วน:</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => quickLogin('admin')}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 py-2 px-4 rounded-lg text-sm transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>👑</span>
                <span>Admin</span>
              </button>
              <button
                onClick={() => quickLogin('manager')}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 py-2 px-4 rounded-lg text-sm transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>💼</span>
                <span>Manager</span>
              </button>
              <button
                onClick={() => quickLogin('user')}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 py-2 px-4 rounded-lg text-sm transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>👤</span>
                <span>User</span>
              </button>
              <button
                onClick={() => quickLogin('viewer')}
                className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 border border-gray-500/30 py-2 px-4 rounded-lg text-sm transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>👁️</span>
                <span>Viewer</span>
              </button>
            </div>
          </div>

          {/* Test Accounts Info */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="text-xs text-gray-400 space-y-1">
              <div><span className="text-red-300">👑 Admin:</span> เข้าถึงได้ทุกอย่าง</div>
              <div><span className="text-blue-300">💼 Manager:</span> จัดการข้อมูล + ตั้งค่า</div>
              <div><span className="text-green-300">👤 User:</span> ทดสอบ + ดูสถิติ</div>
              <div><span className="text-gray-300">👁️ Viewer:</span> ดูข้อมูลเท่านั้น</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>© 2024 FB Post Checker • JARVIS GhostSentinel™ v8.8</p>
          <p className="text-xs mt-1">🤖 AI-Powered Risk Analysis System</p>
        </div>
      </div>
    </div>
  )
}
