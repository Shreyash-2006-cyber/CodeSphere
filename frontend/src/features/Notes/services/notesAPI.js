import { apiClient } from '../../../shared/services/apiClient';

export const notesAPI = {
  getNotes: async (params) => {
    const res = await apiClient.get('/notes', { params });
    return res.data;
  },
  createNote: async (data) => {
    const res = await apiClient.post('/notes', data);
    return res.data;
  },
  updateNote: async (id, data) => {
    const res = await apiClient.put(`/notes/${id}`, data);
    return res.data;
  },
  deleteNote: async (id) => {
    const res = await apiClient.delete(`/notes/${id}`);
    return res.data;
  }
};
