import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Users, Activity, Database, Mail, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface User {
  id: number
  username: string
  email: string
  created_at: string
  is_admin: boolean
}

interface SystemStats {
  users: number
  posts: number
  database_size: string
  uptime: string
}

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [systemStats, setSystemStats] = useState<SystemStats>({
    users: 0,
    posts: 0,
    database_size: '0 MB',
    uptime: '0h 0m'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Mock data - replace with actual API calls
      setTimeout(() => {
        setUsers([
          {
            id: 1,
            username: 'admin',
            email: 'admin@fbpostshield.com',
            created_at: '2024-01-01T00:00:00',
            is_admin: true
          },
          {
            id: 2,
            username: 'user1',
            email: 'user1@example.com',
            created_at: '2024-01-15T10:30:00',
            is_admin: false
          }
        ])

        setSystemStats({
          users: 2,
          posts: 156,
          database_size: '2.5 MB',
          uptime: '24h 15m'
        })

        setLoading(false)
      }, 1000)
    } catch (err) {
      setError('Failed to load admin data')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <AlertTriangle className="w-5 h-5 inline mr-2" />
          {error}
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Users',
      value: systemStats.users,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Posts',
      value: systemStats.posts,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Database Size',
      value: systemStats.database_size,
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'System Uptime',
      value: systemStats.uptime,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-500 mt-2">
          System management and user administration
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* User Management */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4 font-medium">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      {user.is_admin ? (
                        <Badge variant="high">Admin</Badge>
                      ) : (
                        <Badge variant="low">User</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-600 hover:text-blue-700 text-sm mr-3"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700 text-sm"
                        disabled={user.is_admin}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* System Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <Mail className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Send Test Email</h3>
            <p className="text-sm text-gray-600 mb-4">
              Send a test email to verify email configuration
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Send Test
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Database className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold mb-2">Database Backup</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a backup of the database
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Backup Now
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Activity className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold mb-2">System Health</h3>
            <p className="text-sm text-gray-600 mb-4">
              Check system health and diagnostics
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Run Check
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
