/** 
 * ApiConfigPanel - ตั้งค่า Webhook URL และ Authorization Header สำหรับ n8n/บริการภายนอก
 * - บันทึกลง localStorage คีย์ "fbpostshield_config"
 * - อัปเดตค่าให้ apiService เพื่อให้ทั้งแอปใช้ค่าล่าสุด
 * - มีปุ่มทดสอบการเชื่อมต่อ (GET) เพื่อดูผลลัพธ์แบบรวดเร็ว
 * - เพิ่ม Debounce 400ms สำหรับ Live Sync runtime
 */

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Link2, Save, Wifi, Info, ShieldCheck } from 'lucide-react'
import { systemConfig } from '@/utils/configHelper'
import { apiService, testConnection } from '@/services/apiService'

/** Props ของ ApiConfigPanel */
export interface ApiConfigPanelProps {
  /** โหมดสีเข้ม */
  isDark?: boolean
}

/** โครงสร้างคอนฟิกที่เก็บใน localStorage */
interface StoredConfig {
  webhookUrl?: string
  authHeader?: string
}

/**
 * อ่านคอนฟิกจาก localStorage (ถ้ามี)
 */
function readStoredConfig(): StoredConfig {
  try {
    const raw = localStorage.getItem('fbpostshield_config')
    if (!raw) return {}
    const parsed = JSON.parse(raw) as StoredConfig
    return parsed || {}
  } catch {
    return {}
  }
}

/**
 * เขียนคอนฟิกลง localStorage
 */
function writeStoredConfig(cfg: StoredConfig) {
  localStorage.setItem('fbpostshield_config', JSON.stringify(cfg))
}

/**
 * คอมโพเนนต์หลัก: ตั้งค่า API/Webhook + Authorization
 */
export default function ApiConfigPanel({ isDark }: ApiConfigPanelProps) {
  const defaults = {
    webhookUrl: systemConfig?.n8n?.webhookUrl || '',
  }

  const [webhookUrl, setWebhookUrl] = useState<string>(defaults.webhookUrl)
  const [authHeader, setAuthHeader] = useState<string>('')

  const [testing, setTesting] = useState(false)
  const [testText, setTestText] = useState<string>('')
  const [testOk, setTestOk] = useState<boolean | null>(null)

  /** โหลดคอนฟิกเดิม */
  useEffect(() => {
    const st = readStoredConfig()
    setWebhookUrl(st.webhookUrl || defaults.webhookUrl)
    setAuthHeader(st.authHeader || '')
  }, [])

  /**
   * Live Sync (Debounce 400ms): อัปเดต apiService.updateConfig "ทันที" แบบหน่วงเวลา
   * - ช่วยลดจำนวนครั้งระหว่างผู้ใช้กำลังพิมพ์
   * - การบันทึกถาวรลง localStorage ยังต้องกดปุ่ม "บันทึก"
   */
  const debounceRef = useRef<number | null>(null)
  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
    }
    debounceRef.current = window.setTimeout(() => {
      apiService.updateConfig({
        webhookUrl: (webhookUrl || '').trim(),
        apiKey: (authHeader || '').trim(),
      })
    }, 400)
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [webhookUrl, authHeader])

  /**
   * บันทึกคอนฟิกลง localStorage และ sync ไป apiService
   */
  const handleSave = () => {
    const cfg: StoredConfig = {
      webhookUrl: (webhookUrl || '').trim(),
      authHeader: (authHeader || '').trim(),
    }
    writeStoredConfig(cfg)
    apiService.updateConfig({
      webhookUrl: cfg.webhookUrl,
      apiKey: cfg.authHeader,
    })
    alert('บันทึกการตั้งค่า API เรียบร้อย')
  }

  /**
   * ทดสอบการเชื่อมต่อ (GET)
   */
  const handleTest = async () => {
    if (!webhookUrl.trim()) {
      alert('กรุณากรอก Webhook URL')
      return
    }
    setTesting(true)
    setTestOk(null)
    setTestText('กำลังทดสอบ...')

    try {
      const headers = authHeader.trim() ? { Authorization: authHeader.trim() } : undefined
      const res = await testConnection(webhookUrl.trim(), { method: 'GET', headers })
      setTestOk(res.ok)
      if (res.ok) {
        setTestText(`สำเร็จ (HTTP ${res.status})${res.bodyText ? ' — ' + res.bodyText.substring(0, 120) : ''}`)
      } else {
        setTestText(`ล้มเหลว (${res.status || 'ERR'}) ${res.error ? ' — ' + res.error : ''}`)
      }
    } catch (e: any) {
      setTestOk(false)
      setTestText('ล้มเหลว — ' + (e?.message || 'Network error'))
    } finally {
      setTesting(false)
    }
  }

  const cardTone = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
  const hintText = isDark ? 'text-gray-300' : 'text-gray-700'
  const noteText = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    <Card className={`${cardTone} shadow-lg`}>
      <CardHeader>
        <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>API &amp; n8n Config</CardTitle>
        <CardDescription>
          ตั้งค่า Webhook URL และ Authorization Header เพื่อเชื่อมต่อ n8n/บริการ AI ที่ใช้อยู่ในระบบ
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Webhook URL */}
        <div className="grid gap-2">
          <Label htmlFor="webhook" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" /> Webhook URL
          </Label>
          <Input
            id="webhook"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://example.com/webhook/input"
          />
          <p className={`text-xs ${noteText}`}>
            คำแนะนำ: ใช้ URL ของ n8n Webhook ที่เปิดรับข้อมูลสำหรับ Generate/Rewrite
          </p>
        </div>

        {/* Authorization Header */}
        <div className="grid gap-2">
          <Label htmlFor="auth" className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Authorization Header (ถ้ามี)
          </Label>
          <Input
            id="auth"
            value={authHeader}
            onChange={(e) => setAuthHeader(e.target.value)}
            placeholder="เช่น Bearer xxxxx"
          />
          <p className={`text-xs ${noteText}`}>
            ถ้า workflow ของคุณต้องการ Header เพื่อยืนยันตัวตน ให้ใส่ไว้ที่นี่ (เช่น Bearer ... )
          </p>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {testOk === true && <Badge variant="secondary" className="text-xs">พร้อมใช้งาน</Badge>}
            {testOk === false && <Badge variant="destructive" className="text-xs">ทดสอบล้มเหลว</Badge>}
            {testOk === null && <Badge variant="outline" className="text-xs bg-transparent">ยังไม่ทดสอบ</Badge>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={handleTest}
              disabled={testing}
              title="ทดสอบการเชื่อมต่อ"
            >
              <Wifi className="w-4 h-4 mr-2" />
              {testing ? 'กำลังทดสอบ…' : 'ทดสอบการเชื่อมต่อ'}
            </Button>
            <Button onClick={handleSave} title="บันทึกการตั้งค่า">
              <Save className="w-4 h-4 mr-2" />
              บันทึก
            </Button>
          </div>
        </div>

        {/* Test result */}
        {testText && (
          <div className={`text-sm flex items-start gap-2 ${hintText}`}>
            <Info className="w-4 h-4 mt-0.5" />
            <span>{testText}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
