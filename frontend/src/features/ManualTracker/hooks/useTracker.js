import { useEffect, useMemo, useState } from "react";
import { trackerAPI } from "../services/trackerAPI";

export function useTracker() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const fetchTrackers = async () => {
    try {
      setLoading(true);
      const res = await trackerAPI.getTrackers();
      if (res.success && res.data) {
        setItems(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch trackers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackers();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  async function addTracker(tracker) {
    try {
      const res = await trackerAPI.createTracker(tracker);
      if (res.success) {
        setItems((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error("Failed to add tracker:", err);
    }
  }

  async function deleteTracker(id) {
    try {
      const res = await trackerAPI.deleteTracker(id);
      if (res.success) {
        setItems((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete tracker:", err);
    }
  }

  async function updateTracker(id, updates) {
    try {
      const res = await trackerAPI.updateTracker(id, updates);
      if (res.success) {
        setItems((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      }
    } catch (err) {
      console.error("Failed to update tracker:", err);
    }
  }

  return { items: filtered, loading, query, setQuery, category, setCategory, addTracker, deleteTracker, updateTracker };
}
