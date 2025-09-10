/**
 * RiskTrendChart - กราฟเทรนด์จำนวนการแจ้งเตือน/ความเสี่ยงย้อนหลัง
 */
import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Notification } from '@/hooks/useNotifications'

/**
 * อินเทอร์เฟซสำหรับข้อมูลจุดบนกราฟ
 */
interface TrendPoint {
  date: string
  total: number
  high: number
  medium: number
  low: number
}

/**
 * Props ของกราฟ
 */
interface RiskTrendChartProps {
  /** รายการการแจ้งเตือนจากระบบ */
  notifications: Notification[]
  /** โหมดสีปัจจุบัน */
  isDark?: boolean
  /** จำนวนวันย้อนหลัง (ค่าเริ่มต้น 7) */
  days?: number
  /** ความสูงของกราฟ (px) ค่าเริ่มต้น 220 */
  height?: number
}

/**
 * สร้างกราฟเทรนด์จาก notifications
 */
export default function RiskTrendChart({ notifications, isDark, days = 7, height = 220 }: RiskTrendChartProps) {
  /**
   * ประมวลผลข้อมูลเป็นรายวันย้อนหลัง
   */
  const data = useMemo<TrendPoint[]>(() => {
    // เตรียม map ของวันที่
    const map = new Map<string, TrendPoint>()
    const now = new Date()
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      const key = d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short' })
      map.set(key, { date: key, total: 0, high: 0, medium: 0, low: 0 })
    }

    // จัดกลุ่มตามวันและระดับความเสี่ยง (ประมาณจาก riskLevel)
    notifications.forEach((n) => {
      const d = new Date(n.timestamp)
      const key = d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short' })
      if (!map.has(key)) return
      const point = map.get(key)!
      point.total += 1
      const level = n.riskLevel ?? 0
      if (level >= 4) point.high += 1
      else if (level === 3) point.medium += 1
      else point.low += 1
    })

    return Array.from(map.values())
  }, [notifications, days])

  const gridColor = isDark ? '#ffffff12' : '#e5e7eb'
  const axisColor = isDark ? '#cbd5e1' : '#6b7280'
  const totalColor = isDark ? '#60a5fa' : '#2563eb'
  const highColor = isDark ? '#f87171' : '#dc2626'
  const medColor = isDark ? '#fbbf24' : '#d97706'
  const lowColor = isDark ? '#34d399' : '#059669'

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={totalColor} stopOpacity={0.35}/>
            <stop offset="95%" stopColor={totalColor} stopOpacity={0.02}/>
          </linearGradient>
          <linearGradient id="highGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={highColor} stopOpacity={0.35}/>
            <stop offset="95%" stopColor={highColor} stopOpacity={0.02}/>
          </linearGradient>
          <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={medColor} stopOpacity={0.35}/>
            <stop offset="95%" stopColor={medColor} stopOpacity={0.02}/>
          </linearGradient>
          <linearGradient id="lowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lowColor} stopOpacity={0.35}/>
            <stop offset="95%" stopColor={lowColor} stopOpacity={0.02}/>
          </linearGradient>
        </defs>

        <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke={axisColor} tick={{ fontSize: 12 }} />
        <YAxis stroke={axisColor} tick={{ fontSize: 12 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#0b1220' : '#ffffff',
            border: `1px solid ${gridColor}`,
            borderRadius: 12
          }}
        />
        <Area type="monotone" dataKey="total" stroke={totalColor} fill="url(#totalGradient)" strokeWidth={2} name="ทั้งหมด"/>
        <Area type="monotone" dataKey="high" stroke={highColor} fill="url(#highGradient)" strokeWidth={2} name="สูง"/>
        <Area type="monotone" dataKey="medium" stroke={medColor} fill="url(#mediumGradient)" strokeWidth={2} name="กลาง"/>
        <Area type="monotone" dataKey="low" stroke={lowColor} fill="url(#lowGradient)" strokeWidth={2} name="ต่ำ"/>
      </AreaChart>
    </ResponsiveContainer>
  )
}
