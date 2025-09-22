"use client";

import useSWR from 'swr';
import { useUser } from '@stackframe/stack';

// Types for dashboard data
export interface DashboardAnalytics {
  period: string;
  dateRange: {
    start: string;
    end: string;
  };
  journalStats: {
    totalEntries: number;
    totalWords: number;
    entriesByType: Array<{ type: string; count: number }>;
    dailyEntries: Array<{ date: string; count: number }>;
  };
  streakInfo: {
    currentStreak: number;
    longestStreak: number;
    totalEntries: number;
    lastEntryDate: string | null;
  };
  moodTrends: {
    dailyMoods: Array<{
      date: string;
      averageMood: number;
      entryCount: number;
      moods: string[];
    }>;
    topEmotions: Array<{ emotion: string; frequency: number }>;
  };
  goalsProgress: {
    totalGoals: number;
    activeGoals: number;
    completedGoals: number;
    goals: Array<{
      id: string;
      title: string;
      status: string;
      priority: string;
      targetDate: string | null;
      createdAt: string;
      updatedAt: string;
    }>;
  };
  recentActivities: Array<{
    id: string;
    type: 'journal' | 'goal';
    title: string;
    subtitle: string;
    timestamp: string;
    href: string;
  }>;
  productivityMetrics: {
    consistency: number;
    activeDays: number;
    totalDays: number;
    averageWordsPerEntry: number;
  };
}

export interface JournalEntry {
  id: string;
  title: string;
  yooptaContent: any;
  plainTextContent: string;
  type: string;
  mood: string | null;
  moodIntensity: number | null;
  emotionalTags: string[];
  tags: string[];
  location: string | null;
  weather: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  imageUrls: string[];
  attachmentUrls: string[];
  duration: number | null;
  transcript: string | null;
  aiSummary: string | null;
  aiInsights: string[];
  entryDate: string;
  createdAt: string;
  updatedAt: string;
  similarity?: number;
}

export interface Goal {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

// Hook for dashboard analytics
export function useDashboardAnalytics(period: 'week' | 'month' | 'year' = 'week') {
  const user = useUser();
  
  const { data, error, isLoading, mutate } = useSWR<DashboardAnalytics>(
    user ? `/api/dashboard/analytics?period=${period}` : null,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  };
}

// Hook for journal entries
export function useJournalEntries(params?: {
  type?: string;
  mood?: string;
  q?: string;
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}) {
  const user = useUser();
  
  const queryParams = new URLSearchParams();
  if (params?.type) queryParams.set('type', params.type);
  if (params?.mood) queryParams.set('mood', params.mood);
  if (params?.q) queryParams.set('q', params.q);
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.offset) queryParams.set('offset', params.offset.toString());
  if (params?.startDate) queryParams.set('startDate', params.startDate);
  if (params?.endDate) queryParams.set('endDate', params.endDate);

  const { data, error, isLoading, mutate } = useSWR<{
    entries: JournalEntry[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    };
  }>(
    user ? `/api/journal?${queryParams.toString()}` : null,
    fetcher,
    {
      refreshInterval: 2 * 60 * 1000, // Refresh every 2 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    entries: data?.entries || [],
    pagination: data?.pagination,
    error,
    isLoading,
    refresh: mutate,
  };
}

// Hook for goals
export function useGoals() {
  const user = useUser();
  
  const { data, error, isLoading, mutate } = useSWR<{ goals: Goal[] }>(
    user ? '/api/goals' : null,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    goals: data?.goals || [],
    error,
    isLoading,
    refresh: mutate,
  };
}

// Hook for recent journal entries (for quick access)
export function useRecentJournalEntries(limit: number = 5) {
  const { entries, error, isLoading, refresh } = useJournalEntries({ 
    limit,
    offset: 0 
  });

  return {
    entries,
    error,
    isLoading,
    refresh,
  };
}

// Hook for creating journal entries with optimistic updates
export function useCreateJournalEntry() {
  const { refresh: refreshEntries } = useJournalEntries();
  const { refresh: refreshAnalytics } = useDashboardAnalytics();

  const createEntry = async (entryData: {
    title: string;
    yooptaContent?: any;
    plainTextContent?: string;
    type?: string;
    mood?: string;
    moodIntensity?: number;
    emotionalTags?: string[];
    tags?: string[];
    location?: string;
    weather?: string;
    entryDate?: string;
    generateAI?: boolean;
  }) => {
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) {
        throw new Error('Failed to create journal entry');
      }

      const result = await response.json();
      
      // Refresh both journal entries and analytics
      await Promise.all([
        refreshEntries(),
        refreshAnalytics(),
      ]);

      return result;
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }
  };

  return { createEntry };
}

// Hook for creating goals with optimistic updates
export function useCreateGoal() {
  const { refresh: refreshGoals } = useGoals();
  const { refresh: refreshAnalytics } = useDashboardAnalytics();

  const createGoal = async (goalData: {
    title: string;
    description?: string;
    targetDate?: string;
    priority?: string;
  }) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error('Failed to create goal');
      }

      const result = await response.json();
      
      // Refresh both goals and analytics
      await Promise.all([
        refreshGoals(),
        refreshAnalytics(),
      ]);

      return result;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  };

  return { createGoal };
}

// Hook for dashboard summary data (lightweight version for quick loading)
export function useDashboardSummary() {
  const user = useUser();
  
  const { data, error, isLoading } = useSWR<{
    totalJournalEntries: number;
    currentStreak: number;
    activeGoals: number;
    recentActivity: string;
  }>(
    user ? '/api/dashboard/summary' : null,
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000, // Refresh every 10 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    summary: data,
    error,
    isLoading,
  };
}
