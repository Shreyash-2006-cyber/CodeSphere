import {
  githubProfile,
  githubRepositories,
  githubLanguages,
  githubContributions,
  githubWeeklyCommits,
  githubStats,
} from "../data/githubMockData";

// Service layer: today this just resolves mock data; once the backend
// exists, swap the bodies below to call githubAPI and keep the same
// return shape so components/hooks never need to change.
export async function fetchGithubProfile() {
  return Promise.resolve({
    profile: githubProfile,
    stats: githubStats,
    languages: githubLanguages,
    contributions: githubContributions,
    weeklyCommits: githubWeeklyCommits,
    repositories: githubRepositories,
  });
}
