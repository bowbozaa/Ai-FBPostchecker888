/** 
 * risk.ts - ยูทิลสำหรับวิเคราะห์ความเสี่ยงข้อความ และรีไรท์แบบ local
 * - เพิ่มระบบ "คำต้องห้าม" แบบไดนามิก (อ่าน/เขียนจาก localStorage)
 */

 /** ผลลัพธ์ความเสี่ยง */
export interface RiskResult {
  /** ระดับ 1-5 */
  level: number
  /** หมวดหมู่ */
  category: string
  /** คำที่ตรวจพบ */
  keywordsDetected: string[]
}

/** คีย์เก็บใน localStorage */
const LS_FORBIDDEN = 'fbps_forbidden_keywords'

/** ชุดคำต้องห้ามพื้นฐาน (ค่าเริ่มต้น) */
export const DEFAULT_FORBIDDEN: string[] = [
  'แทงบอล','คาสิโน','บาคาร่า','สล็อต','หวย','เดิมพัน',
  'ได้เงินจริง','เครดิตฟรี','รวยเร็ว','การันตี','ได้ชัวร์',
  'โปรแรง','ค่าน้ำดีที่สุด','แทงบอลออนไลน์','เว็บตรง'
]

/**
 * อ่านรายการคำต้องห้ามจาก localStorage
 */
export function getForbiddenKeywords(): string[] {
  try {
    const raw = localStorage.getItem(LS_FORBIDDEN)
    if (!raw) return [...DEFAULT_FORBIDDEN]
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return [...DEFAULT_FORBIDDEN]
    // ทำความสะอาดข้อมูล: trim และกรองค่าว่าง, unique
    const cleaned = Array.from(
      new Set(
        arr
          .map((s) => (typeof s === 'string' ? s.trim() : ''))
          .filter((s) => s.length > 0)
      )
    )
    return cleaned.length > 0 ? cleaned : [...DEFAULT_FORBIDDEN]
  } catch {
    return [...DEFAULT_FORBIDDEN]
  }
}

/**
 * บันทึกรายการคำต้องห้ามลง localStorage
 */
export function setForbiddenKeywords(list: string[]): void {
  const cleaned = Array.from(
    new Set(
      (list || [])
        .map((s) => (typeof s === 'string' ? s.trim() : ''))
        .filter((s) => s.length > 0)
    )
  )
  localStorage.setItem(LS_FORBIDDEN, JSON.stringify(cleaned))
}

/**
 * เพิ่มคำต้องห้าม 1 คำ
 */
export function addForbiddenKeyword(word: string): void {
  const w = (word || '').trim()
  if (!w) return
  const cur = getForbiddenKeywords()
  if (!cur.includes(w)) {
    cur.push(w)
    setForbiddenKeywords(cur)
  }
}

/**
 * รีเซ็ตคำต้องห้ามกลับค่าเริ่มต้น
 */
export function resetForbiddenKeywords(): void {
  localStorage.setItem(LS_FORBIDDEN, JSON.stringify(DEFAULT_FORBIDDEN))
}

/**
 * วิเคราะห์ความเสี่ยงแบบออฟไลน์จากข้อความ
 * - ใช้ "คำต้องห้าม" จาก localStorage แบบล่าสุดทุกครั้ง
 */
export function analyzeRisk(text: string): RiskResult {
  const content = (text || '').toLowerCase()
  const forbidden = getForbiddenKeywords()
  const found = forbidden.filter(k => content.includes(k.toLowerCase()))

  let level = 1
  if (found.length >= 5) level = 5
  else if (found.length >= 3) level = 4
  else if (found.length >= 2) level = 3
  else if (found.length >= 1) level = 2

  const category =
    found.some((f) => ['แทงบอล','แทงบอลออนไลน์'].includes(f)) ? 'การพนัน' :
    found.some((f) => ['เครดิตฟรี','โปรแรง'].includes(f)) ? 'โปรโมชั่นแรง' :
    found.length > 0 ? 'สุ่มเสี่ยง' : 'ทั่วไป'

  return { level, category, keywordsDetected: found }
}

/**
 * รีไรท์แบบ local เพื่อลดความเสี่ยง: แทนคำเสี่ยงด้วยถ้อยคำกลาง
 * - หมายเหตุ: รองรับเฉพาะคำทั่วไปใน map; หากมีคำเฉพาะที่ผู้ใช้เพิ่ม จะไม่ถูกแทนโดยอัตโนมัติ
 */
export function safeRewriteLocal(text: string): string {
  const map: Record<string, string> = {
    'แทงบอล': 'ร่วมกิจกรรมกีฬา',
    'แทงบอลออนไลน์': 'ติดตามผลการแข่งขัน',
    'คาสิโน': 'ความบันเทิง',
    'บาคาร่า': 'เกมไพ่',
    'สล็อต': 'เกมภาพ',
    'หวย': 'กิจกรรมตัวเลข',
    'เดิมพัน': 'เข้าร่วม',
    'ได้เงินจริง': 'มีโอกาสได้รับผลตอบแทน',
    'เครดิตฟรี': 'สิทธิประโยชน์',
    'รวยเร็ว': 'พัฒนาศักยภาพ',
    'การันตี': 'คาดการณ์',
    'ได้ชัวร์': 'มีความเป็นไปได้',
    'โปรแรง': 'ข้อเสนอพิเศษ',
    'ค่าน้ำดีที่สุด': 'เงื่อนไขพิเศษ',
    'เว็บตรง': 'ช่องทางหลัก'
  }
  let out = text || ''
  Object.entries(map).forEach(([k, v]) => {
    const re = new RegExp(k, 'gi')
    out = out.replace(re, v)
  })
  return out
}
