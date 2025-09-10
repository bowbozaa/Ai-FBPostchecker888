/**
 * KpiCard - การ์ดแสดงตัวชี้วัดสรุป
 */
import { ReactNode } from 'react'

/**
 * Props ของ KpiCard
 */
export interface KpiCardProps {
  /** ชื่อหัวข้อ */
  title: string
  /** ค่าตัวเลขหลัก */
  value: string | number
  /** ไอคอนด้านซ้าย */
  icon?: ReactNode
  /** คำอธิบายย่อย */
  description?: string
  /** โทนสีพื้นหลังแบบอ่อน (tailwind classes) */
  toneClass?: string
}

/**
 * การ์ด KPI ขนาดเล็ก ใช้ในแถวสรุป
 */
export function KpiCard({ title, value, icon, description, toneClass }: KpiCardProps) {
  return (
    <div className={`rounded-2xl border shadow-sm p-4 flex items-center gap-4 ${toneClass || ''}`}>
      <div className="shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
        <div className="text-xl font-bold text-gray-900 dark:text-white truncate">{value}</div>
        {description ? (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</div>
        ) : null}
      </div>
    </div>
  )
}

export default KpiCard
