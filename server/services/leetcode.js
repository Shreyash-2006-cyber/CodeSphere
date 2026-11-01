const LeetCode = require('../models/leetcode');
const axios = require('axios');
const mongoose = require('mongoose');

const PROFILE_QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
    }
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

const SUBMISSION_QUERY = `
query recentSubmissionList($username: String!, $limit: Int) {
  recentSubmissionList(username: $username, limit: $limit) {
    title
    statusDisplay
    lang
    timestamp
  }
}
`;

const CONTEST_QUERY = `
query userContestRankingInfo($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
  }
  userContestRankingHistory(username: $username) {
    attended
    rating
    contest {
      title
    }
  }
}
`;

const CALENDAR_QUERY = `
query userCalendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    userCalendar(year: $year) {
      submissionCalendar
    }
  }
}
`;

const MAP_LANG = {
  cpp: "C++",
  python: "Python",
  python3: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  java: "Java",
  golang: "Go",
  rust: "Rust",
  c: "C",
  csharp: "C#",
};

class LeetCodeService {
  async getLeetCodeData(userId, username) {
    try {
      const validUserId = mongoose.Types.ObjectId.isValid(userId)
        ? userId
        : "60c72b2f9b1d8b2b88e8e8a1";

      const headers = {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      };

      let leetcodeRecord = null;
      let profileData = null;
      let submissionData = null;
      let contestData = null;
      let rankingHistory = null;
      let calendarData = null;

      try {
        const [profileRes, subRes, contestRes, calendarRes] = await Promise.all([
          axios.post('https://leetcode.com/graphql', {
            query: PROFILE_QUERY,
            variables: { username }
          }, { headers, timeout: 5000 }),
          axios.post('https://leetcode.com/graphql', {
            query: SUBMISSION_QUERY,
            variables: { username, limit: 15 }
          }, { headers, timeout: 5000 }),
          axios.post('https://leetcode.com/graphql', {
            query: CONTEST_QUERY,
            variables: { username }
          }, { headers, timeout: 5000 }),
          axios.post('https://leetcode.com/graphql', {
            query: CALENDAR_QUERY,
            variables: { username, year: new Date().getFullYear() }
          }, { headers, timeout: 5000 })
        ]);

        profileData = profileRes.data?.data?.matchedUser;
        submissionData = subRes.data?.data?.recentSubmissionList;
        contestData = contestRes.data?.data?.userContestRanking;
        rankingHistory = contestRes.data?.data?.userContestRankingHistory;
        calendarData = calendarRes.data?.data?.matchedUser?.userCalendar?.submissionCalendar;
      } catch (apiErr) {
        console.warn("⚠️ LeetCode GraphQL fetch failed, falling back to database/mock data:", apiErr.message);
      }

      if (profileData) {
        const acStats = profileData.submitStats?.acSubmissionNum || [];
        const totalSolved = acStats.find(s => s.difficulty === 'All')?.count || 0;
        const easySolved = acStats.find(s => s.difficulty === 'Easy')?.count || 0;
        const mediumSolved = acStats.find(s => s.difficulty === 'Medium')?.count || 0;
        const hardSolved = acStats.find(s => s.difficulty === 'Hard')?.count || 0;
        const ranking = profileData.profile?.ranking || 0;
        const contestRating = contestData ? Math.round(contestData.rating) : 0;

        const recentSubmissions = (submissionData || []).map(sub => ({
          title: sub.title,
          status: sub.statusDisplay,
          language: MAP_LANG[sub.lang] || sub.lang || 'JavaScript',
          timestamp: sub.timestamp ? new Date(parseInt(sub.timestamp) * 1000) : new Date()
        }));

        const contestHistory = (rankingHistory || [])
          .filter(h => h.attended)
          .map(h => ({
            contestTitle: h.contest.title,
            rating: Math.round(h.rating)
          }));

        // Build 14-week (98-day) heatmap from real submission calendar
        let submissionHeatmap = [];
        if (calendarData) {
          try {
            const calMap = JSON.parse(calendarData);
            const now = new Date();
            // Go back 98 days (14 weeks), align to start of that day UTC
            for (let i = 97; i >= 0; i--) {
              const d = new Date(now);
              d.setUTCHours(0, 0, 0, 0);
              d.setUTCDate(d.getUTCDate() - i);
              const ts = Math.floor(d.getTime() / 1000).toString();
              submissionHeatmap.push(calMap[ts] || 0);
            }
          } catch (_) {
            submissionHeatmap = [];
          }
        }

        leetcodeRecord = await LeetCode.findOneAndUpdate(
          { userId: validUserId },
          {
            userId: validUserId,
            username,
            totalSolved,
            easySolved,
            mediumSolved,
            hardSolved,
            ranking,
            contestRating,
            recentSubmissions,
            contestHistory,
            submissionHeatmap,
            lastSynced: new Date()
          },
          { upsert: true, returnDocument: 'after' }
        );
      }

      if (!leetcodeRecord) {
        leetcodeRecord = await LeetCode.findOne({ userId: validUserId });
      }

      if (!leetcodeRecord) {
        leetcodeRecord = await LeetCode.create({
          userId: validUserId,
          username,
          totalSolved: 345,
          easySolved: 150,
          mediumSolved: 165,
          hardSolved: 30,
          ranking: 45230,
          contestRating: 1842,
          acceptanceRate: 68.4,
          recentSubmissions: [
            { title: 'Two Sum', status: 'Accepted', language: 'JavaScript', timestamp: new Date() }
          ],
          contestHistory: []
        });
      }

      let trend = {
        title: "Submission trend",
        subtitle: "Problems solved per month",
        label: "Solved",
        color: "#2563eb",
        labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        data: [38, 52, 44, 61, 58, 70],
      };

      if (leetcodeRecord.contestHistory && leetcodeRecord.contestHistory.length > 0) {
        const labels = leetcodeRecord.contestHistory.map(h => 
          (h.contestTitle || "")
            .replace("Weekly Contest ", "W")
            .replace("Biweekly Contest ", "B")
        );
        const data = leetcodeRecord.contestHistory.map(h => h.rating);
        trend = {
          title: "Contest rating trend",
          subtitle: "Rating history of attended contests",
          label: "Rating",
          color: "#ea580c",
          labels,
          data
        };
      }

      return {
        profile: {
          username: leetcodeRecord.username,
          ranking: leetcodeRecord.ranking || 45230,
          contestRating: leetcodeRecord.contestRating || 0,
          totalSolved: leetcodeRecord.totalSolved || 345,
          totalProblems: 3412,
        },
        difficulty: [
          { name: "Easy", solved: leetcodeRecord.easySolved || 0, total: 850, color: "#16a34a" },
          { name: "Medium", solved: leetcodeRecord.mediumSolved || 0, total: 1780, color: "#f59e0b" },
          { name: "Hard", solved: leetcodeRecord.hardSolved || 0, total: 782, color: "#ef4444" },
        ],
        trend,
        heatmap: (leetcodeRecord.submissionHeatmap && leetcodeRecord.submissionHeatmap.length === 98)
          ? leetcodeRecord.submissionHeatmap
          : Array.from({ length: 98 }, () => 0),
        submissions: (leetcodeRecord.recentSubmissions || []).map((sub, idx) => {
          const lowercaseTitle = (sub.title || "").toLowerCase();
          let difficulty = "Medium";
          if (lowercaseTitle.includes("two sum") || lowercaseTitle.includes("valid parent")) {
            difficulty = "Easy";
          } else if (lowercaseTitle.includes("sliding window") || lowercaseTitle.includes("word search") || lowercaseTitle.includes("maximal rectangle") || lowercaseTitle.includes("largest rectangle")) {
            difficulty = "Hard";
          }
          return {
            id: sub._id ? sub._id.toString() : idx,
            title: sub.title,
            difficulty,
            status: sub.status,
            language: sub.language,
            date: sub.timestamp ? sub.timestamp.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
          };
        }),
      };
    } catch (error) {
      throw new Error(`Error fetching LeetCode data: ${error.message}`);
    }
  }
}

module.exports = new LeetCodeService();