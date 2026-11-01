import { useEffect, useState } from "react";
import { notesAPI } from "../services/notesAPI";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category !== "All") params.category = category;
      if (query) params.q = query;
      const res = await notesAPI.getNotes(params);
      if (res.success && res.data) {
        setNotes(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchNotes();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [category, query]);

  async function addNote(note) {
    try {
      const res = await notesAPI.createNote(note);
      if (res.success) {
        setNotes((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  }

  async function updateNote(id, updates) {
    try {
      const res = await notesAPI.updateNote(id, updates);
      if (res.success) {
        setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
      }
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  }

  async function deleteNote(id) {
    try {
      const res = await notesAPI.deleteNote(id);
      if (res.success) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  }

  return { notes, query, setQuery, category, setCategory, addNote, updateNote, deleteNote, loading };
}
