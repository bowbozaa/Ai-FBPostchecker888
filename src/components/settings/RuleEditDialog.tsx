/**
 * RuleEditDialog.tsx - Dialog สำหรับเพิ่ม/แก้ไขกฎ Policy
 */
import { useEffect, useState } from 'react'
import { PolicyRule } from '@/utils/risk'
import { Button } from "@/components/ui/button"
import { 
    Dialog, DialogContent, DialogDescription, DialogFooter, 
    DialogHeader, DialogTitle, DialogTrigger, DialogClose 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface RuleEditDialogProps {
  /** Rule ที่จะแก้ไข (ถ้าเป็น null = โหมดเพิ่มใหม่) */
  rule: Partial<PolicyRule> | null
  /** สถานะการเปิด/ปิด Dialog */
  isOpen: boolean
  /** Callback เมื่อปิด Dialog */
  onClose: () => void
  /** Callback เมื่อบันทึกข้อมูล */
  onSave: (rule: PolicyRule) => void
}

export default function RuleEditDialog({ rule, isOpen, onClose, onSave }: RuleEditDialogProps) {
  const [formData, setFormData] = useState<Partial<PolicyRule>>({})

  // เมื่อ prop `rule` เปลี่ยน (เช่น ผู้ใช้กด Edit ตัวใหม่) ให้รีเซ็ตฟอร์ม
  useEffect(() => {
    if (isOpen && rule) {
      setFormData(rule)
    } else {
      // โหมดเพิ่มใหม่: ตั้งค่า default
      setFormData({
        keyword: '',
        category: 'ทั่วไป',
        risk_score: 1,
        is_regex: false,
        enabled: true,
      })
    }
  }, [rule, isOpen])

  const handleFieldChange = (field: keyof PolicyRule, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveClick = () => {
    if (!formData.keyword?.trim()) {
      alert('กรุณาใส่ Keyword หรือ Regex')
      return
    }

    const finalRule: PolicyRule = {
      id: formData.id || `new-${Date.now()}`,
      keyword: formData.keyword.trim(),
      category: formData.category || 'ทั่วไป',
      risk_score: Number(formData.risk_score) || 1,
      is_regex: formData.is_regex || false,
      enabled: formData.enabled !== undefined ? formData.enabled : true,
    }
    onSave(finalRule)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{rule?.id ? 'แก้ไขกฎ' : 'เพิ่มกฎใหม่'}</DialogTitle>
          <DialogDescription>
            กำหนด Keyword/Regex และคุณสมบัติของกฎเพื่อใช้ในการวิเคราะห์ความเสี่ยง
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keyword" className="text-right">Keyword/Regex</Label>
            <Input 
              id="keyword" 
              value={formData.keyword || ''}
              onChange={e => handleFieldChange('keyword', e.target.value)}
              className="col-span-3" 
              placeholder='เช่น เครดิตฟรี หรือ line\s?id:\s?@'
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Input 
              id="category" 
              value={formData.category || ''}
              onChange={e => handleFieldChange('category', e.target.value)}
              className="col-span-3" 
              placeholder='เช่น การพนัน, โปรโมชั่นแฝง'
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="risk_score" className="text-right">Risk Score</Label>
            <Select 
              value={String(formData.risk_score || 1)}
              onValueChange={val => handleFieldChange('risk_score', Number(val))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="เลือกระดับความเสี่ยง" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (ปลอดภัย)</SelectItem>
                <SelectItem value="2">2 (ค่อนข้างปลอดภัย)</SelectItem>
                <SelectItem value="3">3 (สุ่มเสี่ยง)</SelectItem>
                <SelectItem value="4">4 (เสี่ยงสูง)</SelectItem>
                <SelectItem value="5">5 (เสี่ยงสูงสุด)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_regex" className="text-right">เป็น Regex</Label>
            <Switch 
              id="is_regex" 
              checked={formData.is_regex || false}
              onCheckedChange={val => handleFieldChange('is_regex', val)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="enabled" className="text-right">เปิดใช้งาน</Label>
            <Switch 
              id="enabled" 
              checked={formData.enabled !== undefined ? formData.enabled : true}
              onCheckedChange={val => handleFieldChange('enabled', val)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">ยกเลิก</Button>
          </DialogClose>
          <Button type="button" onClick={handleSaveClick}>บันทึก</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
