export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  from?: {
    name: string;
    id: string;
  };
}

export interface AnalysisResult {
  postId: string;
  postUrl: string;
  status: 'safe' | 'risky' | 'dangerous';
  riskScore: number;
  bannedKeywords: string[];
  detectedIssues: string[];
  message: string;
  timestamp: string;
}

export interface AppConfig {
  facebookToken: string;
  facebookPageId: string;
  lineToken: string;
  googleSheetsId: string;
  bannedKeywords: string[];
}

export interface AnalysisStats {
  totalPosts: number;
  riskyPosts: number;
  safePosts: number;
  pendingPosts: number;
}
