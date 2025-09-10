/**
 * Production Monitoring
 */
export const monitoring = {
  // Log errors to external service
  logError: (error: Error, context: string) => {
    console.error(`[${context}]`, error)
    
    // ส่ง error ไปยัง monitoring service
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          context,
          timestamp: new Date().toISOString(),
          url: window.location.href
        })
      }).catch(console.error)
    }
  },
  
  // Track usage
  trackEvent: (event: string, data: any) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(`📊 Event: ${event}`, data)
      // ส่งไปยัง analytics service
    }
  }
}
