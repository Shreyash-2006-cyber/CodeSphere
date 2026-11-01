export const neetcodeCategories = [
  { name: "Arrays & Hashing", completed: 12, total: 12 },
  { name: "Two Pointers", completed: 8, total: 9 },
  { name: "Stack", completed: 6, total: 8 },
  { name: "Binary Search", completed: 5, total: 8 },
  { name: "Sliding Window", completed: 4, total: 6 },
  { name: "Linked List", completed: 9, total: 11 },
  { name: "Trees", completed: 7, total: 15 },
  { name: "Tries", completed: 2, total: 3 },
  { name: "Heap / Priority Queue", completed: 3, total: 7 },
  { name: "Backtracking", completed: 4, total: 9 },
  { name: "Graphs", completed: 5, total: 13 },
  { name: "Dynamic Programming", completed: 6, total: 24 },
  { name: "Greedy", completed: 3, total: 8 },
  { name: "Intervals", completed: 3, total: 6 },
  { name: "Math & Geometry", completed: 2, total: 8 },
  { name: "Bit Manipulation", completed: 4, total: 7 },
];

export const neetcodeTotals = neetcodeCategories.reduce(
  (acc, c) => ({ completed: acc.completed + c.completed, total: acc.total + c.total }),
  { completed: 0, total: 0 }
);
