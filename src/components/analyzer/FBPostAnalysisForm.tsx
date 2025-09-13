/**
 * FBPostAnalysisForm - ฟอร์มสำหรับกรอกและวิเคราะห์โพสต์จาก Facebook
 * - อัปเกรดให้ใช้ `analyzeRisk` จาก `utils/risk` เพื่อการวิเคราะห์ที่สอดคล้องกันทั้งระบบ
 */

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Play, SendHorizonal, RefreshCw, Image as ImageIcon, Link2, Video, AlertTriangle, CheckCircle2, Loader2, Wifi, ShieldCheck } from 'lucide-react'
import { triggerWebhook, testConnection } from '@/services/apiService'
import { systemConfig } from '@/utils/configHelper'
import { analyzeRisk } from '@/utils/risk' // <-- 1. Import engine วิเคราะห์ตัวใหม่

/**
 * โครงสร้าง Notifications API ที่ใช้ (ย่อ)
 */
interface NotificationsApi {
  addSuccessNotification?: (title: string, message: string, options?: any) => string
  addErrorNotification?: (title: string, message: string, options?: any) => string
  addInfoNotification?: (title: string, message: string, options?: any) => string
}

/**
 * Props ของฟอร์ม
 */
interface FBPostAnalysisFormProps {
  notifications?: NotificationsApi
  frameless?: boolean
}

/**
 * ตรวจสอบ URL อย่างง่าย
 */
function isValidUrl(url: string): boolean {
  if (!url) return false
  try {
    const u = new URL(url)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * ดึง webhook/headers ที่ใช้งานล่าสุด
 */
function getCurrentWebhook(): { url: string; headers?: Record<string, string>; host: string; hasAuth: boolean } {
  try {
    const raw = localStorage.getItem('fbpostshield_config')
    if (raw) {
      const cfg = JSON.parse(raw) as { webhookUrl?: string; authHeader?: string }
      const url = (cfg.webhookUrl && cfg.webhookUrl.trim()) ? cfg.webhookUrl.trim() : systemConfig.n8n.webhookUrl
      const headers = cfg.authHeader && cfg.authHeader.trim() ? { Authorization: cfg.authHeader.trim() } : undefined
      let host = ''
      try { host = new URL(url).hostname } catch { host = url || '-' }
      return { url, headers, host, hasAuth: !!headers?.Authorization }
    }
  } catch {}
  const url = systemConfig.n8n.webhookUrl
  let host = ''
  try { host = new URL(url).hostname } catch { host = url || '-' }
  return { url, host, hasAuth: false }
}

/**
 * คอมโพเนนต์หลัก - ฟอร์มวิเคราะห์โพสต์ Facebook
 */
export default function FBPostAnalysisForm({ notifications, frameless }: FBPostAnalysisFormProps) {
  const [content, setContent] = useState('')
  const [keywordsText, setKeywordsText] = useState('')
  const [link, setLink] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastHttpStatus, setLastHttpStatus] = useState<number | null>(null)
  const [lastBody, setLastBody] = useState<string | null>(null)
  const [errorText, setErrorText] = useState<string | null>(null)

  const [testing, setTesting] = useState(false)
  const [testOk, setTestOk] = useState<boolean | null>(null)
  const [testText, setTestText] = useState<string>('')

  const linkInvalid = !!link && !isValidUrl(link)
  const imgInvalid = !!imageUrl && !isValidUrl(imageUrl)
  const vidInvalid = !!videoUrl && !isValidUrl(videoUrl)

  const youtubeEmbed = useMemo(() => {
    if (!videoUrl) return null
    try {
      const u = new URL(videoUrl)
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v')
        if (v) return `https://www.youtube.com/embed/${v}`
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.slice(1)
        if (id) return `https://www.youtube.com/embed/${id}`
      }
      return null
    } catch {
      return null
    }
  }, [videoUrl])

  // --- 2. อัปเกรดการวิเคราะห์เบื้องต้นให้ใช้ engine ตัวใหม่ ---
  const localResult = useMemo(() => {
    const combinedText = `${content} ${keywordsText}`
    return analyzeRisk(combinedText)
  }, [content, keywordsText])

  const handleSend = async () => {
    setIsSubmitting(true)
    setErrorText(null)
    setLastBody(null)
    setLastHttpStatus(null)

    try {
      if (!content.trim()) {
        throw new Error('กรุณากรอกเนื้อหาโพสต์ (Content)')
      }
      if (linkInvalid || imgInvalid || vidInvalid) {
        throw new Error('ตรวจพบลิงก์ไม่ถูกต้อง กรุณาตรวจสอบ Link/Image/Video URL')
      }

      const payload = {
        post_content: content.trim(),
        keywords: keywordsText.split(/[\s,]+/).filter(Boolean),
        link: link.trim() || undefined,
        image_url: imageUrl.trim() || undefined,
        video_url: videoUrl.trim() || undefined,
        analysis_hint: 'fb_post_analysis',
        source: 'dashboard_manual',
        checked_time: new Date().toISOString()
      }

      const { url, headers } = getCurrentWebhook()
      const res = await triggerWebhook(url, payload, headers)

      setLastHttpStatus(res.status)
      setLastBody(res.bodyText ?? null)

      if (res.ok) {
        notifications?.addSuccessNotification?.('ส่งไป n8n สำเร็จ', `HTTP ${res.status}`)
      } else {
        notifications?.addErrorNotification?.('ส่งไป n8n ไม่สำเร็จ', res.error || `HTTP ${res.status}`)
      }
    } catch (err: any) {
      const msg = err?.message || 'ส่งข้อมูลล้มเหลว'
      setErrorText(msg)
      notifications?.addErrorNotification?.('เกิดข้อผิดพลาด', msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setContent('')
    setKeywordsText('')
    setLink('')
    setImageUrl('')
    setVideoUrl('')
    setLastHttpStatus(null)
    setLastBody(null)
    setErrorText(null)
    setTestOk(null)
    setTestText('')
    setTesting(false)
  }

  const handleQuickTest = async () => {
    const { url, headers, host } = getCurrentWebhook()
    if (!url.trim()) {
      setTestOk(false)
      setTestText('ยังไม่ได้ตั้งค่า Webhook URL')
      return
    }
    setTesting(true)
    setTestOk(null)
    setTestText(`กำลังทดสอบกับ ${host || url}...`)
    try {
      const res = await testConnection(url, { method: 'GET', headers })
      setTestOk(res.ok)
      setTestText(res.ok ? `สำเร็จ (HTTP ${res.status})` : `ล้มเหลว (${res.status || 'ERR'}) ${res.error ? ' — ' + res.error : ''}`)
    } catch (e: any) {
      setTestOk(false)
      setTestText('ล้มเหลว — ' + (e?.message || 'Network error'))
    } finally {
      setTesting(false)
    }
  }

  const cardClass = frameless
    ? 'border-0 shadow-none bg-transparent p-0'
    : 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900/60 backdrop-blur'

  const { host, hasAuth } = getCurrentWebhook()

  return (
    <Card className={cardClass}>
      <CardHeader className={frameless ? 'p-0 mb-2' : undefined}>
        <CardTitle className="flex items-center gap-2">
          การวิเคราะห์โพสต์ Facebook
        </CardTitle>
        {!frameless && <CardDescription>กรอกข้อมูลโพสต์เพื่อวิเคราะห์/ส่งต่อไป n8n</CardDescription>}
      </CardHeader>
      <CardContent className={frameless ? 'p-0 grid gap-3' : 'grid gap-4'}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20">
              <Link2 className="w-3.5 h-3.5" />
              Webhook: {host || '-'}
            </span>
            <span className={`inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-xl ${hasAuth
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20'
              : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              Auth: {hasAuth ? 'On' : 'Off'}
            </span>
            {testOk === true && (
              <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
                ✓ พร้อมใช้งาน
              </span>
            )}
            {testOk === false && (
              <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-xl bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20">
                ✗ ทดสอบล้มเหลว
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-transparent" onClick={handleQuickTest} disabled={testing} title="ทดสอบการเชื่อมต่อ">
              {testing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Wifi className="w-4 h-4 mr-2" />}
              {testing ? 'กำลังทดสอบ…' : 'ทดสอบการเชื่อมต่อ'}
            </Button>
          </div>
        </div>
        {testText && (
          <div className="text-xs text-gray-600 dark:text-gray-300">{testText}</div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="fb-content">Content</Label>
          <Textarea
            id="fb-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="วางเนื้อหาโพสต์ที่นี่..."
            className="min-h-[96px]"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fb-keywords">Keywords (คั่นด้วย , หรือเว้นวรรค)</Label>
          <Input
            id="fb-keywords"
            value={keywordsText}
            onChange={(e) => setKeywordsText(e.target.value)}
            placeholder="เช่น แทงบอล, เครดิตฟรี, โปรโมชั่น"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fb-link" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" /> Link (โพสต์/เพจ/เว็บ)
          </Label>
          <Input
            id="fb-link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
          />
          {link && (
            <div className={`text-xs ${linkInvalid ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>
              {linkInvalid ? 'ลิงก์ไม่ถูกต้อง' : 'ลิงก์ถูกต้อง'}
            </div>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fb-image" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Image URL
          </Label>
          <Input
            id="fb-image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
          <div className="rounded-lg overflow-hidden border border-dashed border-gray-200 dark:border-gray-800">
            <img
              src={imageUrl || 'https://pub-cdn.sider.ai/u/U0Z6HZK0J19/web-coder/68742441b1dac45b18d06184/resource/a1c706d5-a3d0-4605-991c-4194b0652767.jpg'}
              className="object-cover w-full h-32"
              alt="Post preview"
            />
          </div>
          {imgInvalid && <div className="text-xs text-red-600 dark:text-red-400">รูปแบบ URL ไม่ถูกต้อง</div>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fb-video" className="flex items-center gap-2">
            <Video className="w-4 h-4" /> Video URL
          </Label>
          <Input
            id="fb-video"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=xxxxxx หรือ https://youtu.be/xxxxxx"
          />
          {youtubeEmbed ? (
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
              <iframe
                src={youtubeEmbed}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <div className={`text-xs ${vidInvalid ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {videoUrl
                ? (vidInvalid ? 'วิดีโอ URL ไม่ถูกต้อง' : 'พรีวิวแสดงเฉพาะ YouTube URL เท่านั้น')
                : 'ใส่ลิงก์วิดีโอถ้ามี (รองรับพรีวิว YouTube)'}
            </div>
          )}
        </div>

        {!frameless && <Separator />}

        {/* --- 3. อัปเดตส่วนแสดงผลให้ตรงกับโครงสร้าง RiskResult ใหม่ --- */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-slate-900/40">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-gray-700 dark:text-gray-200 font-medium">
              วิเคราะห์เบื้องต้น (ออฟไลน์)
            </div>
            <div className="text-xs">
              <span className={`px-2 py-1 rounded-full border ${ 
                localResult.level >= 4
                  ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300'
                  : localResult.level === 3
                    ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300'
                    : 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300'
              }`}>
                Risk {localResult.level}/5 • {localResult.category}
              </span>
            </div>
          </div>
          <div className="text-xs mt-2 text-gray-700 dark:text-gray-300">
            กฎที่ตรงกัน: {localResult.keywordsDetected.length > 0 ? localResult.keywordsDetected.join(', ') : '-'}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => {
              notifications?.addInfoNotification?.('ผลวิเคราะห์เบื้องต้น', `ความเสี่ยงระดับ ${localResult.level}/5 (${localResult.category})`)
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            วิเคราะห์เบื้องต้น
          </Button>

          <Button onClick={handleSend} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <SendHorizonal className="w-4 h-4 mr-2" />}
            ส่งไป n8n
          </Button>

          <Button variant="outline" className="bg-transparent" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            รีเซ็ต
          </Button>
        </div>

        {(lastHttpStatus !== null || errorText) && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {errorText ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
                <div className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                  {errorText ? 'ไม่สำเร็จ' : 'ส่งสำเร็จ'}
                </div>
              </div>
              {!errorText && lastHttpStatus !== null && (
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  HTTP {lastHttpStatus}
                </div>
              )}
            </div>
            {errorText && (
              <div className="text-xs text-red-600 dark:text-red-400 mt-2">{errorText}</div>
            )}
            {lastBody && (
              <pre className="mt-2 text-xs whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
                {lastBody}
              </pre>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}