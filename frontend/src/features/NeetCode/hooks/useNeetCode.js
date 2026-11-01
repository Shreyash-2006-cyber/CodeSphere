import { useEffect, useState } from "react";
import { neetcodeCategories, neetcodeTotals } from "../data/neetcodeMockData";

// No async fetch needed today (static mock), but the hook shape
// matches other features so a real API can drop in later.
export function useNeetCode() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, []);

  return { categories: neetcodeCategories, totals: neetcodeTotals, loading };
}
