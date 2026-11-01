export const noteCategories = ["All", "DSA", "Web Dev", "Interview Prep", "Personal"];

export const initialNotes = [
  { id: 1, title: "Dijkstra's Algorithm", category: "DSA", tags: ["graphs", "shortest-path"], content: "Use a min-heap to always expand the closest unvisited node. Time complexity O(E log V) with a binary heap.", updated: "2026-07-24" },
  { id: 2, title: "React Server Components notes", category: "Web Dev", tags: ["react", "rsc"], content: "RSCs render on the server and stream HTML; no client JS bundle for them. Great for data-heavy pages.", updated: "2026-07-22" },
  { id: 3, title: "System design: rate limiting", category: "Interview Prep", tags: ["system-design"], content: "Token bucket vs sliding window log vs sliding window counter — tradeoffs in burstiness and memory.", updated: "2026-07-20" },
  { id: 4, title: "Sliding window template", category: "DSA", tags: ["arrays", "template"], content: "Expand right pointer, shrink left pointer when constraint violated. Works for substrings and subarrays.", updated: "2026-07-18" },
  { id: 5, title: "Morning routine ideas", category: "Personal", tags: ["habits"], content: "10 min meditation, review daily goals, 1 LeetCode warmup problem before checking messages.", updated: "2026-07-16" },
  { id: 6, title: "CSS Grid vs Flexbox", category: "Web Dev", tags: ["css"], content: "Grid for two-dimensional layouts, flexbox for one-dimensional. Combine them for complex UIs.", updated: "2026-07-12" },
];
