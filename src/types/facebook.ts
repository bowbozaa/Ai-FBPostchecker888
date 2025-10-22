// Facebook Post Checker Types

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  from?: {
    name: string;
    id: string;
  };
  reactions?: {
    summary: {
      total_count: number;
    };
  };
  comments?: {
    summary: {
      total_count: number;
    };
  };
  shares?: {
    count: number;
  };
}

export interface AnalysisResult {
  id: string;
  postId: string;
  postUrl: string;
  status: 'safe' | 'risky' | 'dangerous';
  riskScore: number;
  bannedKeywords: string[];
  detectedIssues: string[];
  message: string;
  timestamp: string;
  postData?: FacebookPost;
}

export interface AnalysisStats {
  totalPosts: number;
  safePosts: number;
  riskyPosts: number;
  dangerousPosts: number;
  avgRiskScore: number;
}

export interface AppConfig {
  facebookToken: string;
  facebookPageId: string;
  lineToken: string;
  googleSheetsId: string;
  bannedKeywords: string[];
  autoScan: boolean;
  scanInterval: number; // minutes
}
