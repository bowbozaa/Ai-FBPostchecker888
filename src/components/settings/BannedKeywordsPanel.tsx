/** 
 * BannedKeywordsPanel - จัดการ "คำต้องห้าม" ที่ใช้ตรวจโพสต์
 * - เพิ่ม/ลบ/บันทึก/รีเซ็ต/ล้างทั้งหมด
 * - Import/Export เป็นไฟล์ JSON
 * - เก็บข้อมูลใน localStorage ผ่าน risk utils
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Plus, Trash2, Upload, RefreshCcw, Save, Download } from 'lucide-react'
import { getForbiddenKeywords, setForbiddenKeywords, resetForbiddenKeywords, DEFAULT_FORBIDDEN } from '@/utils/risk'

/** Props สำหรับ Panel */
export interface BannedKeywordsPanelProps {
  /** โหมดสีเข้ม */
  isDark?: boolean
}

/**
 * คอมโพเนนต์หลัก: จัดการคำต้องห้าม
 */
export default function BannedKeywordsPanel({ isDark }: BannedKeywordsPanelProps) {
  const [list, setList] = useState<string[]>([])
  const [input, setInput] = useState('')
  const count = list.length

  /** ตัวอ้างอิง input สำหรับ Import */
  const fileRef = useRef<HTMLInputElement | null>(null)

  /** โหลดข้อมูลเริ่มต้น */
  useEffect(() => {
    setList(getForbiddenKeywords())
  }, [])

  /**
   * เพิ่มคำจากอินพุต: รองรับการวางหลายคำคั่นด้วยจุลภาค/เว้นวรรค/บรรทัดใหม่
   */
  const addFromInput = () => {
    const raw = input.trim()
    if (!raw) return
    const tokens = raw
      .split(/[\n,，\s]+/g)
      .map((s) => s.trim())
      .filter(Boolean)

    if (tokens.length === 0) return
    const merged = Array.from(new Set([...list, ...tokens]))
    setList(merged)
    setInput('')
  }

  /** ลบคำ */
  const removeWord = (w: string) => {
    setList(list.filter((x) => x !== w))
  }

  /** บันทึกลง localStorage */
  const handleSave = () => {
    setForbiddenKeywords(list)
    alert('บันทึกรายการคำต้องห้ามเรียบร้อย')
  }

  /** รีเซ็ตกลับค่าเริ่มต้น */
  const handleReset = () => {
    if (!confirm('ต้องการรีเซ็ตเป็นค่าตั้งต้นหรือไม่?')) return
    resetForbiddenKeywords()
    setList(getForbiddenKeywords())
  }

  /** ล้างทั้งหมด */
  const handleClearAll = () => {
    if (!confirm('ต้องการล้างรายการทั้งหมดหรือไม่?')) return
    setList([])
  }

  /** Export เป็น JSON (ดาวน์โหลดไฟล์) */
  const handleExport = () => {
    try {
      const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'banned_keywords.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
      alert('ไม่สามารถ Export ได้')
    }
  }

  /** Import จากไฟล์ JSON */
  const handleImportClick = () => {
    fileRef.current?.click()
  }

  /** เมื่อเลือกไฟล์เพื่อ Import */
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const arr = JSON.parse(text)
      if (!Array.isArray(arr)) throw new Error('รูปแบบไม่ถูกต้อง')
      const cleaned = Array.from(new Set(arr.map((s: any) => typeof s === 'string' ? s.trim() : '').filter((s: string) => !!s)))
      setList(cleaned)
      alert(`นำเข้าเรียบร้อย (${cleaned.length} คำ) — อย่าลืมกด "บันทึก"`)
    } catch (err: any) {
      alert('นำเข้าไม่สำเร็จ: ' + (err?.message || 'รูปแบบไฟล์ไม่ถูกต้อง'))
    } finally {
      // เคลียร์ค่าเพื่อให้เลือกไฟล์ซ้ำได้
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const cardTone = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'

  return (
    <Card className={`${cardTone} shadow-lg`}>
      <CardHeader>
        <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>คำต้องห้าม (Banned Keywords)</CardTitle>
        <CardDescription>
          เพิ่มคำที่เสี่ยงต่อการถูกแบนบน Facebook ระบบจะใช้รายการนี้ในการคำนวณ Risk Score แบบเรียลไทม์
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add box */}
        <div className="flex gap-2 items-center">
          <Input
            placeholder="เพิ่มคำ… (พิมพ์หลายคำคั่นด้วย , หรือ เว้นวรรค/ขึ้นบรรทัดใหม่)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={addFromInput}>
            <Plus className="w-4 h-4 mr-2" />
            เพิ่ม
          </Button>
        </div>

        {/* Chips list */}
        {list.length === 0 ? (
          <div className={`rounded-xl border p-4 ${isDark ? 'border-white/10 text-gray-300' : 'border-gray-200 text-gray-700'} bg-transparent`}>
            ยังไม่มีคำในรายการ
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {list.map((w) => (
              <span key={w} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1 text-sm ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                {w}
                <button
                  onClick={() => removeWord(w)}
                  className={`inline-flex items-center justify-center rounded-md p-1 ${isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                  title="ลบคำนี้"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        <Separator />

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className={isDark ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>
            ทั้งหมด {count} คำ • ค่าตั้งต้น {DEFAULT_FORBIDDEN.length} คำ
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="bg-transparent" onClick={handleImportClick} title="นำเข้า (.json)">
              <Upload className="w-4 h-4 mr-2" />
              นำเข้า
            </Button>
            <Button variant="outline" className="bg-transparent" onClick={handleExport} title="ส่งออก (.json)">
              <Download className="w-4 h-4 mr-2" />
              ส่งออก
            </Button>
            <Button variant="outline" className="bg-transparent" onClick={handleClearAll} title="ล้างทั้งหมด">
              <Trash2 className="w-4 h-4 mr-2" />
              ล้างทั้งหมด
            </Button>
            <Button variant="outline" className="bg-transparent" onClick={handleReset} title="รีเซ็ตเป็นค่าตั้งต้น">
              <RefreshCcw className="w-4 h-4 mr-2" />
              รีเซ็ตค่าตั้งต้น
            </Button>
            <Button onClick={handleSave} title="บันทึก">
              <Save className="w-4 h-4 mr-2" />
              บันทึก
            </Button>
          </div>
        </div>

        {/* Hidden file input for import */}
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          onChange={onFileChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  )
}
