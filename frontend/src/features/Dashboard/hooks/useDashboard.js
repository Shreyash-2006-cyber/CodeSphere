import { useState, useEffect } from 'react';
import { fetchLeetCodeData } from '../../LeetCode/services/leetcodeAPI';
import { syncGithub } from '../../GitHub/services/githubAPI';
import { trackerAPI } from '../../ManualTracker/services/trackerAPI';
import { goalsAPI } from '../../Goals/services/goalsAPI';
import { notesAPI } from '../../Notes/services/notesAPI';
import { useAuth } from '../../../shared/context/AuthContext';
import {
  weeklyOverview as mockWeekly,
  platformSummaries as mockPlatforms,
  welcomeStats as mockWelcomeStats,
} from '../data/dashboardMockData';

export function useDashboard() {
  const { user } = useAuth();
  const [platformSummaries, setPlatformSummaries] = useState(mockPlatforms);
  const [welcomeStats, setWelcomeStats] = useState(mockWelcomeStats);
  const [weeklyOverview, setWeeklyOverview] = useState(mockWeekly);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const githubUsername = user?.githubUsername;
      const leetcodeUsername = user?.leetcodeUsername;
      const userId = user?.id || 'guest';

      try {
        const [lcResult, ghResult, trackerResult, goalsResult, notesResult] = await Promise.allSettled([
          leetcodeUsername ? fetchLeetCodeData(userId, leetcodeUsername) : Promise.resolve(null),
          githubUsername ? syncGithub({ userId, username: githubUsername }) : Promise.resolve(null),
          trackerAPI.getTrackers(),
          goalsAPI.getGoals(),
          notesAPI.getNotes(),
        ]);

        let lcData = null;
        let ghData = null;
        let trackers = [];
        let goalsData = { daily: [], weekly: [], monthly: [] };

        if (lcResult.status === 'fulfilled') lcData = lcResult.value;
        if (ghResult.status === 'fulfilled') ghData = ghResult.value?.data;
        if (trackerResult.status === 'fulfilled' && trackerResult.value?.success) trackers = trackerResult.value.data;
        if (goalsResult.status === 'fulfilled' && goalsResult.value?.success) goalsData = goalsResult.value.data;

        // Calculate Manual Tracker stats
        const trackerCategoriesCount = new Set(trackers.map((t) => t.category)).size;

        // Calculate Goals Completion Rate
        const allGoals = [...(goalsData.daily || []), ...(goalsData.weekly || []), ...(goalsData.monthly || [])];
        const completedGoals = allGoals.filter((g) => g.current >= g.target).length;
        const goalsPercent = allGoals.length > 0 ? Math.round((completedGoals / allGoals.length) * 100) : 0;

        // Calculate total GitHub contributions
        const ghContribsCount = Array.isArray(ghData?.contributions)
          ? ghData.contributions.reduce((a, b) => a + b, 0)
          : 0;

        // Build platform summary cards with real data
        setPlatformSummaries([
          {
            id: 'github',
            label: 'GitHub',
            value: ghData ? `${ghData.publicRepos} repos` : 'No username set',
            secondary: ghData ? `${(ghData.followers || 0).toLocaleString()} followers` : 'Set in Settings',
            accent: '#2563eb',
          },
          {
            id: 'leetcode',
            label: 'LeetCode',
            value: lcData ? `${lcData.profile.totalSolved} solved` : 'No username set',
            secondary: lcData ? `Rank #${lcData.profile.ranking.toLocaleString()}` : 'Set in Settings',
            accent: '#f59e0b',
          },
          {
            id: 'neetcode',
            label: 'NeetCode',
            value: '58% complete',
            secondary: '88 / 152 problems',
            accent: '#10b981',
          },
          {
            id: 'tracker',
            label: 'Manual Tracker',
            value: `${trackers.length} active`,
            secondary: `${trackerCategoriesCount} categories`,
            accent: '#8b5cf6',
          },
        ]);

        // Build welcome stats with real values
        setWelcomeStats([
          {
            label: 'Current streak',
            value: `${trackers.length > 0 ? Math.max(...trackers.map((t) => t.streak || 0), 0) : 0} days`,
          },
          {
            label: 'Problems solved',
            value: lcData ? lcData.profile.totalSolved.toString() : '0',
          },
          {
            label: 'GitHub contributions',
            value: ghData ? ghContribsCount.toLocaleString() : '0',
          },
          {
            label: 'Goals completion',
            value: `${goalsPercent}%`,
          },
        ]);

        // Weekly overview — use weeklyCommits from GitHub + LeetCode submissions by weekday
        if (ghData?.weeklyCommits?.data || lcData?.submissions) {
          const lcByDay = [0, 0, 0, 0, 0, 0, 0]; // Mon-Sun
          if (lcData?.submissions) {
            lcData.submissions.forEach((s) => {
              const dayIndex = new Date(s.date).getDay(); // 0=Sun..6=Sat
              const mapped = dayIndex === 0 ? 6 : dayIndex - 1; // shift to Mon=0..Sun=6
              lcByDay[mapped] += 1;
            });
          }

          setWeeklyOverview({
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            github: ghData?.weeklyCommits?.data || [0, 0, 0, 0, 0, 0, 0],
            leetcode: lcByDay,
          });
        }
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user?.githubUsername, user?.leetcodeUsername, user?.id]);

  return { platformSummaries, welcomeStats, weeklyOverview, loading, userName: user?.name || 'Developer' };
}
