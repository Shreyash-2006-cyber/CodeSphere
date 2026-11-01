import { useEffect, useState } from "react";
import PerformerCard from "./components/PerformerCard";
import { communityAPI } from "../../shared/services/communityAPI";
import { SkeletonCard } from "../../shared/components/Loader";
import { LuTrophy, LuCode, LuGithub, LuFlame } from "react-icons/lu";
import "./styles/TopPerformers.css";

export default function TopPerformers() {
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPerformers() {
      try {
        setLoading(true);
        const res = await communityAPI.getTopPerformers();
        if (res.success && res.data) {
          const { overall, leetcode, github, streak } = res.data;
          const cards = [
            {
              id: "overall",
              title: "Overall MVP",
              tone: "amber",
              icon: LuTrophy,
              name: overall[0]?.name || "N/A",
              stat: overall[0] ? `${overall[0].score} points` : "0 points",
            },
            {
              id: "leetcode",
              title: "Top Problem Solver",
              tone: "primary",
              icon: LuCode,
              name: leetcode[0]?.name || "N/A",
              stat: leetcode[0] ? `${leetcode[0].solved} problems solved` : "0 problems",
            },
            {
              id: "github",
              title: "GitHub Master",
              tone: "neutral",
              icon: LuGithub,
              name: github[0]?.name || "N/A",
              stat: github[0] ? `${github[0].stars} stars` : "0 stars",
            },
            {
              id: "streak",
              title: "Streak Legend",
              tone: "rose",
              icon: LuFlame,
              name: streak[0]?.name || "N/A",
              stat: streak[0] ? `${streak[0].streak} day streak` : "0 days",
            },
          ];
          setPerformers(cards);
        }
      } catch (err) {
        console.error("Failed to fetch top performers:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPerformers();
  }, []);

  if (loading) {
    return (
      <div className="tp-page fade-in">
        <div className="tp-grid">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="tp-page fade-in">
      <div className="page-heading">
        <h2>Top Performers</h2>
        <p>Recognizing standout contributors, solvers, and streaks across CodeSphere.</p>
      </div>

      <div className="tp-grid">
        {performers.map((p) => (
          <PerformerCard key={p.id} performer={p} />
        ))}
      </div>
    </div>
  );
}
