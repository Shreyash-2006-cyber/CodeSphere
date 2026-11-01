import { useMemo, useState } from "react";
import { challenges as initialChallenges } from "../data/challengesMockData";

export function useChallenges() {
  const [items, setItems] = useState(initialChallenges);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((c) => c.type === filter)),
    [items, filter]
  );

  function toggleJoin(id) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, joined: !c.joined } : c)));
  }

  return { challenges: filtered, filter, setFilter, toggleJoin };
}
