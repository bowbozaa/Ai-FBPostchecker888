import axios from 'axios';
import { FacebookPost } from '@/types';
import { env } from '@/utils/env';

const FB_API_BASE = 'https://graph.facebook.com/v18.0';

export class FacebookApiService {
  private accessToken: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || env.facebookAccessToken;
  }

  async getPost(postId: string): Promise<FacebookPost> {
    try {
      const response = await axios.get(
        `${FB_API_BASE}/${postId}`,
        {
          params: {
            access_token: this.accessToken,
            fields: 'id,message,created_time,permalink_url,from',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  }

  async getPagePosts(pageId: string, limit: number = 10): Promise<FacebookPost[]> {
    try {
      const response = await axios.get(
        `${FB_API_BASE}/${pageId}/posts`,
        {
          params: {
            access_token: this.accessToken,
            fields: 'id,message,created_time,permalink_url,from',
            limit,
          },
        }
      );
      return response.data.data || [];
    } catch (error: any) {
      throw new Error(`Failed to fetch page posts: ${error.message}`);
    }
  }

  extractPostId(urlOrId: string): string {
    // If it's already an ID, return it
    if (!urlOrId.includes('/') && !urlOrId.includes('http')) {
      return urlOrId;
    }

    // Extract from Facebook URL
    const patterns = [
      /facebook\.com\/.*\/posts\/(\d+)/,
      /facebook\.com\/.*\/photos\/.*\/(\d+)/,
      /facebook\.com\/permalink\.php\?story_fbid=(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = urlOrId.match(pattern);
      if (match) {
        return match[1];
      }
    }

    throw new Error('Invalid Facebook post URL or ID');
  }
}

export const facebookApi = new FacebookApiService();
