/**
 * Notifications Hook - Enhanced notification management system
 */

import { useState, useCallback, useEffect } from 'react'

/**
 * Interface สำหรับ Notification
 */
export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: Date
  read?: boolean
  postId?: string
  riskLevel?: number
  autoClose?: boolean
  duration?: number
}

/**
 * Interface สำหรับการตั้งค่า Notification
 */
interface NotificationOptions {
  autoClose?: boolean
  duration?: number
  persistent?: boolean
}

/**
 * Enhanced Notifications Hook
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem('fb-checker-notifications')
      const parsed = saved ? JSON.parse(saved) : []
      
      if (Array.isArray(parsed)) {
        return parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }))
      }
      return []
    } catch (error) {
      console.error('Error loading notifications:', error)
      return []
    }
  })

  /**
   * บันทึกการแจ้งเตือนลง localStorage
   */
  const saveNotifications = useCallback((notifs: Notification[]) => {
    try {
      localStorage.setItem('fb-checker-notifications', JSON.stringify(notifs))
    } catch (error) {
      console.error('Error saving notifications:', error)
    }
  }, [])

  /**
   * เพิ่มการแจ้งเตือนใหม่
   */
  const addNotification = useCallback((
    notification: Omit<Notification, 'id' | 'timestamp'>,
    options: NotificationOptions = {}
  ) => {
    const newNotification: Notification = {
      id: Date.now() + Math.random().toString(36),
      timestamp: new Date(),
      read: false,
      autoClose: options.autoClose ?? true,
      duration: options.duration ?? 5000,
      ...notification
    }

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, 50) // เก็บสูงสุด 50 รายการ
      saveNotifications(updated)
      return updated
    })

    // Auto close notification
    if (newNotification.autoClose && !options.persistent) {
      setTimeout(() => {
        markAsRead(newNotification.id)
      }, newNotification.duration)
    }

    return newNotification.id
  }, [])

  /**
   * ทำเครื่องหมายว่าอ่านแล้ว
   */
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
      saveNotifications(updated)
      return updated
    })
  }, [])

  /**
   * ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว
   */
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }))
      saveNotifications(updated)
      return updated
    })
  }, [])

  /**
   * ลบการแจ้งเตือน
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id)
      saveNotifications(updated)
      return updated
    })
  }, [])

  /**
   * ล้างการแจ้งเตือนทั้งหมด
   */
  const clearAll = useCallback(() => {
    setNotifications([])
    localStorage.removeItem('fb-checker-notifications')
  }, [])

  /**
   * ล้างการแจ้งเตือนเก่า (เก่ากว่า 7 วัน)
   */
  const clearOldNotifications = useCallback(() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    setNotifications(prev => {
      const updated = prev.filter(n => n.timestamp > sevenDaysAgo)
      saveNotifications(updated)
      return updated
    })
  }, [])

  /**
   * เพิ่มการแจ้งเตือนสำเร็จ
   */
  const addSuccessNotification = useCallback((title: string, message: string, options?: NotificationOptions) => {
    return addNotification({ title, message, type: 'success' }, options)
  }, [addNotification])

  /**
   * เพิ่มการแจ้งเตือนข้อผิดพลาด
   */
  const addErrorNotification = useCallback((title: string, message: string, options?: NotificationOptions) => {
    return addNotification({ title, message, type: 'error' }, { ...options, persistent: true })
  }, [addNotification])

  /**
   * เพิ่มการแจ้งเตือนคำเตือน
   */
  const addWarningNotification = useCallback((title: string, message: string, options?: NotificationOptions) => {
    return addNotification({ title, message, type: 'warning' }, options)
  }, [addNotification])

  /**
   * เพิ่มการแจ้งเตือนข้อมูล
   */
  const addInfoNotification = useCallback((title: string, message: string, options?: NotificationOptions) => {
    return addNotification({ title, message, type: 'info' }, options)
  }, [addNotification])

  /**
   * ล้างการแจ้งเตือนเก่าอัตโนมัติ
   */
  useEffect(() => {
    const interval = setInterval(() => {
      clearOldNotifications()
    }, 24 * 60 * 60 * 1000) // ทุก 24 ชั่วโมง

    return () => clearInterval(interval)
  }, [clearOldNotifications])

  /**
   * สถิติการแจ้งเตือน
   */
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    today: notifications.filter(n => {
      const today = new Date()
      const notifDate = new Date(n.timestamp)
      return notifDate.toDateString() === today.toDateString()
    }).length,
    byType: {
      success: notifications.filter(n => n.type === 'success').length,
      error: notifications.filter(n => n.type === 'error').length,
      warning: notifications.filter(n => n.type === 'warning').length,
      info: notifications.filter(n => n.type === 'info').length
    }
  }

  return {
    notifications,
    addNotification,
    addSuccessNotification,
    addErrorNotification,
    addWarningNotification,
    addInfoNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    clearOldNotifications,
    stats
  }
}

/**
 * Helper function สำหรับการใช้งานในคอมโพเนนต์
 */
export const createNotification = (
  type: Notification['type'],
  title: string,
  message: string,
  options?: NotificationOptions
): Omit<Notification, 'id' | 'timestamp'> => ({
  type,
  title,
  message,
  read: false,
  autoClose: options?.autoClose ?? true,
  duration: options?.duration ?? 5000,
  ...options
})

export default useNotifications
