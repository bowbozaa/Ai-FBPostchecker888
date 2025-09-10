/**
 * exportUtils.ts
 * ยูทิลสำหรับ Export รายงานวิเคราะห์เป็น PDF/Excel
 */

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'sheetjs'

/**
 * ผลลัพธ์การวิเคราะห์โพสต์
 */
export interface AnalysisResult {
  /** เนื้อหาโพสต์ */
  content: string
  /** ระดับความเสี่ยง 1-5 */
  riskLevel: number
  /** หมวดหมู่ที่ตรวจพบ */
  category: string
  /** คำสำคัญที่ตรวจพบ */
  keywords: string[]
  /** เวลา/วันที่วิเคราะห์ (ISO string) */
  timestamp: string
  /** คะแนนหรือข้อมูลเพิ่มเติม */
  score?: number
}

/**
 * แปลงระดับความเสี่ยงเป็นข้อความ
 */
export function riskLabel(level: number): string {
  if (level >= 5) return 'Very High'
  if (level >= 4) return 'High'
  if (level >= 3) return 'Medium'
  if (level >= 2) return 'Low'
  return 'Very Low'
}

/**
 * สีสำหรับระดับความเสี่ยง (Hex)
 */
export function riskColor(level: number): string {
  if (level >= 5) return '#b91c1c'
  if (level >= 4) return '#ef4444'
  if (level >= 3) return '#f59e0b'
  if (level >= 2) return '#10b981'
  return '#22c55e'
}

/**
 * Export รายงานวิเคราะห์โพสต์เป็น PDF
 */
export async function exportAnalysisToPDF(result: AnalysisResult, fileName = 'analysis_report.pdf'): Promise<void> {
  const doc = new jsPDF()

  // หัวรายงาน
  doc.setFontSize(16)
  doc.text('FB Post Checker - Analysis Report', 14, 18)

  // แท็กสรุป
  doc.setFontSize(11)
  const risk = `${riskLabel(result.riskLevel)} (${result.riskLevel}/5)`
  doc.setTextColor(60, 60, 60)
  doc.text(`Analyzed at: ${new Date(result.timestamp).toLocaleString()}`, 14, 28)
  doc.setTextColor(0, 0, 0)

  // กล่องความเสี่ยง
  const color = riskColor(result.riskLevel)
  doc.setFillColor(color)
  doc.rect(14, 33, 182, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.text(`Risk: ${risk} • Category: ${result.category}`, 18, 39)
  doc.setTextColor(0, 0, 0)

  // เนื้อหา
  ;(doc as any).autoTable({
    startY: 50,
    head: [['Field', 'Value']],
    body: [
      ['Content', result.content],
      ['Keywords', result.keywords.join(', ') || '-'],
      ['Score', typeof result.score === 'number' ? String(result.score) : '-'],
    ],
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [30, 64, 175] },
    theme: 'striped',
  })

  doc.save(fileName)
}

/**
 * Export รายงานวิเคราะห์โพสต์เป็นไฟล์ Excel (xlsx)
 */
export async function exportAnalysisToExcel(result: AnalysisResult, fileName = 'analysis_report.xlsx'): Promise<void> {
  const rows = [
    { Field: 'Analyzed At', Value: new Date(result.timestamp).toLocaleString() },
    { Field: 'Risk', Value: `${riskLabel(result.riskLevel)} (${result.riskLevel}/5)` },
    { Field: 'Category', Value: result.category },
    { Field: 'Keywords', Value: result.keywords.join(', ') || '-' },
    { Field: 'Score', Value: typeof result.score === 'number' ? String(result.score) : '-' },
    { Field: 'Content', Value: result.content },
  ]

  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Analysis')
  XLSX.writeFile(wb, fileName)
}
