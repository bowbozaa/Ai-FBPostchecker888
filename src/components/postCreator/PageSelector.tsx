/** 
 * PageSelector - เลือกเพจที่จะโพสต์ และเชื่อมต่อเพจจาก Facebook Graph API
 * - ผู้ใช้สามารถวาง Page Access Token ของตนเพื่อดึงเพจ (อาจติด CORS ใน sandbox)
 * - รองรับการเพิ่มเพจแบบ Manual
 */

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Globe, Plus, Link2, Trash2, CheckCircle2 } from 'lucide-react'
import { postService, PageConnection } from '@/services/postService'

/** Props */
export interface PageSelectorProps {
  /** id ของเพจที่เลือก */
  selectedIds: string[]
  /** callback เปลี่ยนรายการ */
  onChange: (ids: string[]) => void
  /** โหมดสี */
  isDark?: boolean
}

export default function PageSelector({ selectedIds, onChange, isDark }: PageSelectorProps) {
  const [pages, setPages] = useState<PageConnection[]>([])
  const [token, setToken] = useState('')

  // Manual add
  const [manualName, setManualName] = useState('')
  const [manualId, setManualId] = useState('')
  const [manualToken, setManualToken] = useState('')

  /** โหลดรายการเพจ */
  const reload = () => setPages(postService.listPages())

  useEffect(() => {
    reload()
  }, [])

  /** เชื่อมต่อด้วย FB token (ลองดึง me/accounts) */
  const connect = async () => {
    if (!token.trim()) return
    try {
      await postService.connectFacebook(token.trim())
      reload()
      setToken('')
      alert('เชื่อมต่อสำเร็จ (ถ้าเพจไม่ขึ้น ตรวจสอบ CORS/สิทธิ์ของ Token)')
    } catch (e: any) {
      alert('เชื่อมต่อไม่สำเร็จ: ' + (e?.message || 'Unknown'))
    }
  }

  /** เพิ่มปรับเอง */
  const addManual = () => {
    if (!manualName.trim() || !manualId.trim() || !manualToken.trim()) {
      alert('กรุณากรอกให้ครบ')
      return
    }
    postService.addPage({ id: manualId.trim(), name: manualName.trim(), accessToken: manualToken.trim() })
    setManualId('')
    setManualName('')
    setManualToken('')
    reload()
  }

  /** toggle เลือก */
  const toggle = (id: string) => {
    if (selectedIds.includes(id)) onChange(selectedIds.filter(v => v !== id))
    else onChange([...selectedIds, id])
  }

  /** ลบเพจ */
  const remove = (id: string) => {
    postService.removePage(id)
    onChange(selectedIds.filter(v => v !== id))
    reload()
  }

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2"><Globe className="w-4 h-4" /> เลือกเพจที่จะโพสต์</Label>

      {pages.length === 0 ? (
        <div className={`rounded-xl border p-4 ${isDark ? 'border-white/10 bg-white/5 text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-700'}`}>
          ยังไม่มีเพจที่เชื่อมต่อ — วาง Page Access Token เพื่อลองดึงรายชื่อเพจ หรือเพิ่มแบบ Manual ด้านล่าง
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {pages.map(p => {
            const active = selectedIds.includes(p.id)
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`px-3 py-2 rounded-xl border text-sm transition-all ${active
                  ? isDark ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200'
                  : isDark ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
                title={p.name}
              >
                <div className="flex items-center gap-2">
                  {active ? <CheckCircle2 className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  <span className="truncate max-w-[160px]">{p.name}</span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Token connect */}
      <div className="flex items-center gap-2">
        <Input placeholder="วาง Facebook Page Access Token" value={token} onChange={(e) => setToken(e.target.value)} />
        <Button onClick={connect}>เชื่อมต่อ</Button>
      </div>

      {/* Manual add */}
      <div className="grid sm:grid-cols-3 gap-2">
        <Input placeholder="Page Name" value={manualName} onChange={(e) => setManualName(e.target.value)} />
        <Input placeholder="Page ID" value={manualId} onChange={(e) => setManualId(e.target.value)} />
        <Input placeholder="Page Access Token" value={manualToken} onChange={(e) => setManualToken(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="bg-transparent" onClick={addManual}><Plus className="w-4 h-4 mr-2" /> เพิ่มเพจ (Manual)</Button>
        {pages.length > 0 && (
          <Badge variant="secondary" className="text-xs">ทั้งหมด {pages.length} เพจ</Badge>
        )}
      </div>

      {/* รายการและลบ */}
      {pages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {pages.map(p => (
            <button key={p.id} onClick={() => remove(p.id)} className="px-2 py-1 rounded-lg border text-xs flex items-center gap-1 bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-300">
              <Trash2 className="w-3 h-3" /> ลบ {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
