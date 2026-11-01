const NAMES = [
  "Wei Chen", "Rahul Mehta", "Aditi Sharma", "Priya Nair", "Lena Novak",
  "Sam Okafor", "Mateo Rossi", "Fatima Al-Sayed", "Noah Kim", "Grace Adeyemi",
  "Ivan Petrov", "Hana Suzuki", "Carlos Diaz", "Amara Obi", "Leo Fischer",
];

function makeLeaderboard(seedOffset = 0) {
  return NAMES.map((name, i) => ({
    id: i + 1,
    rank: i + 1,
    name,
    points: 6800 - i * 340 + (seedOffset % 50) * (i % 3),
    streak: Math.max(1, 40 - i * 2 - (seedOffset % 4)),
  })).sort((a, b) => b.points - a.points).map((u, i) => ({ ...u, rank: i + 1 }));
}

export const globalLeaderboard = makeLeaderboard(0);
export const friendsLeaderboard = makeLeaderboard(7).slice(0, 6);
export const weeklyLeaderboard = makeLeaderboard(3);
export const monthlyLeaderboard = makeLeaderboard(11);
