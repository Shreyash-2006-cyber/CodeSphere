const LeetCode = require('../models/leetcode');

class LeetCodeService {
  async getLeetCodeData(userId, username) {
    try {
      let record = await LeetCode.findOne({ userId });

      if (!record) {
        record = await LeetCode.create({
          userId,
          username,
          totalSolved: 345,
          easySolved: 150,
          mediumSolved: 165,
          hardSolved: 30,
          ranking: 45230,
          acceptanceRate: 68.4,
          streak: 12,
          recentSubmissions: [
            { title: 'Two Sum', status: 'Accepted', language: 'JavaScript', timestamp: new Date() }
          ]
        });
      }

      // Format response to match frontend hooks expectations
      return {
        profile: {
          username: record.username,
          totalSolved: record.totalSolved,
          ranking: record.ranking,
          acceptanceRate: record.acceptanceRate,
          streak: record.streak || 12
        },
        difficulty: {
          easy: record.easySolved,
          medium: record.mediumSolved,
          hard: record.hardSolved,
          totalEasy: 600,
          totalMedium: 1200,
          totalHard: 500
        },
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [20, 35, 45, 60, 80, 105]
        },
        heatmap: [
          { date: '2026-05-01', count: 3 },
          { date: '2026-05-02', count: 5 },
          // Add historical heatmap values as needed
        ],
        submissions: record.recentSubmissions
      };
    } catch (error) {
      throw new Error(`Error fetching LeetCode data: ${error.message}`);
    }
  }
}

module.exports = new LeetCodeService();