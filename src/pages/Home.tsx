/** 
 * Home page - Dashboard with Onboarding, Analytics, KPIs, Risk Trend, and Tools
 * - Auto-open Onboarding modal on first session (respects "never auto" setting)
 * - LocalStorage-backed tip image replacement/reset
 * - Lightweight analytics tracking for guide modal open (auto/manual)
 */

import { useEffect, useMemo, useState, useRef } from 'react'
import {
  Shield,
  ImagePlus,
  RotateCcw,
  Info,
  Activity,
  AlertTriangle,
  CheckCircle2,
  BellRing,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTheme } from '../hooks/useTheme'
import type { Notification as AppNotification } from '@/hooks/useNotifications'
import KpiCard from '@/components/dashboard/KpiCard'
import RiskTrendCard from '@/components/dashboard/RiskTrendCard'
import RecentAlerts from '@/components/dashboard/RecentAlerts'
import FBPostAnalysisForm from '@/components/analyzer/FBPostAnalysisForm'
import RiskScoreCard from '@/components/dashboard/RiskScoreCard'
import TimeRangeSelector from '@/components/common/TimeRangeSelector'
import OnboardingSection from '@/components/onboarding/OnboardingSection'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAnalytics } from '@/hooks/useAnalytics'

/**
 * Minimal Notifications API shape used in this page
 */
interface NotificationsApi {
  notifications: AppNotification[]
  addSuccessNotification?: (title: string, message: string, options?: any) => string
  addErrorNotification?: (title: string, message: string, options?: any) => string
  addInfoNotification?: (title: string, message: string, options?: any) => string
  markAsRead?: (id: string) => void
  clearAll?: () => void
}

/**
 * Props for HomePage
 */
interface HomePageProps {
  notifications?: NotificationsApi
}

/**
 * Tip image local state schema
 */
interface TipImageState {
  url: string
  updatedAt: string
}

const STORAGE_KEY = 'home-tip-image-state'
const DEFAULT_IMAGE_URL =
  'https://pub-cdn.sider.ai/u/U0Z6HZK0J19/web-coder/68742441b1dac45b18d06184/resource/23f8a5e5-3fcd-46f2-b9f9-aaef8b7b938f.png'

/**
 * Compute average risk within a time range
 */
function averageRisk(notifs: AppNotification[], start: Date, end: Date): number | null {
  const items = notifs.filter((n) => {
    const d = new Date(n.timestamp as any)
    return d >= start && d <= end
  })
  if (items.length === 0) return null
  const levels = items.map((n) => (typeof (n as any).riskLevel === 'number' ? (n as any).riskLevel : 1))
  const avg = levels.reduce((a, b) => a + b, 0) / levels.length
  return avg
}

/**
 * HomePage - Main dashboard with charts, KPIs, tools, and onboarding
 */
export default function HomePage({ notifications }: HomePageProps) {
  const { theme } = useTheme()
  const { track } = useAnalytics()

  // Tip image
  const [image, setImage] = useState<TipImageState>(() => ({
    url: DEFAULT_IMAGE_URL,
    updatedAt: new Date().toLocaleString(),
  }))

  // Time range (days)
  const [days, setDays] = useState<number>(7)

  // Onboarding modal state + auto-open tracking
  const [guideOpen, setGuideOpen] = useState<boolean>(false)
  const autoOpenRef = useRef(false)

  useEffect(() => {
    try {
      const neverAuto = localStorage.getItem('onboarding_never_auto_open') === '1'
      if (neverAuto) return
      const seen = sessionStorage.getItem('onboarding_seen')
      if (!seen) {
        autoOpenRef.current = true
        setGuideOpen(true)
        sessionStorage.setItem('onboarding_seen', '1')
        // track auto
        track('guide_modal_open', { source: 'auto' })
      }
    } catch {
      // ignore
    }
  }, [track])

  /**
   * Track guide open when opened manually via onOpenChange
   */
  const handleGuideOpenChange = (open: boolean) => {
    setGuideOpen(open)
    if (open) {
      if (autoOpenRef.current) {
        // consume auto flag once
        autoOpenRef.current = false
      } else {
        track('guide_modal_open', { source: 'manual' })
      }
    }
  }

  // Responsive measures
  const [vw, setVw] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Load/save tip image state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as TipImageState
        if (parsed?.url) setImage(parsed)
      }
    } catch {
      // ignore
    }
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(image))
    } catch {
      // ignore
    }
  }, [image])

  // Handlers for image replacement/reset
  const handleReplaceImage = () => {
    const url = window.prompt('วางลิงก์รูปภาพ (ต้องเป็น URL แบบ https://)', image.url) || ''
    if (!url.trim()) return
    const isValid = /^https?:\/\//i.test(url.trim())
    if (!isValid) {
      window.alert('รูปแบบลิงก์ไม่ถูกต้อง กรุณาใช้ลิงก์ที่ขึ้นต้นด้วย http(s)://')
      return
    }
    setImage({
      url: url.trim(),
      updatedAt: new Date().toLocaleString(),
    })
  }
  const handleResetImage = () => {
    if (!window.confirm('ต้องการรีเซ็ตรูปภาพกลับค่าเริ่มต้นหรือไม่?')) return
    setImage({
      url: DEFAULT_IMAGE_URL,
      updatedAt: new Date().toLocaleString(),
    })
  }

  // Theme + background
  const isDark = theme === 'dark'
  const pageBg = isDark
    ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'
    : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'

  // KPI calculation
  const notifList: AppNotification[] = notifications?.notifications || []
  const kpis = useMemo(() => {
    const total = notifList.length
    const unread = notifList.filter((n: any) => !n.read).length
    const high = notifList.filter((n: any) => ((n as any).riskLevel ?? 0) >= 4).length
    const today = notifList.filter((n: any) => {
      const d = new Date((n as any).timestamp)
      const t = new Date()
      return d.toDateString() === t.toDateString()
    }).length
    return { total, unread, high, today }
  }, [notifList])

  // Delta info for footer of gauge
  const deltaInfo = useMemo(() => {
    const now = new Date()
    const curStart = new Date()
    curStart.setDate(now.getDate() - (days - 1))
    curStart.setHours(0, 0, 0, 0)
    const curEnd = new Date(now)

    const prevEnd = new Date(curStart)
    prevEnd.setDate(prevEnd.getDate() - 1)
    prevEnd.setHours(23, 59, 59, 999)

    const prevStart = new Date(prevEnd)
    prevStart.setDate(prevStart.getDate() - (days - 1))
    prevStart.setHours(0, 0, 0, 0)

    const curAvg = averageRisk(notifList as any, curStart, curEnd)
    const prevAvg = averageRisk(notifList as any, prevStart, prevEnd)

    if (curAvg == null || prevAvg == null || prevAvg === 0) {
      return { label: '—', changePct: null as number | null, direction: 'flat' as 'up' | 'down' | 'flat' }
    }

    const change = ((curAvg - prevAvg) / prevAvg) * 100
    const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'flat'
    return { label: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`, changePct: change, direction }
  }, [notifList, days])

  // Sizes
  const gaugeSize = useMemo(() => {
    if (vw >= 1280) return 200
    if (vw >= 1024) return 180
    if (vw >= 768) return 160
    return 150
  }, [vw])

  const chartHeight = useMemo(() => {
    if (vw >= 1280) return 420
    if (vw >= 1024) return 380
    if (vw >= 768) return 340
    return 300
  }, [vw])

  // Footer element for RiskScoreCard
  const riskFooter = (
    <div className="flex items-center justify-between text-xs">
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${
          deltaInfo.direction === 'up'
            ? isDark
              ? 'bg-red-500/10 text-red-300 border border-red-500/20'
              : 'bg-red-50 text-red-700 border border-red-200'
            : deltaInfo.direction === 'down'
              ? isDark
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : isDark
                ? 'bg-slate-500/10 text-slate-300 border border-slate-500/20'
                : 'bg-slate-50 text-slate-700 border border-slate-200'
        }`}
      >
        {deltaInfo.direction === 'up' ? (
          <TrendingUp className="w-3.5 h-3.5" />
        ) : deltaInfo.direction === 'down' ? (
          <TrendingDown className="w-3.5 h-3.5" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-current inline-block" />
        )}
        <span>เปลี่ยนแปลง: {deltaInfo.changePct == null ? 'N/A' : deltaInfo.label} vs prev</span>
      </div>
      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
        วันนี้ (High): {(notifList as any).filter(
          (n: any) =>
            ((n as any).riskLevel ?? 0) >= 4 &&
            new Date((n as any).timestamp).toDateString() === new Date().toDateString()
        ).length}
      </div>
    </div>
  )

  return (
    <div className={`${pageBg} min-h-[calc(100vh-64px)]`}>
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}
              aria-hidden
            >
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                ภาพรวมความเสี่ยง + เครื่องมือวิเคราะห์โพสต์ Facebook
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a href="#onboarding">
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => track('cta_open_onboarding_anchor')}
              >
                คู่มือเริ่มต้น
              </Button>
            </a>

            <Dialog open={guideOpen} onOpenChange={handleGuideOpenChange}>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                  เปิดคู่มือเต็มจอ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] h-[90vh] p-0 overflow-hidden">
                <DialogHeader className="sr-only">
                  <DialogTitle>คู่มือเริ่มต้นใช้งาน</DialogTitle>
                </DialogHeader>
                <div className="h-full overflow-y-auto">
                  <OnboardingSection notifications={notifications} variant="modal" />
                </div>
              </DialogContent>
            </Dialog>

            <div className="ml-2">
              <TimeRangeSelector value={days} onChange={setDays} isDark={isDark} />
            </div>
          </div>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 h-[380px] md:h-[420px] xl:h-[480px]">
            <RiskTrendCard notifications={notifList} isDark={isDark} days={days} chartHeight={chartHeight} />
          </div>
          <div className="lg:col-span-1 h-[380px] md:h-[420px] xl:h-[480px]">
            <RiskScoreCard
              notifications={notifList}
              isDark={isDark}
              days={days}
              gaugeSize={gaugeSize}
              footerExtra={riskFooter}
            />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            title="การแจ้งเตือนทั้งหมด"
            value={(kpis as any).total}
            icon={<Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            description="รวมทุกประเภท"
            toneClass={isDark ? 'bg-white/5 border-white/10' : 'bg-white'}
          />
          <KpiCard
            title="ยังไม่อ่าน"
            value={(kpis as any).unread}
            icon={<BellRing className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            description="การแจ้งเตือนใหม่"
            toneClass={isDark ? 'bg-white/5 border-white/10' : 'bg-white'}
          />
          <KpiCard
            title="ความเสี่ยงสูง"
            value={(kpis as any).high}
            icon={<AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />}
            description="ระดับ 4-5"
            toneClass={isDark ? 'bg-white/5 border-white/10' : 'bg-white'}
          />
          <KpiCard
            title="วันนี้"
            value={(kpis as any).today}
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            description="แจ้งเตือนที่เกิดวันนี้"
            toneClass={isDark ? 'bg-white/5 border-white/10' : 'bg-white'}
          />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tips image */}
          <section
            className={`h-[360px] rounded-2xl border ${
              isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white'
            } shadow-sm flex flex-col overflow-hidden`}
            aria-label="เคล็ดลับการลดความเสี่ยง"
          >
            <header className="flex items-start justify-between gap-4 p-5">
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  เคล็ดลับการลดความเสี่ยง
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  หลีกเลี่ยงคำที่ส่อการพนัน/โปรโมชันแรง และใช้ถ้อยคำกลางแทน
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={handleReplaceImage}
                  title="แทนที่รูปภาพ"
                >
                  <ImagePlus className="mr-2 h-4 w-4" /> แทนที่รูปภาพ
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={handleResetImage}
                  title="รีเซ็ตรูปภาพ"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> รีเซ็ต
                </Button>
              </div>
            </header>

            <div className="px-5 pb-5 flex-1 min-h-0">
              <div
                className={`h-full rounded-xl border ${
                  isDark ? 'border-slate-700 bg-slate-950/50' : 'border-slate-200 bg-slate-50'
                } p-2`}
              >
                <div className="relative overflow-hidden rounded-lg h-full">
                  <img src={image.url} alt="Data Analytics tips" className="object-cover h-full w-full" />
                  <div
                    className={`pointer-events-none absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs ${
                      isDark ? 'bg-slate-900/70 text-gray-300' : 'bg-white/70 text-gray-700'
                    } backdrop-blur`}
                  >
                    อัปเดต: {image.updatedAt}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tools & Insights */}
          <section
            className={`rounded-2xl border ${
              isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white'
            } shadow-sm p-5`}
            aria-label="Tools &amp; Insights"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Tools &amp; Insights
              </h3>
            </div>

            <Tabs defaultValue="analyze" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="analyze">Analyze</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
              </TabsList>

              <div className="mt-3">
                <div className="w-full">
                  <TabsContent value="analyze" className="m-0">
                    <FBPostAnalysisForm notifications={notifications} frameless />
                  </TabsContent>

                  <TabsContent value="alerts" className="m-0">
                    <RecentAlerts notifications={notifList} isDark={isDark} limit={6} />
                  </TabsContent>

                  <TabsContent value="tips" className="m-0">
                    <aside
                      className={`rounded-2xl border ${
                        isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white'
                      } p-5 shadow-sm`}
                    >
                      <h3
                        className={`mb-3 flex items-center gap-2 text-base font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        <Info className="h-4 w-4" /> Quick Tips
                      </h3>
                      <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• เลี่ยงคำต้องห้าม เช่น แทงบอล, หวย, เครดิตฟรี</li>
                        <li>• แทนคำโปรโมชันแรง ด้วย “ข้อเสนอพิเศษ” หรือ “สิทธิประโยชน์”</li>
                        <li>• เพิ่มคำชี้แจงเงื่อนไข และลิงก์ข้อมูลอ้างอิง</li>
                        <li>• ใช้ภาพกลาง/นามธรรม ลดสื่อความหมายที่อ่อนไหว</li>
                        <li>• ตรวจสอบก่อนโพสต์ด้วยเครื่องมือวิเคราะห์ในระบบ</li>
                      </ul>
                    </aside>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </section>
        </div>

        {/* Onboarding (page) */}
        <div className="mt-10" id="onboarding">
          <OnboardingSection notifications={notifications} />
        </div>
      </div>
    </div>
  )
}
