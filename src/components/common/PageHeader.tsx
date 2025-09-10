/**
 * PageHeader - ส่วนหัวหน้าเพจมาตรฐาน (Icon + Title + Subtitle + Actions)
 */

import { ReactNode } from 'react'

/**
 * Props ของ PageHeader
 */
export interface PageHeaderProps {
  /** ไอคอนด้านซ้าย */
  icon?: ReactNode
  /** ชื่อหน้า */
  title: string
  /** คำอธิบายย่อ */
  subtitle?: string
  /** เนื้อหาด้านขวา เช่น ปุ่ม ตัวเลือกช่วงเวลา Badge */
  actions?: ReactNode
  /** ใช้ธีมมืดหรือไม่ (สำหรับโทนสี) */
  isDark?: boolean
}

/**
 * ส่วนหัวหน้าเพจแบบมาตรฐาน เพื่อความสม่ำเสมอทุกหน้า
 */
export default function PageHeader({ icon, title, subtitle, actions, isDark }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {icon ? (
            <div
              className={`p-3 rounded-2xl ${
                isDark ? 'bg-white/5 border border-white/10' : 'bg-blue-50 border border-blue-100'
              }`}
            >
              {icon}
            </div>
          ) : null}
          <div className="min-w-0">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>{title}</h1>
            {subtitle ? (
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm truncate`}>{subtitle}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
      </div>
    </div>
  )
}
