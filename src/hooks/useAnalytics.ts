/**
 * useAnalytics - Lightweight client-side analytics stored in localStorage.
 * Purpose: Track simple client events without any external service, and expose
 *          minimal helpers for UI rendering and summary statistics.
 *
 * Exposed API:
 * - events: AnalyticsEvent[] (sorted by timestamp ascending)
 * - track(name, meta?): Record an event with optional metadata
 * - clear(): Remove all recorded events
 * - getStats(): Aggregated stats (total, byName, last)
 *
 * Notes:
 * - Avoids using import.meta.* for maximum bundler compatibility.
 * - Dev-mode detection uses process.env.NODE_ENV with a global fallback.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'

/** Represents a single analytics event payload. */
export interface AnalyticsEvent {
  /** Unique event id */
  id: string
  /** Event name */
  name: string
  /** Timestamp (ms since epoch) */
  ts: number
  /** Optional metadata payload */
  meta?: Record<string, any>
}

/** Aggregated statistics of recorded events. */
export interface AnalyticsStats {
  /** Total number of events */
  total: number
  /** Aggregated counts by event name */
  byName: Record<string, number>
  /** The most recent event (or null if none) */
  last: AnalyticsEvent | null
}

const STORAGE_KEY = 'fb-analytics-events'
const MAX_EVENTS = 500

/**
 * Safely determine if we are in development mode.
 * - Tries process.env.NODE_ENV first (guarded)
 * - Falls back to globalThis.__DEV__ if available
 */
function isDevMode(): boolean {
  try {
    if (
      typeof process !== 'undefined' &&
      (process as any).env &&
      (process as any).env.NODE_ENV === 'development'
    ) {
      return true
    }
  } catch {
    // ignore
  }
  try {
    const g: any =
      typeof globalThis !== 'undefined'
        ? globalThis
        : typeof window !== 'undefined'
          ? window
          : undefined
    if (g && (g.__DEV__ === true || g.__DEV__ === '1')) {
      return true
    }
  } catch {
    // ignore
  }
  return false
}

/**
 * Read events from localStorage safely.
 * @returns Valid AnalyticsEvent array or an empty array on failure.
 */
function readEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr.filter(
      (e) => e && typeof e.name === 'string' && typeof e.ts === 'number'
    )
  } catch {
    return []
  }
}

/**
 * Persist events to localStorage (bounded to MAX_EVENTS).
 * @param events - Events to write.
 */
function writeEvents(events: AnalyticsEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)))
  } catch {
    // ignore
  }
}

/**
 * useAnalytics - Hook สำหรับบันทึก event แบบเบาๆ ใน localStorage
 * - เหมาะสำหรับ telemetry ระดับ UI โดยไม่พึ่งบริการภายนอก
 */
export function useAnalytics() {
  const [events, setEvents] = useState<AnalyticsEvent[]>(() => readEvents())

  /** Sync updates from other tabs/windows via storage event */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setEvents(readEvents())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  /**
   * Record an event with optional metadata
   * @param name - Event name
   * @param meta - Optional metadata object
   */
  const track = useCallback((name: string, meta?: Record<string, any>) => {
    const evt: AnalyticsEvent = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      ts: Date.now(),
      meta,
    }
    setEvents((prev) => {
      const next = [...prev, evt].slice(-MAX_EVENTS)
      writeEvents(next)
      if (isDevMode()) {
        // eslint-disable-next-line no-console
        console.log('[analytics]', evt)
      }
      return next
    })
  }, [])

  /**
   * Clear all recorded events
   */
  const clear = useCallback(() => {
    setEvents([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  /**
   * Compute simple aggregated statistics from current events
   * @returns AnalyticsStats summary
   */
  const getStats = useCallback((): AnalyticsStats => {
    const byName: Record<string, number> = {}
    for (const e of events) {
      byName[e.name] = (byName[e.name] || 0) + 1
    }
    return {
      total: events.length,
      byName,
      last: events[events.length - 1] || null,
    }
  }, [events])

  /** Stable, timestamp-ascending list for easier rendering */
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.ts - b.ts)
  }, [events])

  return {
    events: sortedEvents,
    track,
    clear,
    getStats,
  }
}

export default useAnalytics
