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
export const getTeam = () => apiClient.get('/users/getTeam');

export const getProviders = () => apiClient.get('/providers/getAll');

export const addProvider = (providerData) => apiClient.post('/providers/add', providerData);

export const getInvoices = () => apiClient.get('/invoices/getAll');

export const addInvoice = (invoiceData) => apiClient.post('/invoices/add', invoiceData);

export const getControls = (language) => apiClient.get(`/controls/all?language=${language}`);

export const updateControlStatusByCode = (controlCode, status) => {
  return apiClient.put(`/controls/updateStatusByCode`, { controlCode, status });
};

export const getControlSummary = () => apiClient.get('/controls/summary');

export const getSections = () => apiClient.get('/sections');

export default apiClient;