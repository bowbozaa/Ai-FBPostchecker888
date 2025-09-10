/** 
 * RiskMeter - แถบแสดงคะแนนความเสี่ยงแบบย่อ (สีตามระดับ + คำอธิบาย)
 */

import React from 'react'

/** โครงผลลัพธ์ความเสี่ยง */
export interface RiskResult {
  /** ระดับ 1-5 */
  level: number
  /** หมวดหมู่ */
  category: string
  /** คำที่ตรวจพบ */
  keywordsDetected: string[]
}

/** Props ของ RiskMeter */
export interface RiskMeterProps {
  /** ข้อมูลความเสี่ยงที่คำนวนแล้ว */
  risk: RiskResult
  /** โหมด dark */
  isDark?: boolean
}

/** สีตามระดับ */
function tone(level: number, isDark?: boolean) {
  if (level >= 5) return isDark ? 'bg-red-500/10 border-red-500/20 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
  if (level === 4) return isDark ? 'bg-orange-500/10 border-orange-500/20 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-700'
  if (level === 3) return isDark ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-700'
  return isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
}

/** คอมโพเนนต์หลัก */
export default function RiskMeter({ risk, isDark }: RiskMeterProps) {
  const pct = Math.round((risk.level / 5) * 100)

  return (
    <div className={`rounded-xl border p-3 ${tone(risk.level, isDark)}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Risk {risk.level}/5 • {risk.category}</div>
        <div className="text-xs opacity-80">พบคำ: {risk.keywordsDetected.length > 0 ? risk.keywordsDetected.join(', ') : '-'}</div>
      </div>
      <div className={`mt-2 w-full h-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${risk.level >= 4 ? 'bg-red-500' : risk.level === 3 ? 'bg-amber-500' : 'bg-emerald-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
