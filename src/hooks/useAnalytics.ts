/**
 * useAnalytics.ts
 * Lightweight client-side analytics hook. Stores events in localStorage and exposes helpers:
 * - track(name, meta?): record an event
 * - events: chronologically sorted events for UI
 * - clear(): clear all events
 * - getStats(): totals and frequency by event name
 *
 * Notes:
 * - Designed to be safe in environments without full globals; all storage I/O is wrapped by try/catch.
 * - Avoids import.meta and HTML-escaped tokens that may break esbuild parsing.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'

/** Event payload structure kept in a compact form for localStorage. */
export interface AnalyticsEvent {
  /** Unique id for the event */
  id: string
  /** The event name, used to aggregate in getStats() */
  name: string
  /** Unix millis timestamp */
  ts: number
  /** Optional metadata payload */
  meta?: Record<string, any>
}

/** Aggregated stats returned by getStats(). */
export interface AnalyticsStats {
  /** Total events stored */
  total: number
  /** Event counts grouped by name */
  byName: Record<string, number>
  /** The last event recorded or null if none */
  last: AnalyticsEvent | null
}

const STORAGE_KEY = 'fb-analytics-events'
const MAX_EVENTS = 500

/**
 * Detects whether we are in development mode without relying on import.meta.env
 * or other bundler-specific variables.
 */
function isDevMode(): boolean {
  try {
    // Typical Node env injection in many bundlers
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
    // Optional global flags
    const g: any =
      typeof globalThis !== 'undefined'
        ? globalThis
        : typeof window !== 'undefined'
          ? (window as any)
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
 * Read events from localStorage.
 * Returns an empty array on any error or malformed content.
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
 * Persist a capped list of events to localStorage.
 */
function writeEvents(events: AnalyticsEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)))
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
}

/**
 * useAnalytics
 * React hook to track lightweight client-side events for UX instrumentation.
 * Returns stable helpers and a sorted list of events for rendering.
 */
export function useAnalytics() {
  // Initialize from storage once
  const [events, setEvents] = useState<AnalyticsEvent[]>(() => readEvents())

  /**
   * Keep this tab in sync if other tabs/windows modify the same storage key.
   */
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
   * Track a new event with optional metadata.
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
   * Clear all events and storage record.
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
   * Compute aggregated stats on demand.
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

  /**
   * Return events sorted by timestamp ascending for timeline-style UIs.
   */
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