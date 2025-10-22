import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnalysisResult, AnalysisStats } from '@/types/facebook';

interface PostCheckerStore {
  // Analysis Results
  results: AnalysisResult[];
  stats: AnalysisStats;

  // Add result
  addResult: (result: AnalysisResult) => void;

  // Get result by ID
  getResultById: (id: string) => AnalysisResult | undefined;

  // Clear all results
  clearResults: () => void;

  // Delete specific result
  deleteResult: (id: string) => void;

  // Get filtered results
  getResultsByStatus: (status: 'safe' | 'risky' | 'dangerous') => AnalysisResult[];
}

const calculateStats = (results: AnalysisResult[]): AnalysisStats => {
  const safePosts = results.filter((r) => r.status === 'safe').length;
  const riskyPosts = results.filter((r) => r.status === 'risky').length;
  const dangerousPosts = results.filter((r) => r.status === 'dangerous').length;

  const totalScore = results.reduce((sum, r) => sum + r.riskScore, 0);
  const avgRiskScore = results.length > 0 ? Math.round(totalScore / results.length) : 0;

  return {
    totalPosts: results.length,
    safePosts,
    riskyPosts,
    dangerousPosts,
    avgRiskScore,
  };
};

export const usePostCheckerStore = create<PostCheckerStore>()(
  persist(
    (set, get) => ({
      results: [],
      stats: {
        totalPosts: 0,
        safePosts: 0,
        riskyPosts: 0,
        dangerousPosts: 0,
        avgRiskScore: 0,
      },

      addResult: (result) =>
        set((state) => {
          // Avoid duplicates by postId
          const exists = state.results.find((r) => r.postId === result.postId);
          let newResults;

          if (exists) {
            // Update existing
            newResults = state.results.map((r) => (r.postId === result.postId ? result : r));
          } else {
            // Add new (most recent first)
            newResults = [result, ...state.results];
          }

          const stats = calculateStats(newResults);
          return { results: newResults, stats };
        }),

      getResultById: (id) => {
        return get().results.find((r) => r.id === id);
      },

      clearResults: () =>
        set({
          results: [],
          stats: {
            totalPosts: 0,
            safePosts: 0,
            riskyPosts: 0,
            dangerousPosts: 0,
            avgRiskScore: 0,
          },
        }),

      deleteResult: (id) =>
        set((state) => {
          const newResults = state.results.filter((r) => r.id !== id);
          const stats = calculateStats(newResults);
          return { results: newResults, stats };
        }),

      getResultsByStatus: (status) => {
        return get().results.filter((r) => r.status === status);
      },
    }),
    {
      name: 'fb-post-checker-storage',
      version: 1,
    }
  )
);
