/**
 * useDebounce.ts
 * Hook สำหรับหน่วงค่า state ก่อนส่งต่อไปใช้งาน เพื่อลดการคำนวณ/เรียกใช้งานซ้ำขณะผู้ใช้กำลังพิมพ์
 */

import { useEffect, useState } from 'react'

/**
 * คืนค่าใหม่เฉพาะเมื่อหยุดเปลี่ยนตามระยะเวลา delay ที่กำหนด
 */
export function useDebouncedValue<T>(value: T, delay: number = 400): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(t)
  }, [value, delay])

  return debounced
}
