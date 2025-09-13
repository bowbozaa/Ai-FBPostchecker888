/** 
 * PolicyRulesPanel - จัดการกฎการตรวจสอบโพสต์ทั้งหมด
 * - แสดงผลเป็นตาราง, เพิ่ม/ลบ/แก้ไข/บันทึก/รีเซ็ต
 * - Import/Export เป็นไฟล์ JSON
 * - ใช้ข้อมูลจาก `utils/risk` ที่อัปเกรดแล้ว
 */

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Upload, RefreshCcw, Save, Download, Pencil } from 'lucide-react'
import { getPolicyRules, setPolicyRules, resetPolicyRules, PolicyRule } from '@/utils/risk'
import RuleEditDialog from './RuleEditDialog' // <-- 1. Import Dialog ที่สร้างขึ้นมาใหม่

/** Props สำหรับ Panel */
export interface PolicyRulesPanelProps {
  isDark?: boolean
}

/**
 * คอมโพเนนต์หลัก: จัดการกฎการตรวจสอบ
 */
export default function PolicyRulesPanel({ isDark }: PolicyRulesPanelProps) {
  const [rules, setRules] = useState<PolicyRule[]>([])
  const [isDirty, setIsDirty] = useState(false) // ติดตามว่ามีการเปลี่ยนแปลงหรือไม่

  // --- 2. เพิ่ม State สำหรับจัดการ Dialog ---
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<Partial<PolicyRule> | null>(null)

  const fileRef = useRef<HTMLInputElement | null>(null)

  /** โหลดข้อมูลเริ่มต้น */
  useEffect(() => {
    setRules(getPolicyRules())
  }, [])

  // --- 3. สร้างฟังก์ชันสำหรับเปิด Dialog ---
  const handleOpenAddNew = () => {
    setEditingRule(null) // ไม่มี rule = โหมดเพิ่มใหม่
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (rule: PolicyRule) => {
    setEditingRule(rule)
    setIsDialogOpen(true)
  }

  const handleDeleteRule = (id: string) => {
    if (!confirm('ต้องการลบกฎนี้หรือไม่?')) return
    setRules(rules.filter(r => r.id !== id))
    setIsDirty(true)
  }

  // --- 4. สร้างฟังก์ชันสำหรับบันทึกข้อมูลจาก Dialog ---
  const handleSaveRule = (savedRule: PolicyRule) => {
    const exists = rules.some(r => r.id === savedRule.id)
    if (exists) {
      // อัปเดตตัวที่มีอยู่
      setRules(rules.map(r => r.id === savedRule.id ? savedRule : r))
    } else {
      // เพิ่มตัวใหม่
      setRules([...rules, savedRule])
    }
    setIsDirty(true)
  }

  /** บันทึกลง localStorage */
  const handleSave = () => {
    setPolicyRules(rules)
    setIsDirty(false)
    alert('บันทึกการตั้งค่ากฎเรียบร้อย')
  }

  /** รีเซ็ตกลับค่าเริ่มต้น */
  const handleReset = () => {
    if (!confirm('ต้องการรีเซ็ตเป็นค่าตั้งต้นหรือไม่? (การเปลี่ยนแปลงที่ยังไม่บันทึกจะหายไป)')) return
    resetPolicyRules()
    setRules(getPolicyRules()) // โหลดค่าตั้งต้นใหม่
    setIsDirty(false)
  }

  /** Export เป็น JSON */
  const handleExport = () => {
    try {
      const exportData = { version: 1, rules: rules }; // เพิ่มโครงสร้างให้ Import ง่ายขึ้น
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'policy_rules.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      alert('ไม่สามารถ Export ได้')
    }
  }

  /** Import จากไฟล์ JSON */
  const handleImportClick = () => {
    fileRef.current?.click()
  }

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      if (data && Array.isArray(data)) { // รองรับ format เก่าที่เป็น array ตรงๆ
        setRules(data as PolicyRule[])
        alert(`นำเข้า (รูปแบบเก่า) เรียบร้อย (${data.length} กฎ) — อย่าลืมกด "บันทึก"`)
      } else if (data && data.rules && Array.isArray(data.rules)) { // รองรับ format ใหม่
        setRules(data.rules as PolicyRule[])
        alert(`นำเข้าเรียบร้อย (${data.rules.length} กฎ) — อย่าลืมกด "บันทึก"`)
      } else {
        throw new Error('ไฟล์ต้องมี key "rules" ที่เป็น array หรือเป็น array ของกฎโดยตรง')
      }
      setIsDirty(true)
    } catch (err: any) {
      alert('นำเข้าไม่สำเร็จ: ' + (err?.message || 'รูปแบบไฟล์ไม่ถูกต้อง'))
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const cardTone = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'

  return (
    <Card className={`${cardTone} shadow-lg`}>
      <CardHeader>
        <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>จัดการกฎการตรวจสอบ (Policy Rules)</CardTitle>
        <CardDescription>
          จัดการกฎและเงื่อนไขที่ใช้ในการวิเคราะห์ความเสี่ยงของโพสต์
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Action Bar for Add new rule */}
        <div className="flex justify-end">
            <Button onClick={handleOpenAddNew}> {/* <-- 5. เชื่อมปุ่มกับฟังก์ชันเปิด Dialog */}
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มกฎใหม่
            </Button>
        </div>

        {/* Rules Table */}
        <div className={`rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Keyword / Regex</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rules.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">
                                ไม่มีกฎในระบบ
                            </TableCell>
                        </TableRow>
                    ) : (
                        rules.map(rule => (
                            <TableRow key={rule.id}>
                                <TableCell className="font-medium">
                                    <div className="max-w-xs truncate" title={rule.keyword}>{rule.keyword}</div>
                                    {rule.is_regex && <Badge variant="outline" className="ml-2 bg-transparent">Regex</Badge>}
                                </TableCell>
                                <TableCell>{rule.category}</TableCell>
                                <TableCell>{rule.risk_score}</TableCell>
                                <TableCell>
                                    <Badge variant={rule.enabled ? 'default' : 'outline'} className={rule.enabled ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-transparent'}>
                                        {rule.enabled ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(rule)}> {/* <-- 6. เชื่อมปุ่ม Edit */}
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>

        <Separator />

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className={isDark ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>
            ทั้งหมด {rules.length} กฎ
            {isDirty && <span className="ml-4 text-amber-400 font-bold">มีการเปลี่ยนแปลงที่ยังไม่บันทึก</span>}
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
            <Button variant="outline" className="bg-transparent" onClick={handleReset} title="รีเซ็ตเป็นค่าตั้งต้น">
              <RefreshCcw className="w-4 h-4 mr-2" />
              รีเซ็ตค่าตั้งต้น
            </Button>
            <Button onClick={handleSave} title="บันทึก" disabled={!isDirty}>
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

        {/* --- 7. เพิ่ม Dialog เข้าไปในหน้า --- */}
        <RuleEditDialog 
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSaveRule}
            rule={editingRule}
        />
      </CardContent>
    </Card>
  )
}
