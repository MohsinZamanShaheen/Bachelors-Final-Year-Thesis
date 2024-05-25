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
export const updateUserInfo = (userInfo) => apiClient.put(`/users/update`, userInfo);
export const updateUserPhoto = (formData) => {
  const response = apiClient.post(`/users/addphoto`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const registerNormalUser = async (data) => {
  return await apiClient.post('/auth/createUser', data);
};

export const getUserProfilePhoto = () => apiClient.get('/users/getProfilePhoto');

export const getCurrentUser = () => apiClient.get('/users/getActual');
export const deleteUserPhoto = () => apiClient.delete(`/users/deletephoto`);


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

export const getAlerts = () => apiClient.get('/alerts');
export const updateAssignee = (id, assignee) => apiClient.patch(`/alerts/${id}/assignee`, { assignee });
export const updateStatus = (id, status) => apiClient.patch(`/alerts/${id}/status`, { status });
export const updateAction = (id, action) => apiClient.patch(`/alerts/${id}/action`, { action });
export const updateComments = (id, comments) => apiClient.patch(`/alerts/${id}/comments`, { comments });

export const getOrganizationChart = () => {
  return apiClient.get('/organization/chart');
};

export const getNodes = () => {
  return apiClient.get('/netdiagelem/nodes');
};

export const getEdges = () => {
  return apiClient.get('/netdiagelem/edges');
};


export const getUserEvents = async () => {
  return await apiClient.get(`/events/getAll`);
};

export const createEvent = async (event) => {
  return await apiClient.post(`/events/createEvent`, event);
};

export const deleteEvent = async (eventId) => {
  return await apiClient.delete(`/events/deleteEvent/${eventId}`);
};


//Notifications Center
export const getNotifications = () => apiClient.get('/notifications');
export const markNotificationAsRead = (id) => apiClient.post(`/notifications/read/${id}`);
export const clearAllNotifications = () => apiClient.delete('/notifications/clear');



export default apiClient;