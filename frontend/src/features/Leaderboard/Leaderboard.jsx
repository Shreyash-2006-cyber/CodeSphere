import { useEffect, useMemo, useState } from "react";
import TopThree from "./components/TopThree";
import LeaderboardTable from "./components/LeaderboardTable";
import { communityAPI } from "../../shared/services/communityAPI";
import SearchBar from "../../shared/components/SearchBar";
import Dropdown from "../../shared/components/Dropdown";
import Pagination from "../../shared/components/Pagination";
import Card from "../../shared/components/Card";
import { SkeletonCard } from "../../shared/components/Loader";
import "./styles/Leaderboard.css";

const SCOPES = [
  { value: "global", label: "Global" },
  { value: "friends", label: "Friends" },
];

const TIMEFRAMES = [
  { value: "all", label: "All time" },
  { value: "weekly", label: "This week" },
  { value: "monthly", label: "This month" },
];

const PAGE_SIZE = 8;

export default function Leaderboard() {
  const [scope, setScope] = useState("global");
  const [timeframe, setTimeframe] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await communityAPI.getLeaderboard();
        if (res.success && Array.isArray(res.data)) {
          setLeaderboardData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = useMemo(
    () => leaderboardData.filter((u) => u.name.toLowerCase().includes(query.toLowerCase())),
    [leaderboardData, query]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) {
    return (
      <div className="lb-page fade-in">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="lb-page fade-in">
      <div className="page-heading">
        <h2>Leaderboard</h2>
        <p>See how you stack up globally, against friends, weekly, or monthly.</p>
      </div>

      <Card className="lb-podium-card">
        <TopThree users={leaderboardData.slice(0, 3)} />
      </Card>

      <div className="page-section lb-toolbar">
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search user…" className="lb-search" />
        <div className="lb-filters">
          <Dropdown
            label="Scope"
            value={scope}
            onChange={(v) => { setScope(v); setPage(1); }}
            options={SCOPES}
          />
          <Dropdown
            label="Timeframe"
            value={timeframe}
            onChange={(v) => { setTimeframe(v); setPage(1); }}
            options={TIMEFRAMES}
          />
        </div>
      </div>

      <Card>
        <LeaderboardTable users={pageData} />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </Card>
    </div>
  );
}
