import { apiClient } from '../../../shared/services/apiClient';

export const trackerAPI = {
  getTrackers: async () => {
    const res = await apiClient.get('/tracker');
    return res.data;
  },
  createTracker: async (data) => {
    const res = await apiClient.post('/tracker', data);
    return res.data;
  },
  updateTracker: async (id, data) => {
    const res = await apiClient.put(`/tracker/${id}`, data);
    return res.data;
  },
  deleteTracker: async (id) => {
    const res = await apiClient.delete(`/tracker/${id}`);
    return res.data;
  }
};
