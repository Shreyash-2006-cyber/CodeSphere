import { apiClient } from '../../../shared/services/apiClient';

export const goalsAPI = {
  getGoals: async () => {
    const res = await apiClient.get('/goals');
    return res.data;
  },
  createGoal: async (data) => {
    const res = await apiClient.post('/goals', data);
    return res.data;
  },
  updateGoal: async (id, data) => {
    const res = await apiClient.put(`/goals/${id}`, data);
    return res.data;
  },
  deleteGoal: async (id) => {
    const res = await apiClient.delete(`/goals/${id}`);
    return res.data;
  }
};
