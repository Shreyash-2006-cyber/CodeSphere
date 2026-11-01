import { useChallenges } from "./hooks/useChallenges";
import ChallengeCard from "./components/ChallengeCard";
import ChallengeLeaderboard from "./components/ChallengeLeaderboard";
import { challengeLeaderboard } from "./data/challengesMockData";
import Dropdown from "../../shared/components/Dropdown";
import EmptyState from "../../shared/components/EmptyState";
import { LuSwords } from "react-icons/lu";
import "./styles/Challenges.css";

const FILTERS = ["All", "Daily", "Weekly", "Monthly"];

export default function Challenges() {
  const { challenges, filter, setFilter, toggleJoin } = useChallenges();

  return (
    <div className="ch-page fade-in">
      <div className="page-heading ch-heading">
        <div>
          <h2>Challenges</h2>
          <p>Join daily, weekly, and monthly challenges to sharpen your skills.</p>
        </div>
        <Dropdown
          label="Show"
          value={filter}
          onChange={setFilter}
          options={FILTERS.map((f) => ({ value: f, label: f }))}
        />
      </div>

      <div className="ch-layout">
        <div>
          {challenges.length === 0 ? (
            <EmptyState icon={LuSwords} title="No challenges here" description="Try a different filter." />
          ) : (
            <div className="ch-grid">
              {challenges.map((c) => (
                <ChallengeCard key={c.id} challenge={c} onToggleJoin={toggleJoin} />
              ))}
            </div>
          )}
        </div>
        <ChallengeLeaderboard leaderboard={challengeLeaderboard} />
      </div>
    </div>
  );
}
