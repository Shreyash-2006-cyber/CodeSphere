import { useState, useEffect } from 'react';
import { fetchLeetCodeData } from '../services/leetcodeAPI';
import { useAuth } from '../../../shared/context/AuthContext';

export const useLeetCode = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    profile: null,
    difficulty: null,
    trend: { labels: [], data: [] },
    heatmap: [],
    submissions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const leetcodeUsername = user?.leetcodeUsername;

      // If no LeetCode username configured, skip API call
      if (!leetcodeUsername) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await fetchLeetCodeData(user?.id || 'guest', leetcodeUsername);
        setData({
          profile: result.profile,
          difficulty: result.difficulty,
          trend: result.trend,
          heatmap: result.heatmap,
          submissions: result.submissions,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.leetcodeUsername, user?.id]);

  return { ...data, loading, error };
};