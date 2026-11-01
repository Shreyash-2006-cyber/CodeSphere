const leetcodeService = require('../services/leetcode');

class LeetCodeController {
  async getStats(req, res) {
    try {
      const { userId, username } = req.query;
      if (!userId || !username) {
        return res.status(400).json({ success: false, message: 'UserId and username are required' });
      }

      const data = await leetcodeService.getLeetCodeData(userId, username);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new LeetCodeController();