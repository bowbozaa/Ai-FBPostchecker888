import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnalysisResult, AnalysisStats } from '@/types';

interface AnalysisStore {
  results: AnalysisResult[];
  stats: AnalysisStats;
  addResult: (result: AnalysisResult) => void;
  clearResults: () => void;
  getResultById: (postId: string) => AnalysisResult | undefined;
}

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set, get) => ({
      results: [],
      stats: {
        totalPosts: 0,
        riskyPosts: 0,
        safePosts: 0,
        pendingPosts: 0,
      },

      addResult: (result) =>
        set((state) => {
          const newResults = [result, ...state.results];
          const stats = calculateStats(newResults);
          return { results: newResults, stats };
        }),

      clearResults: () =>
        set({
          results: [],
          stats: {
            totalPosts: 0,
            riskyPosts: 0,
            safePosts: 0,
            pendingPosts: 0,
          },
        }),

      getResultById: (postId) => {
        return get().results.find((r) => r.postId === postId);
      },
    }),
    {
      name: 'analysis-storage',
    }
  )
);

function calculateStats(results: AnalysisResult[]): AnalysisStats {
  return {
    totalPosts: results.length,
    riskyPosts: results.filter((r) => r.status === 'risky' || r.status === 'dangerous').length,
    safePosts: results.filter((r) => r.status === 'safe').length,
    pendingPosts: 0,
  };
}
