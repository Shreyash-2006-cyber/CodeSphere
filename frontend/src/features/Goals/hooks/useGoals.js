import { useState, useEffect } from "react";
import { goalsAPI } from "../services/goalsAPI";

export function useGoals() {
  const [goals, setGoals] = useState({ daily: [], weekly: [], monthly: [] });
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await goalsAPI.getGoals();
      if (res.success && res.data) {
        setGoals(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  async function increment(period, id) {
    const list = goals[period] || [];
    const item = list.find((g) => g._id === id);
    if (!item) return;

    const newProgress = Math.min(item.target, item.progress + 1);
    try {
      const res = await goalsAPI.updateGoal(id, { progress: newProgress });
      if (res.success) {
        setGoals((prev) => ({
          ...prev,
          [period]: prev[period].map((g) => (g._id === id ? res.data : g)),
        }));
      }
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  }

  function completionRate(period) {
    const items = goals[period] || [];
    if (items.length === 0) return 0;
    const done = items.filter((g) => g.progress >= g.target).length;
    return Math.round((done / items.length) * 100);
  }

  async function addGoal(label, period, target) {
    try {
      const res = await goalsAPI.createGoal({ label, period, target });
      if (res.success) {
        setGoals((prev) => ({
          ...prev,
          [period]: [...(prev[period] || []), res.data],
        }));
      }
    } catch (err) {
      console.error("Failed to create goal:", err);
    }
  }

  async function deleteGoal(period, id) {
    try {
      const res = await goalsAPI.deleteGoal(id);
      if (res.success) {
        setGoals((prev) => ({
          ...prev,
          [period]: prev[period].filter((g) => g._id !== id),
        }));
      }
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  }

  return { goals, increment, completionRate, addGoal, deleteGoal, loading };
}
