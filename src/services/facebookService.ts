import axios from 'axios';
import { FacebookPost } from '@/types/facebook';

const FB_API_BASE = 'https://graph.facebook.com/v18.0';

export class FacebookService {
  private accessToken: string;

  constructor(accessToken?: string) {
    // Get token from localStorage or use provided one
    const stored = localStorage.getItem('fb_access_token');
    this.accessToken = accessToken || stored || '';
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('fb_access_token', token);
  }

  /**
   * Get a single Facebook post by ID
   */
  async getPost(postId: string): Promise<FacebookPost> {
    if (!this.accessToken) {
      throw new Error('Facebook Access Token ไม่ได้ตั้งค่า กรุณาไปที่หน้า Settings');
    }

    try {
      const response = await axios.get(`${FB_API_BASE}/${postId}`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,message,created_time,permalink_url,from,reactions.summary(true),comments.summary(true),shares',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Facebook API Error:', error.response?.data || error.message);
      throw new Error(`ไม่สามารถดึงข้อมูลโพสต์: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  /**
   * Get posts from a Facebook page
   */
  async getPagePosts(pageId: string, limit: number = 10): Promise<FacebookPost[]> {
    if (!this.accessToken) {
      throw new Error('Facebook Access Token ไม่ได้ตั้งค่า');
    }

    try {
      const response = await axios.get(`${FB_API_BASE}/${pageId}/posts`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,message,created_time,permalink_url,from,reactions.summary(true),comments.summary(true),shares',
          limit,
        },
      });
      return response.data.data || [];
    } catch (error: any) {
      console.error('Facebook API Error:', error.response?.data || error.message);
      throw new Error(`ไม่สามารถดึงโพสต์จากเพจ: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  /**
   * Extract Post ID from various Facebook URL formats
   */
  extractPostId(urlOrId: string): string {
    // If it's already an ID, return it
    if (!urlOrId.includes('/') && !urlOrId.includes('http')) {
      return urlOrId;
    }

    // Extract from Facebook URL patterns
    const patterns = [
      /facebook\.com\/.*\/posts\/(\d+)/,
      /facebook\.com\/.*\/photos\/.*\/(\d+)/,
      /facebook\.com\/permalink\.php\?story_fbid=(\d+)/,
      /facebook\.com\/.*\/videos\/(\d+)/,
      /fbid=(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = urlOrId.match(pattern);
      if (match) {
        return match[1];
      }
    }

    // Try to extract numeric ID from URL
    const numericMatch = urlOrId.match(/(\d{10,})/);
    if (numericMatch) {
      return numericMatch[1];
    }

    throw new Error('ไม่สามารถดึง Post ID จาก URL ได้ กรุณาตรวจสอบ URL');
  }

  /**
   * Validate Facebook Access Token
   */
  async validateToken(): Promise<boolean> {
    if (!this.accessToken) {
      return false;
    }

    try {
      const response = await axios.get(`${FB_API_BASE}/me`, {
        params: {
          access_token: this.accessToken,
        },
      });
      return !!response.data.id;
    } catch (error) {
      return false;
    }
  }
}

export const facebookService = new FacebookService();
