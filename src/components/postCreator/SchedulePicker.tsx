/** 
 * SchedulePicker - เลือกเวลาลงโพสต์ (datetime-local)
 */

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Clock } from 'lucide-react'

export interface SchedulePickerProps {
  /** ค่า datetime-local (ISO string) */
  value: string
  /** เปลี่ยนค่า */
  onChange: (v: string) => void
  /** โหมดสี */
  isDark?: boolean
}

export default function SchedulePicker({ value, onChange, isDark }: SchedulePickerProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="schedule" className="flex items-center gap-2">
        <Clock className="w-4 h-4" /> ตั้งเวลาโพสต์ (ไม่บังคับ)
      </Label>
      <Input
        id="schedule"
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-white border-gray-300 text-gray-900'}
      />
    </div>
  )
}
