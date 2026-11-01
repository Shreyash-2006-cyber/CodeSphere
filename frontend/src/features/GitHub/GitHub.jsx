import { useGitHub } from "./hooks/useGitHub";
import ProfileCard from "./components/ProfileCard";
import StatsCard from "./components/StatsCard";
import LanguageChart from "./components/LanguageChart";
import ContributionCard from "./components/ContributionCard";
import RepositoryTable from "./components/RepositoryTable";
import { SkeletonCard } from "../../shared/components/Loader";
import "./styles/GitHub.css";

export default function GitHub() {
  const { profile, stats, languages, contributions, weeklyCommits, repositories, loading } = useGitHub();

  if (loading || !profile) {
    return (
      <div className="gh-page">
        <div className="gh-grid-top">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="gh-page fade-in">
      <div className="page-heading">
        <h2>GitHub</h2>
        <p>Repository activity and contribution history, synced from GitHub.</p>
      </div>

      <div className="gh-grid-top">
        <ProfileCard profile={profile} />
        <StatsCard stats={stats} />
      </div>

      <div className="gh-grid-mid">
        <ContributionCard contributions={contributions} weeklyCommits={weeklyCommits} />
        <LanguageChart languages={languages} />
      </div>

      <div className="page-section">
        <h3>Repositories</h3>
        <RepositoryTable repositories={repositories} />
      </div>
    </div>
  );
}
