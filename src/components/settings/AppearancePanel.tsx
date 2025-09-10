/**
 * AppearancePanel - ตั้งค่าโหมดแสดงผล (Dark/Light)
 * - ใช้ useTheme จากระบบกลาง
 */

import { useTheme } from '@/hooks/useTheme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

/** Props */
export interface AppearancePanelProps {
  /** โหมดสีเข้ม */
  isDark?: boolean
}

/**
 * คอมโพเนนต์หลัก: สลับ Dark/Light
 */
export default function AppearancePanel({ isDark }: AppearancePanelProps) {
  const { theme, setThemeMode } = useTheme()

  const cardTone = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subTextClass = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <Card className={`${cardTone} shadow-lg`}>
      <CardHeader>
        <CardTitle className={textClass}>Appearance</CardTitle>
        <CardDescription>ตั้งค่าโหมดมืด/สว่าง ของระบบ</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center justify-between gap-3">
        <div className={`${subTextClass} text-sm`}>
          โหมดปัจจุบัน: <span className="font-medium">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => setThemeMode('light')}
            title="สลับเป็นโหมดสว่าง"
          >
            <Sun className="w-4 h-4 mr-2" />
            Light
          </Button>
          <Button onClick={() => setThemeMode('dark')} title="สลับเป็นโหมดมืด">
            <Moon className="w-4 h-4 mr-2" />
            Dark
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
