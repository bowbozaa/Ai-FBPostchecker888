import { useState, useEffect } from 'react'
import { Users as UsersIcon, Plus, Edit, Trash2, Shield, Eye, EyeOff, Save, X, Lock, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'

/**
 * Interface สำหรับ User
 */
interface User {
  id: string
  username: string
  email: string
  password: string
  role: 'Administrator' | 'Admin' | 'Manager' | 'User' | 'Viewer'
  permissions: Permission[]
  active: boolean
  createdAt: Date
  lastLogin?: Date
}

/**
 * Interface สำหรับ Permission
 */
interface Permission {
  id: string
  name: string
  description: string
  category: 'dashboard' | 'analysis' | 'settings' | 'reports' | 'users' | 'system'
}

/**
 * Interface สำหรับ UsersPage Props
 */
interface UsersPageProps {
  hasPermission: (permission: string) => boolean
  currentUser: User
  isSuperAdmin: boolean
}

/**
 * Users Management Page - หน้าจัดการผู้ใช้และสิทธิ์ พร้อม Role-based Security
 */
export default function UsersPage({ hasPermission, currentUser, isSuperAdmin }: UsersPageProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@fbchecker.com',
      password: 'admin123',
      role: 'Admin',
      permissions: [],
      active: true,
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date(),
    },
    {
      id: '2',
      username: 'manager',
      email: 'manager@fbchecker.com',
      password: 'manager123',
      role: 'Manager',
      permissions: [],
      active: true,
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date(),
    },
    {
      id: '3',
      username: 'user',
      email: 'user@fbchecker.com',
      password: 'user123',
      role: 'User',
      permissions: [],
      active: true,
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '4',
      username: 'viewer',
      email: 'viewer@fbchecker.com',
      password: 'viewer123',
      role: 'Viewer',
      permissions: [],
      active: false,
      createdAt: new Date('2024-02-15'),
    },
  ])

  const [permissions] = useState<Permission[]>([
    { id: 'dashboard_view', name: 'ดูแดชบอร์ด', description: 'เข้าถึงหน้าแดชบอร์ดหลัก', category: 'dashboard' },
    { id: 'analysis_run', name: 'วิเคราะห์โพสต์', description: 'ทดสอบและวิเคราะห์โพสต์', category: 'analysis' },
    { id: 'analysis_view', name: 'ดูผลการวิเคราะห์', description: 'ดูประวัติการวิเคราะห์', category: 'analysis' },
    { id: 'stats_view', name: 'ดูสถิติ', description: 'เข้าถึงหน้าสถิติและกราฟ', category: 'reports' },
    { id: 'keywords_manage', name: 'จัดการ Keywords', description: 'เพิ่ม/ลบ/แก้ไข Keywords ต้องห้าม', category: 'settings' },
    { id: 'api_config', name: 'ตั้งค่า API', description: 'กำหนดค่า n8n, LINE, Gmail', category: 'settings' },
    { id: 'export_reports', name: 'Export รายงาน', description: 'ส่งออกรายงาน PDF/Excel', category: 'reports' },
    { id: 'users_manage', name: 'จัดการผู้ใช้', description: 'เพิ่ม/ลบ/แก้ไขผู้ใช้', category: 'users' },
    { id: 'users_view', name: 'ดูรายชื่อผู้ใช้', description: 'ดูรายการผู้ใช้ในระบบ', category: 'users' },
    { id: 'users_create', name: 'สร้างผู้ใช้', description: 'เพิ่มผู้ใช้ใหม่', category: 'users' },
    { id: 'users_edit', name: 'แก้ไขผู้ใช้', description: 'แก้ไขข้อมูลผู้ใช้', category: 'users' },
    { id: 'users_delete', name: 'ลบผู้ใช้', description: 'ลบผู้ใช้ออกจากระบบ', category: 'users' },
    { id: 'system_admin', name: 'ผู้ดูแลระบบ', description: 'สิทธิ์สูงสุดในระบบ', category: 'system' },
  ])

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})
  const [isCreating, setIsCreating] = useState(false)

  /**
   * Role Presets - สิทธิ์ตามบทบาท (อัพเดทให้ตรงกับ App.tsx)
   */
  const rolePresets = {
    Administrator: [
      'dashboard_view',
      'analysis_run',
      'analysis_view',
      'stats_view',
      'keywords_manage',
      'api_config',
      'export_reports',
      'users_manage',
      'users_view',
      'users_create',
      'users_edit',
      'users_delete',
      'system_admin',
    ],
    Admin: [
      'dashboard_view',
      'analysis_run',
      'analysis_view',
      'stats_view',
      'keywords_manage',
      'api_config',
      'export_reports',
      'users_manage',
      'users_view',
      'users_create',
      'users_edit',
      'users_delete',
    ],
    Manager: ['dashboard_view', 'analysis_run', 'analysis_view', 'stats_view', 'keywords_manage', 'export_reports', 'users_view'],
    User: ['dashboard_view', 'analysis_run', 'analysis_view', 'stats_view'],
    Viewer: ['dashboard_view', 'analysis_view', 'stats_view'],
  }

  /**
   * ตรวจสอบว่าสามารถแก้ไขผู้ใช้นี้ได้หรือไม่
   */
  const canEditUser = (targetUser: User): boolean => {
    if (!hasPermission('users_edit')) return false
    if (targetUser.id === currentUser.id) return false
    if (currentUser.role === 'Administrator') return true
    if (currentUser.role === 'Admin' && targetUser.role === 'Administrator') return false
    if (currentUser.role === 'Admin' && targetUser.role !== 'Administrator') return true
    return false
  }

  /**
   * ตรวจสอบว่าสามารถลบผู้ใช้นี้ได้หรือไม่
   */
  const canDeleteUser = (targetUser: User): boolean => {
    if (!hasPermission('users_delete')) return false
    if (targetUser.id === currentUser.id) return false
    if (currentUser.role === 'Administrator') return true
    if (currentUser.role === 'Admin' && targetUser.role === 'Administrator') return false
    if (currentUser.role === 'Admin' && targetUser.role !== 'Administrator') return true
    return false
  }

  /**
   * ตรวจสอบว่าสามารถสร้าง Role นี้ได้หรือไม่
   */
  const canCreateRole = (role: string): boolean => {
    if (currentUser.role === 'Administrator') return true
    if (currentUser.role === 'Admin' && role === 'Administrator') return false
    if (currentUser.role === 'Admin' && role !== 'Administrator') return true
    return false
  }

  /**
   * เริ่มแก้ไขผู้ใช้
   */
  const startEdit = (user: User) => {
    if (!canEditUser(user)) {
      alert('⚠️ คุณไม่มีสิทธิ์แก้ไขผู้ใช้นี้')
      return
    }

    setSelectedUser(user)
    setFormData({
      ...user,
      permissions: user.permissions.length > 0 ? user.permissions.map((p) => p.id) : rolePresets[user.role],
    })
    setIsEditing(true)
    setIsCreating(false)
  }

  /**
   * เริ่มสร้างผู้ใช้ใหม่
   */
  const startCreate = () => {
    if (!hasPermission('users_create')) {
      alert('⚠️ คุณไม่มีสิทธิ์สร้างผู้ใช้ใหม่')
      return
    }

    setSelectedUser(null)
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'User',
      permissions: rolePresets.User,
      active: true,
    })
    setIsEditing(true)
    setIsCreating(true)
  }

  /**
   * บันทึกข้อมูลผู้ใช้
   */
  const saveUser = () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    if (isCreating && !canCreateRole(formData.role as string)) {
      alert(`⚠️ คุณไม่มีสิทธิ์สร้างผู้ใช้ที่มี Role: ${formData.role}`)
      return
    }

    const userPermissions = permissions.filter((p) => (formData.permissions as string[])?.includes(p.id))

    if (isCreating) {
      const newUser: User = {
        id: Date.now().toString(),
        username: formData.username!,
        email: formData.email!,
        password: formData.password!,
        role: (formData.role as any) || 'User',
        permissions: userPermissions,
        active: formData.active ?? true,
        createdAt: new Date(),
      }
      setUsers([...users, newUser])
    } else if (selectedUser) {
      if (!canEditUser(selectedUser)) {
        alert('⚠️ คุณไม่มีสิทธิ์แก้ไขผู้ใช้นี้')
        return
      }

      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                username: formData.username!,
                email: formData.email!,
                password: formData.password!,
                role: (formData.role as any) || u.role,
                permissions: userPermissions,
                active: formData.active ?? u.active,
              }
            : u
        )
      )
    }

    localStorage.setItem('fb-checker-users', JSON.stringify(users))
    setIsEditing(false)
    setSelectedUser(null)
  }

  /**
   * ลบผู้ใช้
   */
  const deleteUser = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId)
    if (!targetUser) return

    if (!canDeleteUser(targetUser)) {
      alert('⚠️ คุณไม่มีสิทธิ์ลบผู้ใช้นี้')
      return
    }

    if (confirm(`ต้องการลบผู้ใช้ "${targetUser.username}" หรือไม่?`)) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

  /**
   * เปลี่ยนสถานะ active
   */
  const toggleActive = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId)
    if (!targetUser) return

    if (!canEditUser(targetUser)) {
      alert('⚠️ คุณไม่มีสิทธิ์เปลี่ยนสถานะผู้ใช้นี้')
      return
    }

    setUsers(users.map((u) => (u.id === userId ? { ...u, active: !u.active } : u)))
  }

  /**
   * อัพเดทสิทธิ์ตาม Role
   */
  const updatePermissionsByRole = (role: string) => {
    const newPermissions = rolePresets[role as keyof typeof rolePresets] || []
    setFormData({ ...formData, role: role as any, permissions: newPermissions })
  }

  /**
   * สีของ Role
   */
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'Admin':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'Manager':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'User':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Viewer':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  /**
   * จัดกลุ่ม Permission ตาม Category
   */
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  const categoryNames = {
    dashboard: '📊 แดชบอร์ด',
    analysis: '🧪 การวิเคราะห์',
    settings: '⚙️ การตั้งค่า',
    reports: '📈 รายงาน',
    users: '👥 ผู้ใช้',
    system: '🔧 ระบบ',
  }

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('fb-checker-users')
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers))
      } catch (error) {
        console.warn('ไม่สามารถโหลดข้อมูลผู้ใช้จาก localStorage')
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-6 py-8">
      <PageHeader
        icon={<UsersIcon className="text-purple-400" />}
        title="จัดการผู้ใช้"
        subtitle="จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง"
        actions={
          hasPermission('users_create') ? (
            <button
              onClick={startCreate}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center space-x-2"
              title="เพิ่มผู้ใช้ใหม่"
            >
              <Plus className="w-5 h-5" />
              <span>เพิ่มผู้ใช้ใหม่</span>
            </button>
          ) : null
        }
      />

      {/* แสดงสิทธิ์ปัจจุบัน */}
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-4 h-4 text-yellow-400" />
        <span className="text-sm text-yellow-400">
          สิทธิ์ของคุณ: {currentUser.role} |
          {hasPermission('users_create') && ' สร้าง'}
          {hasPermission('users_edit') && ' แก้ไข'}
          {hasPermission('users_delete') && ' ลบ'}
          {hasPermission('users_view') && ' ดู'}
        </span>
      </div>

      {/* แจ้งเตือนหากไม่มีสิทธิ์จัดการ */}
      {!hasPermission('users_manage') && hasPermission('users_view') && (
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-yellow-300 font-medium">โหมดดูเท่านั้น</p>
              <p className="text-yellow-400 text-sm">คุณสามารถดูรายการผู้ใช้ได้ แต่ไม่สามารถแก้ไขหรือลบได้</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-4 px-4 text-gray-300 font-medium">ผู้ใช้</th>
                <th className="text-left py-4 px-4 text-gray-300 font-medium">บทบาท</th>
                <th className="text-left py-4 px-4 text-gray-300 font-medium">สถานะ</th>
                <th className="text-left py-4 px-4 text-gray-300 font-medium">เข้าสู่ระบบล่าสุด</th>
                <th className="text-left py-4 px-4 text-gray-300 font-medium">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-white font-medium flex items-center space-x-2">
                          <span>{user.username}</span>
                          {user.id === currentUser.id && <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">คุณ</span>}
                        </div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-lg text-sm border ${getRoleColor(user.role)}`}>{user.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    {canEditUser(user) ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={user.active} onChange={() => toggleActive(user.id)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    ) : (
                      <span className={`px-3 py-1 rounded-lg text-sm ${user.active ? 'text-green-400' : 'text-gray-400'}`}>{user.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{user.lastLogin ? user.lastLogin.toLocaleString('th-TH') : 'ยังไม่เคยเข้าสู่ระบบ'}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {canEditUser(user) ? (
                        <button
                          onClick={() => startEdit(user)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300"
                          title="แก้ไข"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      ) : (
                        <button disabled className="p-2 bg-gray-500/10 text-gray-600 rounded-lg cursor-not-allowed" title="ไม่มีสิทธิ์แก้ไข">
                          <Lock className="w-4 h-4" />
                        </button>
                      )}

                      {canDeleteUser(user) ? (
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button disabled className="p-2 bg-gray-500/10 text-gray-600 rounded-lg cursor-not-allowed" title="ไม่มีสิทธิ์ลบ">
                          <Lock className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create User Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-8 border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{isCreating ? 'เพิ่มผู้ใช้ใหม่' : 'แก้ไขผู้ใช้'}</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">ข้อมูลพื้นฐาน</h3>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">ชื่อผู้ใช้</label>
                  <input
                    type="text"
                    value={formData.username || ''}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                    placeholder="กรอกชื่อผู้ใช้"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">อีเมล</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                    placeholder="กรอกอีเมล"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">รหัสผ่าน</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password || ''}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      placeholder="กรอกรหัสผ่าน"
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

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">บทบาท</label>
                  <select
                    value={formData.role || 'User'}
                    onChange={(e) => updatePermissionsByRole(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  >
                    {canCreateRole('Administrator') && (
                      <option value="Administrator" className="bg-gray-800">
                        Administrator (ผู้ดูแลระบบสูงสุด)
                      </option>
                    )}
                    {canCreateRole('Admin') && (
                      <option value="Admin" className="bg-gray-800">
                        Admin (ผู้ดูแลระบบ)
                      </option>
                    )}
                    {canCreateRole('Manager') && (
                      <option value="Manager" className="bg-gray-800">
                        Manager (ผู้จัดการ)
                      </option>
                    )}
                    {canCreateRole('User') && (
                      <option value="User" className="bg-gray-800">
                        User (ผู้ใช้ทั่วไป)
                      </option>
                    )}
                    {canCreateRole('Viewer') && (
                      <option value="Viewer" className="bg-gray-800">
                        Viewer (ผู้ดูเท่านั้น)
                      </option>
                    )}
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">สิทธิ์การเข้าถึง</h3>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                    <div key={category} className="bg-black/20 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-3">{(categoryNames as any)[category]}</h4>
                      <div className="space-y-2">
                        {categoryPermissions.map((permission) => (
                          <label key={permission.id} className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(formData.permissions as string[])?.includes(permission.id) || false}
                              onChange={(e) => {
                                const currentPermissions = (formData.permissions as string[]) || []
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    permissions: [...currentPermissions, permission.id],
                                  })
                                } else {
                                  setFormData({
                                    ...formData,
                                    permissions: currentPermissions.filter((p) => p !== permission.id),
                                  })
                                }
                              }}
                              className="w-4 h-4 text-blue-600 bg-black/30 border-white/20 rounded focus:ring-blue-500 mt-1"
                            />
                            <div>
                              <div className="text-white text-sm font-medium">{permission.name}</div>
                              <div className="text-gray-400 text-xs">{permission.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 border border-gray-500/30 rounded-xl transition-all duration-300"
              >
                ยกเลิก
              </button>
              <button
                onClick={saveUser}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>บันทึก</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
