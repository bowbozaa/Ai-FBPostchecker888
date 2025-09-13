/**
 * PostCreator Page - หน้าสร้าง/จัดการโพสต์ FB
 * - Textarea กรอกเนื้อหา + Image URL
 * - Generate by AI / Rewrite (ผ่าน n8n webhook เดิม + fallback)
 * - Risk Score แบบเรียลไทม์ (ปรับเป็น Debounce 400ms)
 * - Save Draft / Schedule / Post Now
 * - Multi-page posting (เชื่อม Facebook Graph API ด้วย Access Token ของเพจ)
 * - แถบสถานะคอนฟิกปัจจุบัน (Webhook/Auth/Timeout/Retries) + ปุ่มลัดไป Settings + ปุ่มทดสอบการเชื่อมต่อ
 */

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  AlertTriangle, Wand2, RefreshCw, Send, Save, Calendar, 
  Image as ImageIcon, SquarePen, Trash2, Pencil, Link2, ShieldCheck, 
  Settings as SettingsIcon, Wifi, MessageSquarePlus, ThumbsUp, Flag
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import RiskMeter from '@/components/postCreator/RiskMeter'
import PageSelector from '@/components/postCreator/PageSelector'
import SchedulePicker from '@/components/postCreator/SchedulePicker'
import { analyzeRisk } from '@/utils/risk'
import { postService, PostItem } from '@/services/postService'
import { triggerWebhook, getNetworkConfig } from '@/services/apiService'
import { systemConfig } from '@/utils/configHelper'
import { useNavigate } from 'react-router'
import { useDebouncedValue } from '@/hooks/useDebounce'
import { apiService } from '@/services/apiService'

/**
 * อ่าน webhook ปัจจุบันจาก LocalStorage (เหมือนหน้า Settings/Analyzer)
 */
function getCurrentWebhook(): { url: string; headers?: Record<string, string> } {
  try {
    const raw = localStorage.getItem('fbpostshield_config')
    if (raw) {
      const cfg = JSON.parse(raw) as { webhookUrl?: string; authHeader?: string }
      const url = (cfg.webhookUrl && cfg.webhookUrl.trim()) ? cfg.webhookUrl.trim() : systemConfig.n8n.webhookUrl
      const headers = cfg.authHeader && cfg.authHeader.trim() ? { Authorization: cfg.authHeader.trim() } : undefined
      return { url, headers }
    }
  } catch {}
  return { url: systemConfig.n8n.webhookUrl }
}

/**
 * สร้าง prompt สำหรับ AI เขียนโพสต์
 */
function buildGeneratePrompt(topic: string) {
  const base = topic.trim() || 'general topic'
  return `เขียนโพสต์ Facebook ภาษาไทย แบบมืออาชีพ เกี่ยวกับ: "${base}"
ข้อกำหนด:
- ใช้ถ้อยคำกลาง ไม่ส่อการพนัน/โปรโมชันแรง
- กระชับ 3-5 บรรทัด
- มี Call-to-Action แบบกลางๆ
- หลีกเลี่ยงคำ: แทงบอล, คาสิโน, บาคาร่า, สล็อต, เครดิตฟรี, เดิมพัน, รวยเร็ว, ได้เงินจริง
รูปแบบผลลัพธ์: ข้อความล้วน`
}

/**
 * สร้าง prompt สำหรับ AI รีไรท์ลดความเสี่ยง
 */
function buildRewritePrompt(text: string) {
  return `Rewrite โพสต์ต่อไปนี้ให้ปลอดภัยจากคำเสี่ยง/โปรโมชันแรง ปรับถ้อยคำให้เป็นกลาง อ่านง่าย คงความหมายหลัก:
---
${text}
---
ข้อกำหนด:
- หลีกเลี่ยงคำเสี่ยง เช่น: แทงบอล, คาสิโน, บาคาร่า, สล็อต, เครดิตฟรี, เดิมพัน, รวยเร็ว, ได้เงินจริง
- รักษาโทนมืออาชีพ
- ส่งออกข้อความล้วน`
}

/**
 * พยายาม parse ข้อความจาก body ที่ส่งกลับจาก n8n (ทั่วไปเป็น string)
 */
function parseN8nText(bodyText?: string | null): string | null {
  if (!bodyText) return null
  try {
    const json = JSON.parse(bodyText)
    if (typeof json === 'string') return json
    if (json && typeof json.text === 'string') return json.text
    if (json && typeof json.message === 'string') return json.message
    if (json && json.data && typeof json.data === 'string') return json.data
  } catch {
    if (bodyText.trim()) return bodyText.trim()
  }
  return null
}

/**
 * สรุปคอนฟิกสำหรับแสดงผลในแถบสถานะ
 */
interface ConfigPreview {
  /** hostname ที่แสดงผล */
  webhookHost: string
  /** มี Authorization หรือไม่ */
  hasAuth: boolean
  /** URL ที่ใช้งานจริง */
  url: string
  /** timeout ปัจจุบัน (ms) */
  timeoutMs: number
  /** จำนวน retries */
  retries: number
}

/**
 * หน้า Post Creator หลัก
 */
export default function PostCreatorPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()

  // Editor state
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([])
  const [scheduleAt, setScheduleAt] = useState<string>('')

  const [isProcessing, setIsProcessing] = useState(false)
  const [showRiskDialog, setShowRiskDialog] = useState<null | 'save' | 'post'>(null)

  // Posts table
  const [posts, setPosts] = useState<PostItem[]>([])

  // Debounce content สำหรับคำนวณความเสี่ยงให้ไม่ถี่เกินไป
  const debouncedContent = useDebouncedValue(content, 400)

  // กำหนด Risk แบบ Real-time (อ้างอิงค่า debouncedContent)
  const risk = useMemo(() => analyzeRisk(debouncedContent), [debouncedContent])

  /**
   * คอนฟิกแสดงผล: อ่านจาก localStorage + apiService (network config)
   */
  const [configPreview, setConfigPreview] = useState<ConfigPreview>(() => {
    const { url, headers } = getCurrentWebhook()
    const net = getNetworkConfig()
    const effectiveUrl = (net.webhookUrl && net.webhookUrl.trim()) ? net.webhookUrl : url
    let host = ''
    try { host = new URL(effectiveUrl).hostname } catch { host = effectiveUrl || '-' }
    return { webhookHost: host || '-', hasAuth: !!(headers?.Authorization || net.headers?.Authorization), url: effectiveUrl, timeoutMs: net.timeoutMs, retries: net.retries }
  })

  /**
   * สถานะผลทดสอบการเชื่อมต่อ
   */
  const [testing, setTesting] = useState(false)
  const [testText, setTestText] = useState<string>('')
  const [testOk, setTestOk] = useState<boolean | null>(null)

  /** โหลดรายการโพสต์เริ่มต้น */
  useEffect(() => {
    setPosts(postService.getPosts())
  }, [])

  /** อัพเดทตารางโพสต์ในหน้าจอ */
  const refreshPosts = () => {
    setPosts(postService.getPosts())
  }

  /** อัปเดต configPreview อีกครั้ง (อ่านสด) */
  const refreshConfigPreview = useCallback(() => {
    const { url, headers } = getCurrentWebhook()
    const net = getNetworkConfig()
    const effectiveUrl = (net.webhookUrl && net.webhookUrl.trim()) ? net.webhookUrl : url
    let host = ''
    try { host = new URL(effectiveUrl).hostname } catch { host = effectiveUrl || '-' }
    setConfigPreview({ webhookHost: host || '-', hasAuth: !!(headers?.Authorization || net.headers?.Authorization), url: effectiveUrl, timeoutMs: net.timeoutMs, retries: net.retries })
  }, [])

  /**
   * ทดสอบการเชื่อมต่อ webhook ปัจจุบันผ่าน apiService.testConnection()
   */
  const handleTestConnection = async () => {
    setTesting(true)
    setTestOk(null)
    setTestText('กำลังทดสอบ...')
    try {
      const res = await apiService.testConnection()
      setTestOk(res.success)
      setTestText(res.message || (res.success ? 'พร้อมใช้งาน' : 'ล้มเหลว'))
    } catch (e: any) {
      setTestOk(false)
      setTestText(e?.message || 'Network error')
    } finally {
      setTesting(false)
    }
  }

  /**
   * AI: Generate โพสต์
   */
  const handleGenerate = async () => {
    if (isProcessing) return
    setIsProcessing(true)
    try {
      const prompt = buildGeneratePrompt(content)
      const { url, headers } = getCurrentWebhook()
      const res = await triggerWebhook(url, { task: 'generate_post', prompt }, headers)
      const text = parseN8nText(res.bodyText) || 'โพสต์ตัวอย่าง: เพิ่มหัวข้อเพื่อให้ AI สร้างข้อความที่เกี่ยวข้องมากขึ้น'
      setContent(text)
    } catch {
      // fallback
      setContent('โพสต์ตัวอย่าง\n- ข้อเสนอพิเศษสำหรับลูกค้าใหม่\n- อ่านรายละเอียดเพิ่มเติมได้ที่เว็บไซต์\n- สอบถามข้อมูลได้ทางกล่องข้อความ\n#บริการคุณภาพ #เชื่อถือได้')
    } finally {
      setIsProcessing(false)
    }
  }

  /**
   * AI: Rewrite เพื่อลดความเสี่ยง
   */
  const handleRewrite = async () => {
    if (!content.trim() || isProcessing) return
    setIsProcessing(true)
    try {
      const prompt = buildRewritePrompt(content)
      const { url, headers } = getCurrentWebhook()
      const res = await triggerWebhook(url, { task: 'rewrite_post', prompt }, headers)
      const rewritten = parseN8nText(res.bodyText) || content
      setContent(rewritten)
    } catch {
      // ใช้ local fallback (จัดการใน utils/risk อยู่แล้ว)
      setContent(rewrittenLocal(content))
    } finally {
      setIsProcessing(false)
    }
  }

  /**
   * รีไรท์แบบ local fallback (ลดความเสี่ยง) – แยกเป็นฟังก์ชันย่อยเพื่อให้ชัดเจน
   */
  function rewrittenLocal(text: string): string {
    // ใช้คำอธิบายแบบกลาง
    // นำเข้าแบบ dynamic เพื่อลด circular dep. (ตรงนี้เรียกใช้เพียงกรณี fallback)
    const { safeRewriteLocal } = require('@/utils/risk') as typeof import('@/utils/risk')
    return safeRewriteLocal(text)
  }

  /**
   * บันทึกเป็น Draft (มี pop-up เตือนถ้าเสี่ยงสูง)
   */
  const handleSaveDraft = () => {
    if (risk.level >= 4) {
      setShowRiskDialog('save')
      return
    }
    doSaveDraft()
  }

  /**
   * ดำเนินการบันทึกจริง
   */
  const doSaveDraft = () => {
    const item = postService.createOrUpdateDraft({
      content: content.trim(),
      imageUrl: imageUrl.trim() || undefined,
      selectedPageIds,
      risk,
      scheduleAt: scheduleAt || undefined,
    })
    if (item) {
      refreshPosts()
    }
  }

  /**
   * ตั้งเวลาโพสต์ (บันทึกเป็น scheduled)
   */
  const handleSchedule = () => {
    if (!scheduleAt) {
      alert('กรุณาเลือกเวลาโพสต์')
      return
    }
    if (risk.level >= 4) {
      setShowRiskDialog('save')
      return
    }
    const ok = postService.schedulePost({
      content: content.trim(),
      imageUrl: imageUrl.trim() || undefined,
      selectedPageIds,
      risk,
      scheduleAt,
    })
    if (ok) {
      refreshPosts()
      alert('ตั้งเวลาโพสต์สำเร็จ')
    }
  }

  /**
   * โพสต์ทันที (มี pop-up เตือนถ้าเสี่ยงสูง)
   */
  const handlePostNow = () => {
    if (risk.level >= 4) {
      setShowRiskDialog('post')
      return
    }
    doPostNow()
  }

  /**
   * ดำเนินการโพสต์จริง
   */
  const doPostNow = async () => {
    if (isProcessing) return
    setIsProcessing(true)
    try {
      const created = postService.createOrUpdateDraft({
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
        selectedPageIds,
        risk,
      })
      if (!created) throw new Error('ไม่สามารถสร้างโพสต์ได้')
      const result = await postService.postNow(created.id)
      if (result.success) {
        alert('โพสต์สำเร็จ')
      } else {
        alert('การโพสต์บางเพจล้มเหลว โปรดตรวจสอบ token/สิทธิ์')
      }
      refreshPosts()
    } catch (e: any) {
      alert('โพสต์ไม่สำเร็จ: ' + (e?.message || 'unknown'))
    } finally {
      setIsProcessing(false)
    }
  }

  /**
   * โหลดโพสต์ลง editor เพื่อแก้ไข
   */
  const loadToEditor = (id: string) => {
    const p = postService.getPost(id)
    if (!p) return
    setContent(p.content)
    setImageUrl(p.imageUrl || '')
    setSelectedPageIds(p.pages.map(pg => pg.id))
    setScheduleAt(p.scheduleAt || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * ลบโพสต์
   */
  const deletePost = (id: string) => {
    if (!confirm('ต้องการลบโพสต์นี้หรือไม่?')) return
    postService.deletePost(id)
    refreshPosts()
  }

  /**
   * ตรวจงานที่ถึงเวลาแล้ว (จำลอง scheduler เมื่อหน้าเปิด)
   */
  useEffect(() => {
    const run = () => postService.checkDuePosts().then(refreshPosts).catch(() => {})
    const t = setInterval(run, 30000) // ทุก 30 วิ
    run()
    return () => clearInterval(t)
  }, [])

  const cardClass = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <SquarePen className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Post Creator</h1>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>สร้าง/รีไรท์โพสต์ + ตรวจความเสี่ยงแบบเรียลไทม์ + ตั้งเวลาและโพสต์หลายเพจ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-transparent">Realtime Risk Check</Badge>
          </div>
        </div>

        {/* แถบสถานะคอนฟิกปัจจุบัน + ปุ่มลัดไป Settings + ปุ่ม Test */}
        <div className={`mb-6 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'} p-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-xl ${isDark ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                <Link2 className="w-4 h-4" />
                Webhook: {configPreview.webhookHost || '-'}
              </span>
              <span className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-xl ${configPreview.hasAuth 
                ? (isDark ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')
                : (isDark ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200')
              }`}>
                <ShieldCheck className="w-4 h-4" />
                Auth: {configPreview.hasAuth ? 'On' : 'Off'}
              </span>
              <span className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-xl ${isDark ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                Timeout: {Math.round(configPreview.timeoutMs / 1000)}s
              </span>
              <span className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-xl ${isDark ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                Retries: {configPreview.retries}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-transparent" onClick={refreshConfigPreview} title="รีเฟรชคอนฟิก">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="bg-transparent" onClick={handleTestConnection} title="ทดสอบการเชื่อมต่อ" disabled={testing}>
                <Wifi className={`w-4 h-4 mr-2 ${testing ? 'animate-pulse' : ''}`} />
                {testing ? 'กำลังทดสอบ…' : 'ทดสอบการเชื่อมต่อ'}
              </Button>
              <Button variant="outline" className="bg-transparent" onClick={() => navigate('/settings')} title="เปิดหน้า Settings">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {testText && (
            <div className={`mt-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              ผลทดสอบ: 
              <span className={`ml-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border ${
                testOk === true 
                  ? (isDark ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200')
                  : testOk === false
                    ? (isDark ? 'bg-red-500/10 text-red-300 border-red-500/20' : 'bg-red-50 text-red-700 border-red-200')
                    : (isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-gray-50 text-gray-700 border-gray-200')
              }`}>
                {testText}
              </span>
            </div>
          )}
        </div>

        {/* Editor */}
        <Card className={`${cardClass} shadow-lg`}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>เขียนโพสต์</CardTitle>
            <CardDescription>เพิ่มเนื้อหาและรูปภาพ (ถ้ามี) จากนั้นใช้ AI ช่วย Generate/Rewrite</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="content">ข้อความโพสต์</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="พิมพ์เนื้อหาโพสต์ที่นี่..."
                className="min-h-[140px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl" className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Image URL (ไม่บังคับ)</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
              {imageUrl ? (
                <div className="rounded-lg overflow-hidden border border-dashed border-gray-200 dark:border-white/10">
                  <img src={imageUrl} className="object-cover w-full h-40" alt="Preview" />
                </div>
              ) : null}
            </div>

            {/* Risk meter */}
            <RiskMeter risk={risk} isDark={isDark} />

            {/* AI Actions */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleGenerate} disabled={isProcessing}>
                {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                Generate by AI
              </Button>
              <Button variant="outline" className="bg-transparent" onClick={handleRewrite} disabled={isProcessing || !content.trim()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Rewrite (ลดความเสี่ยง)
              </Button>
            </div>

            <Separator />

            {/* Pages + Schedule */}
            <PageSelector
              selectedIds={selectedPageIds}
              onChange={setSelectedPageIds}
              isDark={isDark}
            />

            <SchedulePicker value={scheduleAt} onChange={setScheduleAt} isDark={isDark} />

            {/* Save/Post actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="outline" className="bg-transparent" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                บันทึก Draft
              </Button>
              <Button variant="outline" className="bg-transparent" onClick={handleSchedule}>
                <Calendar className="w-4 h-4 mr-2" />
                ตั้งเวลาโพสต์
              </Button>
              <Button onClick={handlePostNow} disabled={isProcessing || selectedPageIds.length === 0}>
                {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                โพสต์ทันที
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Risk High Dialog */}
        <AlertDialog open={!!showRiskDialog} onOpenChange={(o) => !o && setShowRiskDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                คะแนนความเสี่ยงสูง
              </AlertDialogTitle>
              <AlertDialogDescription>
                เนื้อหานี้มีความเสี่ยงระดับ {risk.level}/5 ({risk.category}). ต้องการให้ AI ช่วยรีไรท์ลดความเสี่ยงก่อนหรือไม่?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent">ยกเลิก</AlertDialogCancel>
              <AlertDialogAction
                className="bg-transparent"
                onClick={() => {
                  handleRewrite()
                  setShowRiskDialog(null)
                }}
              >
                แก้ไขด้วย AI
              </AlertDialogAction>
              <AlertDialogAction
                onClick={() => {
                  if (showRiskDialog === 'save') {
                    doSaveDraft()
                  } else {
                    doPostNow()
                  }
                  setShowRiskDialog(null)
                }}
              >
                โพสต์ต่อ/บันทึกต่อ
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Posts List */}
        <div className="mt-8">
          <Card className={`${cardClass} shadow-lg`}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>โพสต์ที่บันทึก/ตั้งเวลา</CardTitle>
              <CardDescription>แก้ไข/ลบ หรือโพสต์ทันที</CardDescription>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>ยังไม่มีโพสต์</div>
              ) : (
                <div className="space-y-3">
                  {posts.map((p) => (
                    <div key={p.id} className={`rounded-xl border p-4 ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-transparent">
                              {p.status === 'draft' ? 'Draft' : p.status === 'scheduled' ? 'Scheduled' : p.status === 'posted' ? 'Posted' : 'Failed'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(p.updatedAt).toLocaleString('th-TH')}
                            </span>
                          </div>
                          {/* MODIFIED: Add feedback icon and flex container */}
                          <div className="flex items-center gap-2 mt-1">
                            {p.feedback === 'ok' && <ThumbsUp className="w-4 h-4 text-emerald-500 shrink-0" title="Marked as OK" />}
                            {p.feedback === 'flagged' && <Flag className="w-4 h-4 text-red-500 shrink-0" title="Marked as Flagged by FB" />}
                            <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} line-clamp-2`}>{p.content}</div>
                          </div>
                          <div className={`mt-1 text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Risk {p.risk.level}/5 ({p.risk.category}) • เพจ {p.pages.length} เพจ
                            {p.scheduleAt ? ` • เวลาโพสต์: ${new Date(p.scheduleAt).toLocaleString('th-TH')}` : ''}
                          </div>
                          {p.results && p.results.length > 0 && (
                            <div className="mt-1 text-xs">
                              ผลลัพธ์: {p.results.map(r => `${r.pageName}:${r.success ? 'OK' : 'ERR'}`).join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {/* NEW: Feedback Dropdown */}
                          {p.status === 'posted' && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="bg-transparent" title="รายงานผลลัพธ์">
                                  <MessageSquarePlus className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleSetFeedback(p.id, 'ok')}>
                                  <ThumbsUp className="w-4 h-4 mr-2 text-emerald-500" />
                                  <span>Mark as OK</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSetFeedback(p.id, 'flagged')}>
                                  <Flag className="w-4 h-4 mr-2 text-red-500" />
                                  <span>Mark as Flagged by FB</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}

                          {p.status !== 'posted' && (
                            <Button variant="outline" size="icon" className="bg-transparent" onClick={() => loadToEditor(p.id)} title="แก้ไข">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          )}
                          {p.status !== 'posted' && (
                            <Button
                              size="icon"
                              onClick={async () => {
                                await postService.postNow(p.id)
                                refreshPosts()
                              }}
                              title="โพสต์ทันที"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="icon" className="bg-transparent" onClick={() => deletePost(p.id)} title="ลบ">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
