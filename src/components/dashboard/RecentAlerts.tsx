/**
 * RecentAlerts - รายการแจ้งเตือนล่าสุด
 */
import { Notification } from '@/hooks/useNotifications'
import { Bell, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

/**
 * Props ของ RecentAlerts
 */
interface RecentAlertsProps {
  /** รายการการแจ้งเตือน */
  notifications: Notification[]
  /** โหมดสี */
  isDark: boolean
  /** จำนวนที่จะแสดง */
  limit?: number
}

/**
 * คืนค่า Icon ตามประเภท
 */
function iconByType(type: Notification['type']) {
  switch (type) {
    case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'error': return <XCircle className="w-4 h-4 text-red-500" />
    case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    default: return <Info className="w-4 h-4 text-blue-500" />
  }
}

/**
 * ลิสต์แจ้งเตือนล่าสุด
 */
export default function RecentAlerts({ notifications, isDark, limit = 6 }: RecentAlertsProps) {
  const items = notifications.slice(0, limit)

  return (
    <aside className={`rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white'} p-5 shadow-sm`}>
      <h3 className={`mb-3 flex items-center gap-2 text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <Bell className="h-4 w-4" />
        การแจ้งเตือนล่าสุด
      </h3>

      {items.length === 0 ? (
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ยังไม่มีการแจ้งเตือน</div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li key={n.id} className={`rounded-xl border p-3 ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{iconByType(n.type)}</div>
                <div className="min-w-0">
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>{n.title}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>{n.message}</div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{n.timestamp.toLocaleString('th-TH')}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
