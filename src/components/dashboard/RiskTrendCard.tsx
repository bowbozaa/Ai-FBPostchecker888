/** 
 * RiskTrendCard - การ์ดกราฟเทรนด์ความเสี่ยงย้อนหลัง (เพิ่ม overflow-hidden ป้องกันล้น)
 */

import { Notification } from '@/hooks/useNotifications'
import RiskTrendChart from '@/components/charts/RiskTrendChart'

/**
 * Props ของ RiskTrendCard
 */
interface RiskTrendCardProps {
  /** รายการการแจ้งเตือน */
  notifications: Notification[]
  /** โหมดสี */
  isDark?: boolean
  /** จำนวนวันย้อนหลัง */
  days?: number
  /** ความสูงของพื้นที่กราฟ (px) */
  chartHeight?: number
}

/**
 * การ์ดครอบกราฟเทรนด์
 */
export default function RiskTrendCard({ notifications, isDark, days = 7, chartHeight = 240 }: RiskTrendCardProps) {
  return (
    <section
      className={`h-full rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white'} p-5 shadow-sm flex flex-col overflow-hidden`}
      aria-label="เทรนด์ความเสี่ยงย้อนหลัง"
    >
      <header className="mb-2">
        <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          เทรนด์ความเสี่ยงย้อนหลัง {days} วัน
        </h3>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          สรุปจำนวนเหตุการณ์ตามระดับความเสี่ยงรายวัน
        </p>
      </header>

      <div className="w-full flex-1 min-h-0">
        <RiskTrendChart notifications={notifications} isDark={isDark} days={days} height={chartHeight} />
      </div>
    </section>
  )
}
