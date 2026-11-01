import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export const fetchLeetCodeData = async (userId, username) => {
  try {
    const response = await axios.get(`${API_URL}/leetcode`, {
      params: { userId, username }
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch LeetCode data';
  }
};