/**
 * jspdf-autotable.d.ts
 * ประกาศประเภทเสริมสำหรับใช้งาน jsPDF + autoTable ใน TypeScript
 */

import 'jspdf'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}
