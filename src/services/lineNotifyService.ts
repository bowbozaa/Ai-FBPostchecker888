import axios from 'axios';
import { AnalysisResult } from '@/types/facebook';

const LINE_NOTIFY_API = 'https://notify-api.line.me/api/notify';

export class LineNotifyService {
  private accessToken: string;

  constructor(accessToken?: string) {
    const stored = localStorage.getItem('line_notify_token');
    this.accessToken = accessToken || stored || '';
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('line_notify_token', token);
  }

  /**
   * Send notification to LINE
   */
  async sendNotification(message: string): Promise<boolean> {
    if (!this.accessToken) {
      throw new Error('LINE Notify Token ไม่ได้ตั้งค่า กรุณาไปที่หน้า Settings');
    }

    try {
      const response = await axios.post(
        LINE_NOTIFY_API,
        new URLSearchParams({ message }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      return response.data.status === 200;
    } catch (error: any) {
      console.error('LINE Notify Error:', error.response?.data || error.message);
      throw new Error(`ไม่สามารถส่งการแจ้งเตือนผ่าน LINE: ${error.message}`);
    }
  }

  /**
   * Send analysis result notification
   */
  async notifyAnalysisResult(result: AnalysisResult): Promise<boolean> {
    const statusEmoji = {
      safe: '✅',
      risky: '⚠️',
      dangerous: '🚨',
    };

    const statusText = {
      safe: 'ปลอดภัย',
      risky: 'มีความเสี่ยงปานกลาง',
      dangerous: 'อันตราย!',
    };

    const message = `
${statusEmoji[result.status]} FB Post Checker 888 - การแจ้งเตือน

📊 สถานะ: ${statusText[result.status]}
🎯 คะแนนความเสี่ยง: ${result.riskScore}%
🔗 Post ID: ${result.postId}

${result.detectedIssues.length > 0 ? `⚠️ ปัญหาที่พบ:\n${result.detectedIssues.map((issue) => `• ${issue}`).join('\n')}` : ''}

${result.bannedKeywords.length > 0 ? `🚫 คำต้องห้าม:\n${result.bannedKeywords.map((kw) => `• ${kw}`).join('\n')}` : ''}

${result.message}

🔗 ดูโพสต์: ${result.postUrl}

⏰ ${new Date(result.timestamp).toLocaleString('th-TH')}
`.trim();

    return await this.sendNotification(message);
  }

  /**
   * Send notification only for risky or dangerous posts
   */
  async notifyIfRisky(result: AnalysisResult): Promise<boolean> {
    if (result.status === 'risky' || result.status === 'dangerous') {
      return await this.notifyAnalysisResult(result);
    }
    return false;
  }

  /**
   * Validate LINE Notify token
   */
  async validateToken(): Promise<boolean> {
    if (!this.accessToken) {
      return false;
    }

    try {
      const response = await axios.get('https://notify-api.line.me/api/status', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export const lineNotifyService = new LineNotifyService();
