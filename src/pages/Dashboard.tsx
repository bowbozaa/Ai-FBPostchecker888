import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { AlertTriangle, Shield, TrendingUp, Clock } from 'lucide-react'
import { formatDate } from '../lib/utils'
import { api, Stats, Post } from '../lib/api'

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
    today: 0,
  })
  const [recentAlerts, setRecentAlerts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load stats and recent alerts
      const [statsData, alertsData] = await Promise.all([
        api.getStats(),
        api.getRecentAlerts(5)
      ])

      setStats(statsData)
      setRecentAlerts(alertsData.alerts)
    } catch (err) {
      setError('Failed to load data. Make sure the API server is running.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Posts Checked',
      value: stats.total,
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'High Risk',
      value: stats.high,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Medium Risk',
      value: stats.medium,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Checked Today',
      value: stats.today,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ]

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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Overview of Facebook post monitoring and risk analysis
        </p>
      </div>

      {/* Stats Cards */}
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
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
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

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            Latest posts flagged by the AI system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No alerts yet. The system is monitoring your posts.
              </p>
            ) : (
              recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          alert.risk === 'high'
                            ? 'high'
                            : alert.risk === 'medium'
                            ? 'medium'
                            : 'low'
                        }
                      >
                        {alert.risk.toUpperCase()}
                      </Badge>
                      {alert.keywords.length > 0 && (
                        <span className="text-xs text-gray-500">
                          Keywords: {alert.keywords.join(', ')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 mb-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(alert.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
