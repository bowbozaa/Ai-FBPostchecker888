/** 
 * OnboardingSection - Getting started section (Landing, Steps, FAQ, Contact, Recommendations)
 * Features:
 * - Video tutorial playable in Dialog + button to change YouTube/Vimeo link (saved in localStorage)
 * - Quick and Full PDF guide generation (jsPDF + autotable) with brand-styled header
 * - Lightweight analytics: track key actions (download, video open/change, settings toggles, contact submission, CTAs)
 */

import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/button'
import {
  Download,
  HardDrive,
  UserCheck,
  Rocket,
  HelpCircle,
  Mail,
  Phone,
  Send,
  ArrowRight,
  CheckCircle2,
  BellRing,
  Video,
  History,
  ShieldQuestion,
  PencilLine,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useAnalytics } from '@/hooks/useAnalytics'

/** Minimal Notifications API (optional) matching what Home passes down */
interface NotificationsApi {
  notifications?: Array<any>
  addSuccessNotification?: (title: string, message: string, options?: any) => string
  addErrorNotification?: (title: string, message: string, options?: any) => string
  addInfoNotification?: (title: string, message: string, options?: any) => string
  markAsRead?: (id: string) => void
  clearAll?: () => void
}

/** Props for OnboardingSection */
interface OnboardingSectionProps {
  notifications?: NotificationsApi
  variant?: 'page' | 'modal'
}

/** LocalStorage keys used */
const LS_KEYS = {
  neverAutoOpen: 'onboarding_never_auto_open',
  videoUrl: 'onboarding_video_url',
} as const

/** Default tutorial video */
const DEFAULT_VIDEO_URL = 'https://www.youtube.com/embed/ysz5S6PUM-U'

/** Generate quick PDF guide */
function generateGuidePdf() {
  const doc = new jsPDF()
  const marginX = 14
  let y = 20

  // Branded header
  doc.setFillColor(33, 150, 243)
  doc.rect(0, 0, 210, 20, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('FB Checker - Getting Started (Quick)', marginX, 13)

  doc.setTextColor(0, 0, 0)
  y += 12
  doc.setFontSize(12)
  doc.setFont('Helvetica', 'normal')
  doc.text('ดาวน์โหลด → ติดตั้ง → ลงทะเบียน → เริ่มใช้งานฟีเจอร์หลัก', marginX, y)

  y += 12
  const sections = [
    { title: '1) ดาวน์โหลดโปรแกรม', body: 'ไปที่เว็บไซต์ทางการ เลือกเวอร์ชันที่ตรงกับระบบปฏิบัติการ (Windows/macOS)' },
    { title: '2) ติดตั้งโปรแกรม', body: 'ดับเบิลคลิกไฟล์ติดตั้ง ทำตามขั้นตอนจนเสร็จ และเปิดโปรแกรม' },
    { title: '3) ลงทะเบียน/เข้าสู่ระบบ', body: 'สร้างบัญชีหรือเข้าสู่ระบบเพื่อซิงก์การตั้งค่าและปลดล็อกฟีเจอร์' },
    { title: '4) เริ่มต้นใช้งาน', body: 'แดชบอร์ด, วิเคราะห์คอนเทนต์, แจ้งเตือน, ส่งออก/ตั้งค่า' },
  ]

  sections.forEach((s) => {
    y += 10
    doc.setFont('Helvetica', 'bold')
    doc.text(s.title, marginX, y)
    y += 6
    doc.setFont('Helvetica', 'normal')
    const wrapped = doc.splitTextToSize(s.body, 180)
    doc.text(wrapped, marginX, y)
    y += wrapped.length * 6
  })

  y += 8
  doc.setFont('Helvetica', 'bold')
  doc.text('ติดต่อเรา', marginX, y)
  y += 6
  doc.setFont('Helvetica', 'normal')
  doc.text('อีเมล: support@example.com | โทร: 02-123-4567 (จ.-ศ. 09:00–18:00 น.)', marginX, y)

  doc.save('getting-started-quick.pdf')
}

/** Generate full brand-styled PDF guide */
function generateFullGuidePdf() {
  const doc = new jsPDF()
  const marginX = 14
  let y = 0

  // Brand header
  doc.setFillColor(21, 101, 192)
  doc.rect(0, 0, 210, 24, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('Helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('FB Checker - Full User Guide', marginX, 16)

  doc.setFontSize(11)
  doc.text('Installation • Sign-in • Dashboard • Analyzer • Export • Settings • FAQ', marginX, 22)

  // Content
  y = 34
  doc.setTextColor(0, 0, 0)
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(12)
  doc.text('ภาพรวม', marginX, y)
  y += 7
  const intro =
    'เอกสารฉบับเต็มนี้สรุปการติดตั้ง การตั้งค่าเริ่มต้น วิธีใช้ฟีเจอร์หลัก และการแก้ปัญหาเบื้องต้น เพื่อให้ทีมของคุณเริ่มใช้งานได้อย่างเป็นระบบ'
  const wrapped = doc.splitTextToSize(intro, 180)
  doc.text(wrapped, marginX, y)
  y += wrapped.length * 6 + 6

  doc.setFont('Helvetica', 'bold')
  doc.text('รายการหัวข้อย่อ', marginX, y)
  y += 6

  autoTable(doc, {
    startY: y,
    head: [['หมวด', 'รายละเอียด', 'หมายเหตุ']],
    body: [
      ['ติดตั้ง', 'รองรับ Windows/macOS, แนะนำ RAM ≥ 8GB', 'ตรวจสิทธิ์ระหว่างติดตั้ง'],
      ['เข้าสู่ระบบ', 'ใช้อีเมลที่ลงทะเบียน', 'รองรับ 2FA (อนาคต)'],
      ['แดชบอร์ด', 'สถิติ + การแจ้งเตือน', 'ปรับช่วงเวลาได้'],
      ['การวิเคราะห์', 'ตรวจคำต้องห้าม + ระดับความเสี่ยง', 'แนะนำทางเลือกคำโฆษณา'],
      ['ตั้งค่า', 'บัญชีผู้ใช้ / ระบบ / API', 'ขึ้นกับบทบาท'],
    ],
    styles: { font: 'Helvetica', fontSize: 10 },
    headStyles: { fillColor: [21, 101, 192], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 248, 255] },
    theme: 'grid',
  })

  doc.save('getting-started-full.pdf')
}

/** Validate YouTube/Vimeo URL */
function validateVideoUrl(url: string) {
  const u = url.trim()
  if (!/^https?:\/\//i.test(u)) return false
  return /youtube\.com|youtu\.be|vimeo\.com/i.test(u)
}

/** OnboardingSection Component */
export default function OnboardingSection({ notifications, variant = 'page' }: OnboardingSectionProps) {
  const { theme } = useTheme()
  const { track } = useAnalytics()
  const isDark = theme === 'dark'

  // FAQ
  const faqs = useMemo(
    () => [
      {
        q: 'โปรแกรมนี้รองรับระบบปฏิบัติการอะไรบ้าง?',
        a: 'รองรับ Windows 10/11 และ macOS เวอร์ชันล่าสุด แนะนำ RAM อย่างน้อย 8GB',
      },
      {
        q: 'ต้องเชื่อมต่ออินเทอร์เน็ตตลอดเวลาหรือไม่?',
        a: 'จำเป็นในบางฟีเจอร์ เช่น วิเคราะห์ AI, ซิงก์ข้อมูล, อัปเดตระบบ',
      },
      {
        q: 'เปลี่ยนแผนการใช้งานได้หรือไม่?',
        a: 'ได้ อัปเกรด/ดาวน์เกรดได้ตลอด โดยคำนวณสัดส่วนตามวันที่ใช้งาน',
      },
      {
        q: 'มีคู่มือแบบ PDF ไหม?',
        a: 'มีทั้งฉบับย่อและฉบับเต็ม ดาวน์โหลดได้ในหน้านี้',
      },
      {
        q: 'ติดต่อฝ่ายสนับสนุนอย่างไร?',
        a: 'อีเมล support@example.com หรือโทร 02-123-4567 (จ.-ศ. 09:00–18:00 น.)',
      },
    ],
    []
  )

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  // Video state
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(LS_KEYS.videoUrl) || DEFAULT_VIDEO_URL
    } catch {
      return DEFAULT_VIDEO_URL
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEYS.videoUrl, videoUrl)
    } catch {
      // ignore
    }
  }, [videoUrl])

  /** Submit contact demo + notifications + analytics */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSending(true)
      await new Promise((r) => setTimeout(r, 800))
      setSent(true)
      track('contact_submit_success', { name: form.name, email: form.email })

      const id = notifications?.addSuccessNotification?.(
        'ส่งข้อความสำเร็จ',
        'ทีมงานจะติดต่อกลับทางอีเมลโดยเร็ว',
        { source: 'onboarding:contact' }
      )
      if (id && notifications?.markAsRead) {
        setTimeout(() => notifications.markAsRead?.(id), 6500)
      }
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 6000)
    } catch {
      track('contact_submit_error')
      const id = notifications?.addErrorNotification?.(
        'ส่งข้อความไม่สำเร็จ',
        'กรุณาลองใหม่อีกครั้งภายหลัง',
        { source: 'onboarding:contact' }
      )
      if (id && notifications?.markAsRead) {
        setTimeout(() => notifications.markAsRead?.(id), 6500)
      }
    } finally {
      setSending(false)
    }
  }

  /** Never auto open (long-term) */
  const handleNeverAutoOpen = () => {
    try {
      localStorage.setItem(LS_KEYS.neverAutoOpen, '1')
      track('never_auto_open')
      const id = notifications?.addSuccessNotification?.(
        'บันทึกการตั้งค่าแล้ว',
        'ระบบจะไม่เปิดคู่มืออัตโนมัติอีก',
        { source: 'onboarding:recommendations' }
      )
      if (id && notifications?.markAsRead) {
        setTimeout(() => notifications.markAsRead?.(id), 6500)
      }
    } catch {
      // ignore
    }
  }

  /** Reset never-auto-open setting */
  const handleResetNeverAutoOpen = () => {
    try {
      localStorage.removeItem(LS_KEYS.neverAutoOpen)
      track('reset_never_auto_open')
      const id = notifications?.addInfoNotification?.(
        'ล้างการตั้งค่าแล้ว',
        'ระบบจะเปิดคู่มืออัตโนมัติอีกครั้ง (ครั้งแรกของ session)',
        { source: 'onboarding:recommendations' }
      )
      if (id && notifications?.markAsRead) {
        setTimeout(() => notifications.markAsRead?.(id), 6500)
      }
    } catch {
      // ignore
    }
  }

  /** Change video URL (YouTube/Vimeo) */
  const handleChangeVideoUrl = () => {
    const input = window.prompt('ใส่ลิงก์วิดีโอ YouTube/Vimeo', videoUrl) || ''
    if (!input.trim()) return
    if (!validateVideoUrl(input)) {
      window.alert('ลิงก์ไม่ถูกต้อง (รองรับ YouTube/Vimeo เท่านั้น)')
      return
    }
    // Convert to embed if needed
    let embed = input.trim()
    try {
      const u = new URL(embed)
      const host = u.hostname.toLowerCase()
      if (host.includes('youtube.com')) {
        const v = u.searchParams.get('v')
        if (v) embed = `https://www.youtube.com/embed/${v}`
      } else if (host === 'youtu.be') {
        const id = u.pathname.replace('/', '')
        if (id) embed = `https://www.youtube.com/embed/${id}`
      } else if (host.includes('vimeo.com')) {
        const id = u.pathname.split('/').filter(Boolean)[0]
        if (id) embed = `https://player.vimeo.com/video/${id}`
      }
    } catch {
      // ignore
    }

    setVideoUrl(embed)
    track('video_url_changed', { url: embed })
  }

  const cardBase = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
  const textMuted = isDark ? 'text-gray-300' : 'text-gray-600'
  const heading = isDark ? 'text-white' : 'text-gray-900'
  const sectionBg = isDark ? 'from-slate-900 via-blue-950 to-slate-900' : 'from-blue-50 via-white to-blue-50'

  return (
    <section id={variant === 'page' ? 'onboarding' : undefined} className={`mt-12 bg-gradient-to-br ${sectionBg}`}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* mini-nav */}
        {variant === 'page' && (
          <nav aria-label="เมนูนำทาง" className="mb-6">
            <ul className="flex flex-wrap gap-3 text-sm">
              <li>
                <a
                  href="#landing"
                  className={`${isDark ? 'bg-white/10 text-white' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full hover:opacity-90`}
                >
                  หน้าแรก
                </a>
              </li>
              <li>
                <a
                  href="#how"
                  className={`${isDark ? 'bg-white/5 text-gray-200' : 'bg-slate-100 text-slate-700'} px-3 py-1 rounded-full hover:opacity-90`}
                >
                  วิธีเริ่มต้น
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className={`${isDark ? 'bg-white/5 text-gray-200' : 'bg-slate-100 text-slate-700'} px-3 py-1 rounded-full hover:opacity-90`}
                >
                  คำถามพบบ่อย
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`${isDark ? 'bg-white/5 text-gray-200' : 'bg-slate-100 text-slate-700'} px-3 py-1 rounded-full hover:opacity-90`}
                >
                  ติดต่อเรา
                </a>
              </li>
              <li>
                <a
                  href="#recommendations"
                  className={`${isDark ? 'bg-white/5 text-gray-200' : 'bg-slate-100 text-slate-700'} px-3 py-1 rounded-full hover:opacity-90`}
                >
                  การแนะนำทั้งหมด
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* Landing */}
        <div id="landing" className={`rounded-2xl border ${cardBase} p-6 lg:p-8 mb-10 overflow-hidden`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${heading}`}>เริ่มต้นใช้งานโปรแกรมได้ภายในไม่กี่นาที</h2>
              <p className={`${textMuted} mb-6`}>
                คู่มือนี้ออกแบบมาสำหรับผู้เริ่มต้น ช่วยให้คุณดาวน์โหลด ติดตั้ง ลงทะเบียน และเริ่มใช้งานฟีเจอร์หลักได้อย่างมั่นใจ
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#how">
                  <Button className="gap-2" onClick={() => track('cta_start')}>
                    เริ่มต้นใช้งาน
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="#faq">
                  <Button variant="outline" className="bg-transparent" onClick={() => track('cta_faq')}>
                    คำถามพบบ่อย
                  </Button>
                </a>
                <Button
                  variant="secondary"
                  className="gap-2"
                  onClick={() => {
                    track('download_quick_guide_pdf')
                    generateGuidePdf()
                  }}
                  title="ดาวน์โหลดคู่มือ (PDF) ฉบับย่อ"
                >
                  <Download className="w-4 h-4" />
                  ดาวน์โหลดคู่มือ (PDF)
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-slate-200'} shadow-sm`}>
                <img
                  src="https://pub-cdn.sider.ai/u/U0Z6HZK0J19/web-coder/68742441b1dac45b18d06184/resource/46e5d786-4899-4b1a-82e7-3097df7b8fb5.jpg"
                  className="object-cover w-full h-56 md:h-72"
                  alt="ภาพประกอบการเริ่มต้นใช้งานโปรแกรม"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How to Start */}
        <div id="how" className="mb-10">
          <header className="mb-4">
            <h3 className={`text-xl md:text-2xl font-bold ${heading}`}>วิธีเริ่มต้นใช้งาน</h3>
            <p className={`${textMuted}`}>ทำตาม 4 ขั้นตอนด้านล่างนี้เพื่อเริ่มใช้งานโปรแกรมจริง</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className={`rounded-xl border ${cardBase} p-5`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-semibold ${heading}`}>1) ดาวน์โหลดโปรแกรม</h4>
                  <p className={`${textMuted} text-sm`}>
                    ไปที่หน้าเว็บไซต์ทางการ แล้วกดปุ่ม “ดาวน์โหลด” ให้ตรงกับระบบปฏิบัติการของคุณ (Windows / macOS)
                  </p>
                </div>
              </div>
            </article>

            <article className={`rounded-xl border ${cardBase} p-5`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/15 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-semibold ${heading}`}>2) ติดตั้งโปรแกรม</h4>
                  <p className={`${textMuted} text-sm`}>ดับเบิลคลิกไฟล์ที่ดาวน์โหลด ทำตามขั้นตอนติดตั้งจนเสร็จ และเปิดโปรแกรมขึ้นมา</p>
                </div>
              </div>
            </article>

            <article className={`rounded-xl border ${cardBase} p-5`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-semibold ${heading}`}>3) ลงทะเบียน/เข้าสู่ระบบ</h4>
                  <p className={`${textMuted} text-sm`}>
                    สร้างบัญชีใหม่หรือเข้าสู่ระบบด้วยอีเมลที่ลงทะเบียนไว้ เพื่อซิงก์การตั้งค่าและเปิดใช้ฟีเจอร์ทั้งหมด
                  </p>
                </div>
              </div>
            </article>

            <article className={`rounded-xl border ${cardBase} p-5`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-semibold ${heading}`}>4) เริ่มต้นใช้งานฟีเจอร์หลัก</h4>
                  <p className={`${textMuted} text-sm`}>
                    เริ่มใช้งานฟีเจอร์หลักได้ทันที เช่น วิเคราะห์ โอนถ่ายข้อมูล จัดการผู้ใช้ หรือแดชบอร์ดสถิติ
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="mb-10">
          <header className="mb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              <h3 className={`text-xl md:text-2xl font-bold ${heading}`}>คำถามที่พบบ่อย</h3>
            </div>
            <p className={`${textMuted}`}>รวมคำถามที่มักถูกถามบ่อย เพื่อช่วยให้คุณแก้ปัญหาเบื้องต้นได้ด้วยตัวเอง</p>
          </header>

          <div className={`rounded-2xl border ${cardBase} p-4`}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, idx) => (
                <AccordionItem value={`item-${idx}`} key={idx}>
                  <AccordionTrigger className={`${heading} text-left`}>{f.q}</AccordionTrigger>
                  <AccordionContent className={`${textMuted}`}>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="mb-10">
          <header className="mb-4">
            <h3 className={`text-xl md:text-2xl font-bold ${heading}`}>ติดต่อเรา</h3>
            <p className={`${textMuted}`}>ต้องการความช่วยเหลือเพิ่มเติม? ติดต่อเราได้ทุกเมื่อ</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <aside className={`rounded-2xl border ${cardBase} p-5`}>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className={textMuted}>
                    อีเมล: <span className="font-medium text-blue-600 dark:text-blue-300">support@example.com</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className={textMuted}>โทร: 02-123-4567 (จ.-ศ. 09:00–18:00 น.)</span>
                </div>
                <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <img
                    src="https://pub-cdn.sider.ai/u/U0Z6HZK0J19/web-coder/68742441b1dac45b18d06184/resource/422c452d-7d0c-4298-a1db-e8ab727fef90.jpg"
                    className="object-cover w-full h-32"
                    alt="ภาพทีมสนับสนุนลูกค้า"
                  />
                </div>
              </div>
            </aside>

            <form onSubmit={handleSubmit} className={`lg:col-span-2 rounded-2xl border ${cardBase} p-5`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm mb-1 ${heading}`}>ชื่อ</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-400'
                        : 'bg-white border-slate-300 text-gray-900 placeholder:text-slate-400'
                    }`}
                    placeholder="เช่น กานต์"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm mb-1 ${heading}`}>อีเมล</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-400'
                        : 'bg-white border-slate-300 text-gray-900 placeholder:text-slate-400'
                    }`}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm mb-1 ${heading}`}>ข้อความ</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className={`min-h-[120px] w-full px-3 py-2 rounded-lg border resize-y ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-400'
                        : 'bg-white border-slate-300 text-gray-900 placeholder:text-slate-400'
                    }`}
                    placeholder="พิมพ์ข้อความของคุณที่นี่..."
                    required
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Button type="submit" className="gap-2" disabled={sending}>
                  {sending ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                  <Send className="w-4 h-4" />
                </Button>
                {sent && (
                  <span className={`text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    ส่งข้อความสำเร็จแล้ว ขอบคุณที่ติดต่อเรา
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Recommendations */}
        <div id="recommendations" className="mb-2">
          <header className="mb-4">
            <div className="flex items-center gap-2">
              <ShieldQuestion className={`w-5 h-5 ${heading}`} />
              <h3 className={`text-xl md:text-2xl font-bold ${heading}`}>การแนะนำทั้งหมด</h3>
            </div>
            <p className={`${textMuted}`}>ปรับแต่งประสบการณ์การใช้งานและเข้าถึงเนื้อหาเพิ่มเติมสำหรับผู้เริ่มต้น</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Never auto open */}
            <article className={`lg:col-span-5 rounded-2xl border ${cardBase} p-5`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${heading}`}>การเปิดคู่มืออัตโนมัติ</h4>
                  <p className={`${textMuted} text-sm mb-3`}>
                    ตั้งค่าไม่ให้เปิดคู่มืออัตโนมัติในครั้งถัดไป (long-term) หรือกลับมาใช้ค่าเดิมได้ทุกเมื่อ
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleNeverAutoOpen}
                      variant="secondary"
                      className="gap-2"
                    >
                      <BellRing className="w-4 h-4" />
                      ไม่ต้องเปิดอัตโนมัติอีก
                    </Button>
                    <Button onClick={handleResetNeverAutoOpen} variant="outline" className="bg-transparent">
                      ล้างการตั้งค่า
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Full PDF guide */}
            <article className={`lg:col-span-7 rounded-2xl border ${cardBase} p-5`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  <Download className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${heading}`}>ดาวน์โหลดคู่มือฉบับเต็ม (PDF)</h4>
                  <p className={`${textMuted} text-sm mb-3`}>
                    เอกสารละเอียดพร้อมสารบัญและตารางประกอบ โทนสีตรงแบรนด์ ช่วยให้เริ่มต้นได้อย่างเป็นขั้นเป็นตอน
                  </p>
                  <Button
                    onClick={() => {
                      track('download_full_guide_pdf')
                      generateFullGuidePdf()
                    }}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    ดาวน์โหลดคู่มือฉบับเต็ม
                  </Button>
                </div>
              </div>
            </article>

            {/* Video tutorial (playable) */}
            <article className={`lg:col-span-7 rounded-2xl border ${cardBase} p-5`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="order-2 md:order-1">
                  <h4 className={`font-semibold ${heading} mb-1`}>วิดีโอสอนสั้น (5 นาที)</h4>
                  <p className={`${textMuted} text-sm mb-3`}>ดูวิดีโออธิบายการใช้งานแบบสรุป เข้าใจไว เล่นในหน้าได้ทันที</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      className="gap-2"
                      onClick={() => {
                        setVideoOpen(true)
                        track('video_open', { url: videoUrl })
                      }}
                    >
                      <Video className="w-4 h-4" /> ดูวิดีโอ
                    </Button>
                    <Button variant="outline" className="bg-transparent gap-2" onClick={handleChangeVideoUrl}>
                      <PencilLine className="w-4 h-4" /> เปลี่ยนลิงก์วิดีโอ
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <img
                      src="https://pub-cdn.sider.ai/u/U0Z6HZK0J19/web-coder/68742441b1dac45b18d06184/resource/9f8966f7-b52a-4b5a-8609-7665360ce21a.jpg"
                      className="object-cover w-full h-40"
                      alt="Video intro thumbnail"
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* Update timeline */}
            <article className={`lg:col-span-5 rounded-2xl border ${cardBase} p-5`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/15 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                  <History className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${heading}`}>ไทม์ไลน์การอัปเดต (ตัวอย่าง)</h4>
                  <ul className={`mt-2 space-y-2 text-sm ${textMuted}`}>
                    <li>
                      <span className={`${heading}`}>v2.0</span> — เพิ่มระบบคู่มือแบบ Modal + แจ้งเตือนในแอป
                    </li>
                    <li>
                      <span className={`${heading}`}>v1.9</span> — ปรับปรุงแดชบอร์ด + การแจ้งเตือนแบบ Toast
                    </li>
                    <li>
                      <span className={`${heading}`}>v1.8</span> — เพิ่มการส่งออก PDF/Excel
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Back to top (only page variant) */}
        {variant === 'page' && (
          <div className="mt-8 text-right">
            <a
              href="#onboarding"
              className={`text-sm ${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}
            >
              กลับขึ้นด้านบน
            </a>
          </div>
        )}

        {/* Video Dialog */}
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-[90vw] w-[960px] p-0 overflow-hidden">
            <DialogHeader className="px-4 py-3 border-b">
              <DialogTitle>วิดีโอสอนใช้งาน (5 นาที)</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Intro Video"
              />
            </div>
            <div className="px-4 py-3 text-right">
              <Button variant="outline" className="bg-transparent" onClick={() => setVideoOpen(false)}>
                ปิด
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
