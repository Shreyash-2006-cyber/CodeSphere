import { apiClient } from './apiClient';

export const communityAPI = {
  getLeaderboard: async () => {
    const res = await apiClient.get('/community/leaderboard');
    return res.data;
  },
  getFriends: async () => {
    const res = await apiClient.get('/community/friends');
    return res.data;
  },
  getFriendRequests: async () => {
    const res = await apiClient.get('/community/friend-requests');
    return res.data;
  },
  sendFriendRequest: async (receiverId) => {
    const res = await apiClient.post('/community/friend-request/send', { receiverId });
    return res.data;
  },
  respondFriendRequest: async (requestId, action) => {
    const res = await apiClient.post('/community/friend-request/respond', { requestId, action });
    return res.data;
  },
  getTopPerformers: async () => {
    const res = await apiClient.get('/community/top-performers');
    return res.data;
  },
};
