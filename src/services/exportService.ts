import ExcelJS from 'exceljs';
import { AnalysisResult } from '@/types';

export class ExportService {
  /**
   * Export analysis results to Excel file
   */
  async exportToExcel(results: AnalysisResult[]): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('รายงานการวิเคราะห์');

    // Set column headers
    worksheet.columns = [
      { header: 'วันที่', key: 'timestamp', width: 20 },
      { header: 'Post ID', key: 'postId', width: 20 },
      { header: 'URL', key: 'postUrl', width: 50 },
      { header: 'สถานะ', key: 'status', width: 15 },
      { header: 'คะแนนความเสี่ยง (%)', key: 'riskScore', width: 18 },
      { header: 'คำต้องห้ามที่พบ', key: 'bannedKeywords', width: 30 },
      { header: 'ปัญหาที่ตรวจพบ', key: 'detectedIssues', width: 40 },
      { header: 'ข้อความ', key: 'message', width: 40 },
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F46E5' }, // Indigo-600
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 25;

    // Add data rows
    results.forEach((result) => {
      const row = worksheet.addRow({
        timestamp: new Date(result.timestamp).toLocaleString('th-TH'),
        postId: result.postId,
        postUrl: result.postUrl,
        status: this.getStatusText(result.status),
        riskScore: result.riskScore,
        bannedKeywords: result.bannedKeywords.join(', '),
        detectedIssues: result.detectedIssues.join(', '),
        message: result.message,
      });

      // Color code rows based on status
      const fillColor = this.getStatusColor(result.status);
      row.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: fillColor },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.alignment = { vertical: 'middle', wrapText: true };
      });
    });

    // Add summary at the bottom
    const summaryStartRow = worksheet.rowCount + 3;

    const safeCount = results.filter((r) => r.status === 'safe').length;
    const riskyCount = results.filter((r) => r.status === 'risky').length;
    const dangerousCount = results.filter((r) => r.status === 'dangerous').length;

    worksheet.addRow([]);
    worksheet.addRow([]);
    const summaryTitle = worksheet.addRow(['สรุปผลการวิเคราะห์']);
    summaryTitle.font = { bold: true, size: 14 };
    summaryTitle.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE5E7EB' },
    };

    worksheet.addRow(['โพสต์ทั้งหมด', results.length]);
    worksheet.addRow(['ปลอดภัย', safeCount]);
    worksheet.addRow(['มีความเสี่ยงปานกลาง', riskyCount]);
    worksheet.addRow(['อันตราย', dangerousCount]);

    // Generate file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FB-Analysis-Report-${new Date().toISOString().slice(0, 10)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export single result to Excel
   */
  async exportSingleToExcel(result: AnalysisResult): Promise<void> {
    await this.exportToExcel([result]);
  }

  private getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      safe: '✅ ปลอดภัย',
      risky: '⚠️ มีความเสี่ยงปานกลาง',
      dangerous: '🚨 อันตราย',
    };
    return statusMap[status] || status;
  }

  private getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      safe: 'FFD1FAE5', // Green-100
      risky: 'FFFEF3C7', // Yellow-100
      dangerous: 'FFFECACA', // Red-100
    };
    return colorMap[status] || 'FFFFFFFF';
  }
}

export const exportService = new ExportService();
