export const notificationSettings = [
  { id: "streak", label: "Streak reminders", description: "Get notified before your streak breaks.", enabled: true },
  { id: "friend-activity", label: "Friend activity", description: "Updates when friends complete goals or challenges.", enabled: true },
  { id: "challenges", label: "New challenges", description: "Be notified when new challenges are posted.", enabled: false },
  { id: "weekly-digest", label: "Weekly digest email", description: "A summary of your week, every Sunday.", enabled: true },
];

export const privacySettings = [
  { id: "profile-visibility", label: "Public profile", description: "Allow anyone to view your profile page.", enabled: true },
  { id: "leaderboard-visibility", label: "Show on leaderboards", description: "Display your name on global leaderboards.", enabled: true },
  { id: "activity-sharing", label: "Share activity with friends", description: "Let friends see your recent activity feed.", enabled: false },
];
