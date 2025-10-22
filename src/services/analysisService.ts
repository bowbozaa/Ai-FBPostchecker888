import { FacebookPost, AnalysisResult } from '@/types/facebook';

export class AnalysisService {
  private defaultBannedKeywords = [
    // Thai keywords
    'สแกม',
    'โกง',
    'ของปลอม',
    'แชร์ลูกโซ่',
    'เงินด่วน',
    'แชร์ด่วน',
    'โอนเงิน',
    'หลอกลวง',
    'ปั่นหุ้น',
    'พนัน',
    'คาสิโน',
    'หวย',
    'เงินเดือน',
    'รวยเร็ว',
    'ทำเงิน',
    // English keywords
    'scam',
    'fake',
    'fraud',
    'mlm',
    'pyramid',
    'get rich quick',
    'casino',
    'gambling',
    'lottery',
  ];

  private customKeywords: string[] = [];

  constructor(customKeywords?: string[]) {
    if (customKeywords) {
      this.customKeywords = customKeywords;
    }
    // Load from localStorage
    const stored = localStorage.getItem('banned_keywords');
    if (stored) {
      try {
        this.customKeywords = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored keywords');
      }
    }
  }

  getBannedKeywords(): string[] {
    return [...this.defaultBannedKeywords, ...this.customKeywords];
  }

  setBannedKeywords(keywords: string[]) {
    this.customKeywords = keywords;
    localStorage.setItem('banned_keywords', JSON.stringify(keywords));
  }

  /**
   * Analyze a Facebook post for risky content
   */
  analyzePost(post: FacebookPost, postUrl: string): AnalysisResult {
    const message = post.message || '';
    const detectedKeywords: string[] = [];
    const detectedIssues: string[] = [];
    const allKeywords = this.getBannedKeywords();

    // Check for banned keywords
    allKeywords.forEach((keyword) => {
      const regex = new RegExp(keyword, 'gi');
      if (regex.test(message)) {
        if (!detectedKeywords.includes(keyword)) {
          detectedKeywords.push(keyword);
        }
      }
    });

    // Calculate risk score
    let riskScore = 0;

    // Keywords score (20 points each, max 60)
    riskScore += Math.min(detectedKeywords.length * 20, 60);

    // Pattern-based scoring
    // Phone numbers
    if (/(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})/.test(message)) {
      riskScore += 15;
      detectedIssues.push('พบหมายเลขโทรศัพท์');
    }

    // Bank account numbers
    if (/(\d{3}[-\s]?\d{1}[-\s]?\d{5}[-\s]?\d{1}|\d{10,12})/.test(message)) {
      riskScore += 10;
      detectedIssues.push('พบหมายเลขบัญชีธนาคาร');
    }

    // External URLs
    const urlMatches = message.match(/https?:\/\/[^\s]+/g);
    if (urlMatches && urlMatches.length > 0) {
      riskScore += 10;
      detectedIssues.push(`พบ URL ภายนอก (${urlMatches.length} ลิงก์)`);
    }

    // Pyramid scheme patterns
    const pyramidPatterns = [
      /แชร์.*รับเงิน/i,
      /ชวน.*เพื่อน.*ได้เงิน/i,
      /สมัคร.*รับเงิน/i,
      /กด.*แชร์.*เงิน/i,
    ];

    pyramidPatterns.forEach((pattern) => {
      if (pattern.test(message)) {
        riskScore += 25;
        detectedIssues.push('พบรูปแบบแชร์ลูกโซ่');
      }
    });

    // Money-related urgent messages
    if (/เงินด่วน|ต้องการเงิน|ขอยืม|ช่วยด้วย.*เงิน/i.test(message)) {
      riskScore += 15;
      detectedIssues.push('พบข้อความขอเงินหรือเงินด่วน');
    }

    // Suspicious emoji patterns (too many money/rocket emojis)
    const moneyEmojiCount = (message.match(/💰|💵|💴|💶|💷|🤑/g) || []).length;
    if (moneyEmojiCount > 3) {
      riskScore += 10;
      detectedIssues.push('พบ emoji เกี่ยวกับเงินจำนวนมาก');
    }

    // Cap at 100
    riskScore = Math.min(riskScore, 100);

    // Determine status
    let status: 'safe' | 'risky' | 'dangerous';
    let message_text: string;

    if (riskScore < 30) {
      status = 'safe';
      message_text = '✅ โพสต์นี้ดูปลอดภัย ไม่พบเนื้อหาที่น่าสงสัย';
    } else if (riskScore < 70) {
      status = 'risky';
      message_text = '⚠️ โพสต์นี้มีความเสี่ยงปานกลาง ควรตรวจสอบเพิ่มเติม';
    } else {
      status = 'dangerous';
      message_text = '🚨 โพสต์นี้มีความเสี่ยงสูง! พบเนื้อหาที่น่าสงสัยหลายจุด';
    }

    return {
      id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      postId: post.id,
      postUrl,
      status,
      riskScore,
      bannedKeywords: detectedKeywords,
      detectedIssues,
      message: message_text,
      timestamp: new Date().toISOString(),
      postData: post,
    };
  }

  /**
   * Analyze multiple posts
   */
  analyzePosts(posts: FacebookPost[]): AnalysisResult[] {
    return posts.map((post) => {
      const url = post.permalink_url || `https://facebook.com/${post.id}`;
      return this.analyzePost(post, url);
    });
  }
}

export const analysisService = new AnalysisService();
