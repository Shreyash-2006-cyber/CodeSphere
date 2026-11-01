import {
  leetcodeProfile,
  leetcodeDifficulty,
  leetcodeSubmissionTrend,
  leetcodeHeatmap,
  leetcodeRecentSubmissions,
} from "../data/leetcodeMockData";

export async function fetchLeetcodeData() {
  return Promise.resolve({
    profile: leetcodeProfile,
    difficulty: leetcodeDifficulty,
    trend: leetcodeSubmissionTrend,
    heatmap: leetcodeHeatmap,
    submissions: leetcodeRecentSubmissions,
  });
}
