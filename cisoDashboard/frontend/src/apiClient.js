import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (data) => {
  return await apiClient.post('/auth/register', data);
};

export const login = async (data) => {
  return await apiClient.post('/auth/login', data);
};

export default apiClient;