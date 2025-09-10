/** 
 * RiskScoreCard - การ์ดสรุปคะแนนความเสี่ยงรวม พร้อมเกจวงกลม (ปรับให้ไม่ล้นการ์ด)
 */

import { Notification } from '@/hooks/useNotifications'
import { ReactNode } from 'react'

/**
 * Props ของ RiskScoreCard
 */
export interface RiskScoreCardProps {
  /** รายการการแจ้งเตือน */
  notifications: Notification[]
  /** ใช้ธีมมืดหรือไม่ */
  isDark?: boolean
  /** จำนวนวันย้อนหลัง (ค่าเริ่มต้น 7) */
  days?: number
  /** ส่วนท้ายเพิ่มเติม (ถ้าต้องการ) */
  footerExtra?: ReactNode
  /** ขนาดเกจ (px) */
  gaugeSize?: number
}

/**
 * คำนวณคะแนนความเสี่ยงรวมจาก notifications ช่วง N วันย้อนหลัง
 * - ใช้ค่า riskLevel (1-5); ไม่มีค่าให้ถือเป็น 1
 * - คืนค่าเปอร์เซ็นต์ 0-100 สำหรับเกจ + ตัวช่วยระบุระดับ
 */
function calcRisk(notifications: Notification[], days: number) {
  const now = new Date()
  const since = new Date()
  since.setDate(now.getDate() - (days - 1))
  since.setHours(0, 0, 0, 0)

  const recent = notifications.filter((n) => {
    const d = new Date(n.timestamp)
    return d >= since
  })

  const levels = recent.map((n) => (typeof n.riskLevel === 'number' ? n.riskLevel : 1))
  const avg = levels.length > 0 ? levels.reduce((a, b) => a + b, 0) / levels.length : 1
  const score = Math.round((avg / 5) * 100)

  const high = recent.filter((n) => (n.riskLevel ?? 0) >= 4).length
  const medium = recent.filter((n) => n.riskLevel === 3).length
  const low = recent.filter((n) => (n.riskLevel ?? 0) <= 2).length

  let label: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low'
  if (score >= 80) label = 'Critical'
  else if (score >= 60) label = 'High'
  else if (score >= 30) label = 'Medium'

  return {
    score,
    avg,
    label,
    buckets: { high, medium, low },
    total: recent.length,
  }
}

/**
 * แสดงเกจวงกลมด้วย conic-gradient
 * - ใช้สีแตกต่างกันตามระดับความเสี่ยง
 */
function Gauge({
  percent,
  label,
  isDark,
  size = 140,
}: {
  percent: number
  label: 'Low' | 'Medium' | 'High' | 'Critical'
  isDark?: boolean
  size?: number
}) {
  const clamp = Math.max(0, Math.min(100, percent))
  const color =
    label === 'Critical'
      ? (isDark ? '#f87171' : '#dc2626')
      : label === 'High'
      ? (isDark ? '#fb923c' : '#f97316')
      : label === 'Medium'
      ? (isDark ? '#fbbf24' : '#d97706')
      : (isDark ? '#34d399' : '#059669')

  const track = isDark ? '#0f172a' : '#e5e7eb'

  return (
    <div className="relative mx-auto shrink-0" style={{ width: size, height: size }}>
      {/* วงนอก: เกจ */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${color} ${clamp}%, ${track} ${clamp}% 100%)`,
        }}
        aria-hidden
      />
      {/* วงใน: พื้นหลัง */}
      <div
        className="absolute inset-[10px] rounded-full"
        style={{
          background: isDark ? 'rgba(2,6,23,0.8)' : '#ffffff',
          boxShadow: isDark ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'inset 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      />
      {/* ตัวเลข */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{clamp}</div>
        <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Risk Score</div>
      </div>
    </div>
  )
}

/**
 * การ์ดคะแนนความเสี่ยงรวม (ปรับ padding/overflow ให้ไม่ล้นความสูงคงที่)
 */
export default function RiskScoreCard({ notifications, isDark, days = 7, footerExtra, gaugeSize = 140 }: RiskScoreCardProps) {
  const result = calcRisk(notifications, days)

  const tone =
    result.label === 'Critical'
      ? (isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200')
      : result.label === 'High'
      ? (isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200')
      : result.label === 'Medium'
      ? (isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200')
      : (isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200')

  const labelColor =
    result.label === 'Critical'
      ? (isDark ? 'text-red-300' : 'text-red-700')
      : result.label === 'High'
      ? (isDark ? 'text-orange-300' : 'text-orange-700')
      : result.label === 'Medium'
      ? (isDark ? 'text-amber-300' : 'text-amber-700')
      : (isDark ? 'text-emerald-300' : 'text-emerald-700')

  return (
    <section
      className={`h-full rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white'} p-4 shadow-sm flex flex-col overflow-hidden`}
      aria-label="คะแนนความเสี่ยงรวม"
    >
      <header className="mb-1">
        <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>คะแนนความเสี่ยงรวม</h3>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>อ้างอิง {days} วันย้อนหลัง</p>
      </header>

      {/* โซนเนื้อหาที่ต้องอยู่ภายในความสูงคงที่ */}
      <div className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex items-center justify-center">
          <Gauge percent={result.score} label={result.label} isDark={isDark} size={gaugeSize} />
        </div>

        {/* สรุปผลแบบกะทัดรัด เพื่อลดความสูงรวม */}
        <div className={`mt-2 rounded-xl border p-2 ${tone}`}>
          <div className="flex items-center justify-between gap-2">
            <div className={`text-sm font-semibold ${labelColor}`}>{result.label}</div>
            <div className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>avg {result.avg.toFixed(2)} / 5</div>
          </div>
          <div className={`mt-1 flex items-center gap-2 text-[11px] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="rounded border border-transparent/20 px-2 py-0.5 bg-white/5">สูง: {result.buckets.high}</span>
            <span className="rounded border border-transparent/20 px-2 py-0.5 bg-white/5">กลาง: {result.buckets.medium}</span>
            <span className="rounded border border-transparent/20 px-2 py-0.5 bg-white/5">ต่ำ: {result.buckets.low}</span>
            <span className={`ml-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>รวม {result.total || 0}</span>
          </div>
        </div>

        {footerExtra ? <div className="pt-1 text-xs">{footerExtra}</div> : null}
      </div>
    </section>
  )
}
