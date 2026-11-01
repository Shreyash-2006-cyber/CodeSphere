import ProfileHeader from "./components/ProfileHeader";
import AchievementsList from "./components/AchievementsList";
import ConnectedPlatforms from "./components/ConnectedPlatforms";
import ActivityTimeline from "./components/ActivityTimeline";
import Card from "../../shared/components/Card";
import Loader from "../../shared/components/Loader";
import { formatCompactNumber } from "../../shared/utils/formatNumber";
import { useProfile } from "./hooks/useProfile";
import { achievements, activityTimeline } from "./data/profileMockData";
import "./styles/Profile.css";

export default function Profile() {
  const { profileData, loading, error } = useProfile();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div style={{ padding: 20, color: "var(--color-text-danger)", textAlign: "center" }}>
        {error || "Failed to load profile"}
      </div>
    );
  }

  // Map backend stats to display cards
  const displayStats = profileData.stats || [];

  const mappedHeaderProfile = {
    name: profileData.name,
    username: profileData.githubUsername || profileData.leetcodeUsername || "user",
    bio: profileData.bio || "Building in public.",
    location: "Remote",
    joined: profileData.joinedAt || new Date().toISOString()
  };

  return (
    <div className="pf-page fade-in">
      <ProfileHeader profile={mappedHeaderProfile} />

      <div className="pf-stats-grid">
        {displayStats.map((s) => (
          <Card key={s.label} className="pf-stat">
            <span className="pf-stat-value">{formatCompactNumber(s.value)}</span>
            <span className="pf-stat-label">{s.label}</span>
          </Card>
        ))}
      </div>

      <div className="pf-grid">
        <AchievementsList achievements={achievements} />
        <ConnectedPlatforms platforms={profileData.connectedPlatforms || []} />
      </div>

      <div className="page-section">
        <ActivityTimeline items={activityTimeline} />
      </div>
    </div>
  );
}
