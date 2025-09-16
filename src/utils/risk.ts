/** 
 * risk.ts - ยูทิลสำหรับวิเคราะห์ความเสี่ยง และจัดการกฎ Policy
 * - รองรับโครงสร้าง Rule แบบใหม่ (keyword, category, score, regex)
 * - มี Logic ในการ Migrate ข้อมูลจาก "คำต้องห้าม" แบบเก่าเป็น "กฎ" แบบใหม่โดยอัตโนมัติ
 */
import defaultRuleFile from '../../config/rules.config.json' assert { type: 'json' }

// --- โครงสร้างข้อมูลและค่าคงที่ ---

/** โครงสร้างของกฎแต่ละข้อ */
export interface PolicyRule {
  id: string
  keyword: string
  category: string
  risk_score: number
  is_regex: boolean
  enabled: boolean
}

/** ผลลัพธ์การวิเคราะห์ความเสี่ยง */
export interface RiskResult {
  level: number
  category: string
  keywordsDetected: string[]
  matchedRules: PolicyRule[]
}

/** คีย์สำหรับเก็บข้อมูลใน localStorage */
const LS_POLICY_RULES = 'fbps_policy_rules'
const LS_FORBIDDEN_OLD = 'fbps_forbidden_keywords' // คีย์เก่าสำหรับ Migrate

/** 
 * กฎตั้งต้น: อ่านจากไฟล์ JSON ที่เราสร้างไว้
 * - ที่ต้องทำแบบนี้เพราะ import assertion (`with { type: 'json' }`) ยังมีปัญหาในบาง bundler
 */
const DEFAULT_RULES: PolicyRule[] = defaultRuleFile.rules as PolicyRule[]

// --- ฟังก์ชันหลักสำหรับจัดการกฎ ---

/**
 * โหลดกฎทั้งหมด
 * - ตรวจสอบ localStorage สำหรับกฎที่ผู้ใช้ตั้งค่าเอง
 * - หากไม่เจอ จะพยายาม Migrate จากข้อมูล "คำต้องห้าม" แบบเก่า
 * - หากไม่มีข้อมูลเก่า จะใช้ค่าตั้งต้นจาก `rules.config.json`
 */
export function getPolicyRules(): PolicyRule[] {
  // 1. พยายามโหลดกฎจากโครงสร้างใหม่
  try {
    const raw = localStorage.getItem(LS_POLICY_RULES)
    if (raw) {
      const data = JSON.parse(raw)
      if (Array.isArray(data) && data.length > 0) {
        return data
      }
    }
  } catch {}

  // 2. หากไม่มี ให้ลอง Migrate จากโครงสร้างเก่า (string[])
  try {
    const oldRaw = localStorage.getItem(LS_FORBIDDEN_OLD)
    if (oldRaw) {
      const oldKeywords = JSON.parse(oldRaw)
      if (Array.isArray(oldKeywords)) {
        const migratedRules: PolicyRule[] = oldKeywords.map((kw, i) => ({
          id: `migrated-${Date.now()}-${i}`,
          keyword: kw,
          category: 'Migrated', // กำหนด Category เริ่มต้น
          risk_score: 3, // กำหนด risk score เริ่มต้น
          is_regex: false,
          enabled: true,
        }))
        // บันทึกกฎที่ Migrate แล้วในรูปแบบใหม่ และลบของเก่าทิ้ง
        setPolicyRules(migratedRules)
        localStorage.removeItem(LS_FORBIDDEN_OLD)
        return migratedRules
      }
    }
  } catch {}

  // 3. หากไม่มีข้อมูลใดๆ เลย ให้ใช้ค่าตั้งต้น
  return [...DEFAULT_RULES]
}

/**
 * บันทึกกฎทั้งหมดลง localStorage
 */
export function setPolicyRules(rules: PolicyRule[]): void {
  localStorage.setItem(LS_POLICY_RULES, JSON.stringify(rules))
}

/**
 * รีเซ็ตกฎทั้งหมดกลับไปเป็นค่าตั้งต้นจากไฟล์ `rules.config.json`
 */
export function resetPolicyRules(): void {
  setPolicyRules([...DEFAULT_RULES])
}


// --- ฟังก์ชันสำหรับความเข้ากันได้กับโค้ดเก่า (Backward Compatibility) ---

/**
 * [Compatibility] อ่าน "คำต้องห้าม" จากกฎทั้งหมด (เพื่อให้ส่วนอื่นของแอปยังทำงานได้)
 */
export function getForbiddenKeywords(): string[] {
  const rules = getPolicyRules()
  return rules.map(r => r.keyword)
}


// --- ฟังก์ชันวิเคราะห์ความเสี่ยงที่อัปเกรดแล้ว ---

/**
 * วิเคราะห์ความเสี่ยงจากข้อความโดยใช้กฎทั้งหมด
 * - คำนวณความเสี่ยงจาก "คะแนนสูงสุด" ของกฎที่ตรวจพบ
 */
export function analyzeRisk(text: string): RiskResult {
  const content = (text || '').toLowerCase()
  const rules = getPolicyRules().filter(r => r.enabled)
  
  const matchedRules: PolicyRule[] = []

  for (const rule of rules) {
    try {
      if (rule.is_regex) {
        const regex = new RegExp(rule.keyword, 'gi')
        if (regex.test(content)) {
          matchedRules.push(rule)
        }
      } else {
        if (content.includes(rule.keyword.toLowerCase())) {
          matchedRules.push(rule)
        }
      }
    } catch (e) {
      // ป้องกัน Regex ที่ไม่ถูกต้อง
      console.error(`Invalid regex in rule ${rule.id}:`, rule.keyword)
    }
  }

  if (matchedRules.length === 0) {
    return { level: 1, category: 'ปลอดภัย', keywordsDetected: [], matchedRules: [] }
  }

  // หาตัวที่มี risk_score สูงที่สุด
  const topRule = matchedRules.reduce((max, rule) => rule.risk_score > max.risk_score ? rule : max, matchedRules[0])

  return {
    level: topRule.risk_score,
    category: topRule.category,
    keywordsDetected: matchedRules.map(r => r.keyword), // แสดง keyword ทั้งหมดที่เจอ
    matchedRules: matchedRules,
  }
}

/**
 * [Compatibility] ฟังก์ชันเดิม ยังคงไว้เผื่อส่วนอื่นเรียกใช้
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