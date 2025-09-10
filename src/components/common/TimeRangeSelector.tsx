/**
 * TimeRangeSelector - ปุ่มเลือกช่วงเวลาแบบ Segmented (7/14/30 วัน)
 */

import { Button } from '@/components/ui/button'

/**
 * Props สำหรับ TimeRangeSelector
 */
export interface TimeRangeSelectorProps {
  /** ค่าปัจจุบันของช่วงเวลาเป็นจำนวนวัน */
  value: number
  /** callback เมื่อมีการเปลี่ยนช่วงเวลา */
  onChange: (days: number) => void
  /** ตัวเลือกช่วงเวลา (วัน) เริ่มต้น [7, 14, 30] */
  options?: number[]
  /** ใช้ธีมมืดหรือไม่ (เพื่อโทนสี Border/Natural) */
  isDark?: boolean
}

/**
 * ปุ่มเลือกช่วงเวลาแบบ segmented control
 */
export default function TimeRangeSelector({
  value,
  onChange,
  options = [7, 14, 30],
  isDark,
}: TimeRangeSelectorProps) {
  return (
    <div
      className={`inline-flex items-center rounded-xl border ${
        isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'
      } p-1`}
      role="tablist"
      aria-label="เลือกช่วงเวลาแสดงผล"
    >
      {options.map((d) => {
        const active = value === d
        return (
          <Button
            key={d}
            type="button"
            variant={active ? 'default' : 'outline'}
            className={`h-8 px-3 text-sm ${
              active
                ? ''
                : 'bg-transparent'
            }`}
            aria-pressed={active}
            onClick={() => onChange(d)}
          >
            {d} วัน
          </Button>
        )
      })}
    </div>
  )
}
