/**
 * Stats Page - สถิติการใช้งานระบบ
 * แสดงข้อมูลสถิติการวิเคราะห์โพสต์และประสิทธิภาพระบบ พร้อมหัวแบบมาตรฐาน
 */

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Users, Clock, Shield, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTheme } from '../hooks/useTheme'
import PageHeader from '@/components/common/PageHeader'

export default function StatsPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [timeRange, setTimeRange] = useState('7days')
  const [loading, setLoading] = useState(true)

  /**
   * จำลองข้อมูลสถิติ
   */
  const [stats, setStats] = useState({
    totalPosts: 1247,
    riskPosts: 89,
    safeRate: 92.9,
    avgProcessTime: 1.2,
    todayAnalysis: 156,
    weeklyGrowth: 23.5,
  })

  /**
   * โหลดข้อมูลเมื่อเปลี่ยน timeRange
   */
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setStats((prev) => ({
        ...prev,
        totalPosts: Math.floor(Math.random() * 2000) + 1000,
        riskPosts: Math.floor(Math.random() * 150) + 50,
        safeRate: Math.round((Math.random() * 10 + 85) * 10) / 10,
        avgProcessTime: Math.round((Math.random() * 2 + 0.5) * 10) / 10,
      }))
      setLoading(false)
    }, 800)
  }, [timeRange])

  /** คลาส CSS สำหรับ Theme */
  const bgClass = isDark
    ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
    : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'

  const cardClass = isDark ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white/80 backdrop-blur-sm border-gray-200'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600'

  /** Action: Time range selector (หัวข้อด้านขวา) */
  const rangeActions = (
    <div className="flex items-center space-x-2">
      {[
        { value: '24h', label: '24 ชั่วโมง' },
        { value: '7days', label: '7 วัน' },
        { value: '30days', label: '30 วัน' },
        { value: '3months', label: '3 เดือน' },
      ].map((range) => {
        const active = timeRange === range.value
        return (
          <Button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            variant={active ? 'default' : 'outline'}
            size="sm"
            className={
              active
                ? isDark
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : isDark
                ? 'bg-transparent text-gray-300 border-white/20 hover:bg-white/10'
                : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100'
            }
          >
            {range.label}
          </Button>
        )
      })}
    </div>
  )

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div className="container mx-auto px-6 py-8">
        <PageHeader
          icon={<BarChart3 className={isDark ? 'text-blue-400' : 'text-blue-600'} />}
          title="สถิติระบบ"
          subtitle="ข้อมูลการวิเคราะห์และประสิทธิภาพของระบบ AI"
          actions={rangeActions}
          isDark={isDark}
        />

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={`${cardClass} border shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textSecondaryClass} text-sm font-medium`}>โพสต์ทั้งหมด</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`${textClass} text-2xl font-bold`}>{loading ? '...' : stats.totalPosts.toLocaleString()}</p>
                    <span className="text-green-500 text-sm font-medium">+{stats.weeklyGrowth}%</span>
                  </div>
                </div>
                <div className={`p-3 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-xl`}>
                  <BarChart3 className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardClass} border shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textSecondaryClass} text-sm font-medium`}>โพสต์เสี่ยง</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`${textClass} text-2xl font-bold`}>{loading ? '...' : stats.riskPosts.toLocaleString()}</p>
                    <span className="text-red-500 text-sm font-medium">
                      {Math.round((stats.riskPosts / Math.max(stats.totalPosts, 1)) * 100)}%
                    </span>
                  </div>
                </div>
                <div className={`p-3 ${isDark ? 'bg-red-500/20' : 'bg-red-100'} rounded-xl`}>
                  <AlertTriangle className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardClass} border shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textSecondaryClass} text-sm font-medium`}>อัตราปลอดภัย</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`${textClass} text-2xl font-bold`}>{loading ? '...' : `${stats.safeRate}%`}</p>
                    <span className="text-green-500 text-sm font-medium">+2.1%</span>
                  </div>
                </div>
                <div className={`p-3 ${isDark ? 'bg-green-500/20' : 'bg-green-100'} rounded-xl`}>
                  <Shield className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${cardClass} border shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textSecondaryClass} text-sm font-medium`}>เวลาประมวลผล</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`${textClass} text-2xl font-bold`}>{loading ? '...' : `${stats.avgProcessTime}s`}</p>
                    <span className="text-blue-500 text-sm font-medium">-0.3s</span>
                  </div>
                </div>
                <div className={`p-3 ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'} rounded-xl`}>
                  <Clock className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Analysis Chart */}
          <Card className={`${cardClass} border shadow-lg`}>
            <CardHeader>
              <CardTitle className={`${textClass} flex items-center gap-2`}>
                <TrendingUp className="w-5 h-5 text-orange-500" />
                การวิเคราะห์ความเสี่ยง
              </CardTitle>
              <CardDescription className={textSecondaryClass}>แสดงระดับความเสี่ยงที่พบในช่วง {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { level: 'ระดับ 1 - ปลอดภัย', count: 890, percentage: 71.4, color: 'bg-green-500' },
                  { level: 'ระดับ 2 - ปลอดภัย', count: 268, percentage: 21.5, color: 'bg-blue-500' },
                  { level: 'ระดับ 3 - ระวัง', count: 56, percentage: 4.5, color: 'bg-yellow-500' },
                  { level: 'ระดับ 4 - เสี่ยง', count: 23, percentage: 1.8, color: 'bg-orange-500' },
                  { level: 'ระดับ 5 - สูง', count: 10, percentage: 0.8, color: 'bg-red-500' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className={`${textClass} text-sm font-medium`}>{item.level}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-24 h-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                        <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${item.percentage}%` }}></div>
                      </div>
                      <span className={`${textSecondaryClass} text-sm w-12 text-right`}>{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card className={`${cardClass} border shadow-lg`}>
            <CardHeader>
              <CardTitle className={`${textClass} flex items-center gap-2`}>
                <Target className="w-5 h-5 text-blue-500" />
                ประสิทธิภาพระบบ
              </CardTitle>
              <CardDescription className={textSecondaryClass}>ข้อมูลการทำงานของระบบในช่วง {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* API Response Time */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${textClass} text-sm font-medium`}>เวลาตอบสนอง API</span>
                    <span className={`${textSecondaryClass} text-sm`}>{stats.avgProcessTime}s</span>
                  </div>
                  <div className={`w-full h-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${Math.min(((2 - stats.avgProcessTime) / 2) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Accuracy Rate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${textClass} text-sm font-medium`}>ความแม่นยำ AI</span>
                    <span className={`${textSecondaryClass} text-sm`}>96.8%</span>
                  </div>
                  <div className={`w-full h-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-green-500 transition-all duration-500 w-[96.8%]"></div>
                  </div>
                </div>

                {/* System Uptime */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${textClass} text-sm font-medium`}>ระบบออนไลน์</span>
                    <span className={`${textSecondaryClass} text-sm`}>99.9%</span>
                  </div>
                  <div className={`w-full h-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-green-500 transition-all duration-500 w-[99.9%]"></div>
                  </div>
                </div>

                {/* Today's Analysis */}
                <div className={`${isDark ? 'bg-white/5' : 'bg-gray-50'} p-4 rounded-xl`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${textClass} font-semibold`}>วันนี้วิเคราะห์แล้ว</p>
                      <p className={`${textSecondaryClass} text-sm`}>อัปเดตล่าสุด 5 นาทีที่แล้ว</p>
                    </div>
                    <div className="text-right">
                      <p className={`${textClass} text-2xl font-bold`}>{stats.todayAnalysis}</p>
                      <p className={`${textSecondaryClass} text-sm`}>โพสต์</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Summary */}
        <Card className={`${cardClass} border shadow-lg mt-8`}>
          <CardHeader>
            <CardTitle className={`${textClass} flex items-center gap-2`}>
              <Users className="w-5 h-5 text-green-500" />
              กิจกรรมล่าสุด
            </CardTitle>
            <CardDescription className={textSecondaryClass}>สรุปกิจกรรมที่สำคัญในระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '10:45', action: 'ตรวจพบโพสต์เสี่ยงระดับ 4', details: 'เนื้อหาเกี่ยวกับการพนัน', status: 'warning', icon: AlertTriangle },
                { time: '10:30', action: 'วิเคราะห์โพสต์สำเร็จ 25 รายการ', details: 'ทั้งหมดปลอดภัย', status: 'success', icon: CheckCircle },
                { time: '10:15', action: 'อัปเดตคำต้องห้าม', details: 'เพิ่มคำใหม่ 5 คำ', status: 'info', icon: Shield },
                { time: '09:58', action: 'ส่งรายงานประจำวัน', details: 'ส่งให้ผู้ดูแลระบบเรียบร้อย', status: 'success', icon: BarChart3 },
              ].map((activity, index) => {
                const Icon = activity.icon
                const statusColors = {
                  warning: isDark ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100',
                  success: isDark ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100',
                  info: isDark ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-100',
                }

                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${statusColors[activity.status as keyof typeof statusColors]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`${textClass} font-medium text-sm`}>{activity.action}</p>
                        <span className={`${textSecondaryClass} text-xs`}>{activity.time}</span>
                      </div>
                      <p className={`${textSecondaryClass} text-xs mt-1`}>{activity.details}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
