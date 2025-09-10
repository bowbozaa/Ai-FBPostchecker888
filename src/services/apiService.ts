/**
 * apiService.ts
 * บริการเรียกใช้งาน API กลาง: ทดสอบการเชื่อมต่อ n8n, ส่ง payload, วิเคราะห์เนื้อหาแบบ Gray Hat
 * รองรับการตั้งค่า timeout/retries/headers และบันทึก config ชั่วคราวในหน่วยความจำ
 */

import { appConfig } from '../utils/env'

/**
 * โครงสร้างผลลัพธ์การทดสอบ API (สำหรับหน้า Settings)
 */
export interface ApiTestResult {
  /** สำเร็จหรือไม่ */
  ok: boolean
  /** สถานะ HTTP (0 เมื่อล้มเหลวจากเครือข่าย) */
  status: number
  /** ระยะเวลาที่ใช้ (ms) */
  durationMs?: number
  /** ข้อความตอบกลับแบบตัวอักษร (ถ้ามี) */
  bodyText?: string
  /** ข้อความผิดพลาด (ถ้ามี) */
  error?: string
}

/**
 * โครงสร้างการตั้งค่าเครือข่าย
 */
export interface NetworkConfig {
  /** Webhook URL ปัจจุบัน */
  webhookUrl: string
  /** เวลารอสูงสุดต่อครั้ง (ms) */
  timeoutMs: number
  /** จำนวนครั้ง retry เมื่อผิดพลาด (>=0) */
  retries: number
  /** ส่วนหัว HTTP เริ่มต้น */
  headers: Record<string, string>
}

/**
 * ค่าตั้งต้นเครือข่าย
 * - ใช้ webhookUrl จาก appConfig เป็นค่าเริ่มต้น
 */
let networkConfig: NetworkConfig = {
  webhookUrl: appConfig.webhookUrl,
  timeoutMs: Number.isFinite(appConfig.apiTimeout) ? appConfig.apiTimeout : 15000,
  retries: 0,
  headers: {}
}

/**
 * อัพเดทการตั้งค่าเครือข่าย
 */
export function setNetworkConfig(updates: Partial<NetworkConfig>): void {
  networkConfig = {
    ...networkConfig,
    ...updates,
    headers: {
      ...networkConfig.headers,
      ...(updates.headers || {})
    }
  }
}

/**
 * คืนค่าการตั้งค่าเครือข่ายปัจจุบัน
 */
export function getNetworkConfig(): NetworkConfig {
  return { ...networkConfig, headers: { ...networkConfig.headers } }
}

/**
 * ตัวช่วยหน่วงเวลา (ms)
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * ดึงข้อความจาก Response อย่างปลอดภัย
 */
async function safeReadText(res: Response): Promise<string> {
  try {
    return await res.text()
  } catch {
    return ''
  }
}

/**
 * fetch พร้อม timeout และ retry แบบ exponential backoff
 */
async function fetchWithTimeoutAndRetry(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  retries: number
): Promise<Response> {
  let attempt = 0
  let lastErr: any = null

  while (attempt <= retries) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const res = await fetch(url, { ...init, signal: controller.signal })
      clearTimeout(timer)
      return res
    } catch (err) {
      clearTimeout(timer)
      lastErr = err
      attempt += 1
      if (attempt > retries) break
      // exponential backoff: 300ms, 600ms, 1200ms, ...
      const backoff = 300 * Math.pow(2, attempt - 1)
      await delay(backoff)
    }
  }

  throw lastErr || new Error('Network error')
}

/**
 * ทดสอบการเชื่อมต่อไปยัง Webhook แบบระบุ URL (ใช้ในหน้า Settings)
 * - รองรับ method GET/POST
 * - รองรับการส่ง headers เพิ่มเติม
 */
export async function testConnection(
  url: string,
  options?: { method?: 'GET' | 'POST'; headers?: Record<string, string> }
): Promise<ApiTestResult> {
  const started = performance.now()
  const method = options?.method || 'GET'
  const headers = {
    ...(networkConfig.headers || {}),
    ...(options?.headers || {})
  }

  try {
    const res = await fetchWithTimeoutAndRetry(
      url,
      { method, headers },
      networkConfig.timeoutMs,
      networkConfig.retries
    )
    const bodyText = await safeReadText(res)
    return {
      ok: res.ok,
      status: res.status,
      durationMs: Math.round(performance.now() - started),
      bodyText
    }
  } catch (error: any) {
    return {
      ok: false,
      status: 0,
      durationMs: Math.round(performance.now() - started),
      error: error?.message || 'Network error'
    }
  }
}

/**
 * ส่ง Payload ไปยัง Webhook URL แบบระบุ URL (ใช้ในหน้า Settings)
 */
export async function triggerWebhook(
  url: string,
  payload: unknown,
  headers?: Record<string, string>
): Promise<ApiTestResult> {
  const started = performance.now()
  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...(networkConfig.headers || {}),
    ...(headers || {})
  }

  try {
    const res = await fetchWithTimeoutAndRetry(
      url,
      {
        method: 'POST',
        headers: mergedHeaders,
        body: JSON.stringify(payload ?? {})
      },
      networkConfig.timeoutMs,
      networkConfig.retries
    )
    const bodyText = await safeReadText(res)
    return {
      ok: res.ok,
      status: res.status,
      durationMs: Math.round(performance.now() - started),
      bodyText
    }
  } catch (error: any) {
    return {
      ok: false,
      status: 0,
      durationMs: Math.round(performance.now() - started),
      error: error?.message || 'Network error'
    }
  }
}

/**
 * วิเคราะห์เนื้อหาแบบ Gray Hat ผ่าน n8n webhook
 * - ใช้การตั้งค่าจาก networkConfig โดยอัตโนมัติ
 */
async function analyzeGrayHat(payload: any): Promise<any | null> {
  const url = networkConfig.webhookUrl || appConfig.webhookUrl
  const headers = {
    'Content-Type': 'application/json',
    ...(networkConfig.headers || {})
  }

  try {
    const res = await fetchWithTimeoutAndRetry(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...payload,
          analysis_type: 'gray_hat_strategy',
          source: 'react-app',
          timestamp: new Date().toISOString()
        })
      },
      networkConfig.timeoutMs,
      networkConfig.retries
    )

    const text = await res.text()

    // พยายาม parse JSON ถ้าได้ ให้คืนค่า JSON
    try {
      return JSON.parse(text)
    } catch {
      // ถ้า parse ไม่ได้ คืนเป็นข้อความดิบ
      return { raw: text, ok: res.ok, status: res.status }
    }
  } catch (error) {
    console.error('analyzeGrayHat error:', error)
    return null
  }
}

/**
 * อัพเดท config ของ apiService ในรูปแบบย่อ
 * - ใช้ใน DailyAutomationPanel: apiService.updateConfig({ webhookUrl, apiKey })
 * - จะ map apiKey ไปเป็น Authorization header อัตโนมัติถ้าเป็นสตริงไม่ว่าง
 */
function updateConfig(updates: Partial<{ webhookUrl: string; apiKey: string; timeoutMs: number; retries: number; headers: Record<string, string> }>): void {
  const newHeaders: Record<string, string> = { ...(networkConfig.headers || {}) }

  if (typeof updates.apiKey === 'string') {
    if (updates.apiKey.trim().length > 0) {
      newHeaders['Authorization'] = updates.apiKey.trim()
    } else {
      // ถ้าส่งค่าว่างมา ให้ลบ Authorization ออก
      delete newHeaders['Authorization']
    }
  }

  if (updates.headers) {
    Object.assign(newHeaders, updates.headers)
  }

  setNetworkConfig({
    webhookUrl: typeof updates.webhookUrl === 'string' && updates.webhookUrl.trim() ? updates.webhookUrl.trim() : networkConfig.webhookUrl,
    timeoutMs: typeof updates.timeoutMs === 'number' ? updates.timeoutMs : networkConfig.timeoutMs,
    retries: typeof updates.retries === 'number' ? updates.retries : networkConfig.retries,
    headers: newHeaders
  })
}

/**
 * ทดสอบการเชื่อมต่อโดยใช้ค่าใน networkConfig (ใช้ใน DailyAutomationPanel)
 */
async function testConnectionWithConfig(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await testConnection(networkConfig.webhookUrl, { method: 'GET' })
    if (res.ok) {
      return { success: true, message: `HTTP ${res.status}` }
    }
    return { success: false, message: res.error || `HTTP ${res.status}` }
  } catch (error: any) {
    return { success: false, message: error?.message || 'Network error' }
  }
}

/**
 * บริการรวมสำหรับใช้งานในคอมโพเนนต์
 * - มีเมธอดที่หน้าอื่นเรียกใช้: analyzeGrayHat, updateConfig, testConnection
 */
export const apiService = {
  /** วิเคราะห์เนื้อหาแบบ Gray Hat ผ่าน n8n webhook */
  analyzeGrayHat,
  /** อัพเดทการตั้งค่าอย่างย่อ (map apiKey -> Authorization header) */
  updateConfig,
  /** ทดสอบการเชื่อมต่อโดยอิงค่าใน networkConfig */
  testConnection: testConnectionWithConfig
}
