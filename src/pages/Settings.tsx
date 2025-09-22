/**
 * Settings Page - หน้า Settings หลัก
 * - รวมโมดูลจัดการ "คำต้องห้าม" สำหรับ Risk Checker
 * - เพิ่ม "API & n8n Config" สำหรับตั้งค่า Webhook/Authorization + ปุ่ม Test
 * - เพิ่ม "Appearance" สำหรับสลับธีม
 */

import { Settings as SettingsIcon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import PolicyRulesPanel from '@/components/settings/PolicyRulesPanel'
import ApiConfigPanel from '@/components/settings/ApiConfigPanel'
import AppearancePanel from '@/components/settings/AppearancePanel'
import FacebookPagesPanel from '@/components/settings/FacebookPagesPanel'

/**
 * หน้า Settings
 */
export default function SettingsPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bgClass = isDark
    ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
    : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <SettingsIcon className={isDark ? 'text-blue-400' : 'text-blue-600'} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              ตั้งค่าและจัดการระบบ ตรวจโพสต์ด้วย AI, คำต้องห้าม, และการเชื่อมต่อ API
            </p>
          </div>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 gap-6">
          <FacebookPagesPanel isDark={isDark} />
          <ApiConfigPanel isDark={isDark} />
          <PolicyRulesPanel isDark={isDark} />
          <AppearancePanel isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
