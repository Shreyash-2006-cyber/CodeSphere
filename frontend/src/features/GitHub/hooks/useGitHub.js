import { useEffect, useState } from "react";
import { syncGithub } from "../services/githubAPI";
import { useAuth } from "../../../shared/context/AuthContext";
import {
  githubLanguages,
  githubContributions,
  githubWeeklyCommits,
  githubRepositories,
  githubStats,
} from "../data/githubMockData";

export function useGitHub() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(githubStats);
  const [languages, setLanguages] = useState(githubLanguages);
  const [contributions, setContributions] = useState(githubContributions);
  const [weeklyCommits, setWeeklyCommits] = useState(githubWeeklyCommits);
  const [repositories, setRepositories] = useState(githubRepositories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const githubUsername = user?.githubUsername;

      // If no GitHub username configured, skip API call and show mock/empty
      if (!githubUsername) {
        setLoading(false);
        return;
      }

      try {
        const res = await syncGithub({
          userId: user?.id || "guest",
          username: githubUsername,
        });

        const data = res.data;
        if (data) {
          const profileData = {
            username: data.username || githubUsername,
            name: data.name || data.username || githubUsername,
            avatar: data.avatar || "",
            bio: data.bio || "Building in public.",
            followers: data.followers ?? 0,
            following: data.following ?? 0,
            publicRepos: data.publicRepos ?? 0,
            totalStars: data.totalStars ?? 0,
            location: data.location || "Remote",
            joined: data.createdAt || "2024-01-01",
          };

          setProfile(profileData);
          setStats([
            { label: "Public repos", value: profileData.publicRepos },
            { label: "Total stars", value: profileData.totalStars },
            { label: "Followers", value: profileData.followers },
            { label: "Following", value: profileData.following },
          ]);

          if (Array.isArray(data.repositories) && data.repositories.length > 0) {
            setRepositories(data.repositories);
          }
          if (Array.isArray(data.languages) && data.languages.length > 0) {
            setLanguages(data.languages);
          }
          if (Array.isArray(data.contributions) && data.contributions.length > 0) {
            setContributions(data.contributions);
          }
          if (data.weeklyCommits && Array.isArray(data.weeklyCommits.data) && data.weeklyCommits.data.length > 0) {
            setWeeklyCommits(data.weeklyCommits);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user?.githubUsername, user?.id]);

  return {
    profile,
    stats,
    languages,
    contributions,
    weeklyCommits,
    repositories,
    loading,
  };
}