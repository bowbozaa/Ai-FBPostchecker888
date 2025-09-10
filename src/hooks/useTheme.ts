/**
 * Custom hook สำหรับจัดการ Theme (Dark/Light Mode)
 */
import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

/**
 * Hook สำหรับจัดการ Theme ของแอป
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark')

  /**
   * โหลด theme จาก localStorage เมื่อแอปเริ่มต้น
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('fb-checker-theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  /**
   * อัพเดท theme และบันทึกใน localStorage
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('fb-checker-theme', newTheme)
  }

  /**
   * ตั้งค่า theme โดยตรง
   */
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('fb-checker-theme', newTheme)
  }

  return {
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}
