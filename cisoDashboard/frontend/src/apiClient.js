import axios from 'axios';


const apiClient = axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://springdashsecure.azurewebsites.net/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User related
export const register = async (data) => {return await apiClient.post('/auth/register', data);};
export const login = async (data) => {return await apiClient.post('/auth/login', data);};
export const updateUserInfo = (userInfo) => apiClient.put(`/users/update`, userInfo);
export const logout = () => {return apiClient.post('/auth/logout');};
export const deleteUser = async (userId,organizationId) => {return apiClient.delete(`/users/deleteuser/${userId}`,{ headers: { 'X-Organization-ID': organizationId } });};
export const updateUserRole = async (userId, newRole,organizationId) => {return apiClient.put(`/users/update/role/${userId}`, { role: newRole },{ headers: { 'X-Organization-ID': organizationId } });};
export const getUsers = async (organizationId) => {return apiClient.get('/users/getAll',{ headers: { 'X-Organization-ID': organizationId } })};
export const getUserProfilePhoto = () => apiClient.get('/users/getProfilePhoto');
export const getCurrentUser = () => apiClient.get('/users/getActual');
export const deleteUserPhoto = () => apiClient.delete(`/users/deletephoto`);
export const registerNormalUser = async (data, organizationId) => {return await apiClient.post('/auth/createUser', data, { headers: { 'X-Organization-ID': organizationId } })};
export const updateUserPhoto = (formData) => {
  const response = apiClient.post(`/users/addphoto`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const changePassword = async (passwordChangeRequest) => {
  const response = await apiClient.post('/auth/change-password', passwordChangeRequest);
  return response;
};

// Organization
export const getUserOrganizations = async (userId) => {return await apiClient.get(`/users/${userId}/organizations`);};
export const setCurrentOrganization = async (organizationId) => {await apiClient.post(`/organization/set-current?organizationId=${organizationId}`);};
export const createOrganization = async (companyData) => {return await apiClient.post('/organization/create', companyData);};

//Team Component
export const getTeam = (organizationId) => apiClient.get('/users/getTeam',{ headers: { 'X-Organization-ID': organizationId } });

//Provider Component
export const getProviders = (organizationId) => apiClient.get('/providers/getAll', { headers: { 'X-Organization-ID': organizationId } });
export const addProvider = (providerData, organizationId) => apiClient.post('/providers/add', providerData, { headers: { 'X-Organization-ID': organizationId } });


// Invoices Component
export const getInvoices = (organizationId) => apiClient.get('/invoices/getAll',{ headers: { 'X-Organization-ID': organizationId } });
export const addInvoice = (invoiceData, organizationId) => apiClient.post('/invoices/add', invoiceData, { headers: { 'X-Organization-ID': organizationId } });


//ISO 27002 Controls
export const getControls = (language) => apiClient.get(`/controls/all`, { params: { language } });
export const updateControlStatusByCode = (controlCode, status) => {return apiClient.put(`/controls/updateStatusByCode`, { controlCode, status });};
export const getControlSummary = () => apiClient.get('/controls/summary');


//ISO 27001 Requirements
export const getSections = () => apiClient.get('/sections');

// Alerts
export const getAlerts = (organizationId) => apiClient.get('/alerts', { headers: { 'X-Organization-ID': organizationId } });
export const updateAssignee = (id, assignee, organizationId) => apiClient.patch(`/alerts/${id}/assignee`, { assignee }, { headers: { 'X-Organization-ID': organizationId } });
export const updateStatus = (id, status, organizationId) => apiClient.patch(`/alerts/${id}/status`, { status }, { headers: { 'X-Organization-ID': organizationId } });
export const updateAction = (id, action, organizationId) => apiClient.patch(`/alerts/${id}/action`, { action }, { headers: { 'X-Organization-ID': organizationId } });
export const updateComments = (id, comments, organizationId) => apiClient.patch(`/alerts/${id}/comments`, { comments }, { headers: { 'X-Organization-ID': organizationId } });

// Organization People Chart
export const getOrganizationChart = () => {return apiClient.get('/organization/chart');};

// Network Diagram
export const getNodes = () => {return apiClient.get('/netdiagelem/nodes');};
export const getEdges = () => {return apiClient.get('/netdiagelem/edges');};

// Calender Components Events
export const getUserEvents = async (organizationId) => {return await apiClient.get(`/events/getAll`, {headers: { 'X-Organization-ID': organizationId }});};
export const createEvent = async (event, organizationId) => {return await apiClient.post(`/events/createEvent`, event, {headers: { 'X-Organization-ID': organizationId }});};
export const deleteEvent = async (eventId, organizationId) => {return await apiClient.delete(`/events/deleteEvent/${eventId}`, {headers: { 'X-Organization-ID': organizationId }});};


//Notifications Center
export const getNotifications = (organizationId) => apiClient.get('/notifications', { headers: { 'X-Organization-ID': organizationId } });
export const markNotificationAsRead = (id, organizationId) => apiClient.post(`/notifications/read/${id}`, {}, { headers: { 'X-Organization-ID': organizationId } });
export const clearAllNotifications = (organizationId) => apiClient.delete('/notifications/clear', { headers: { 'X-Organization-ID': organizationId } });

export default apiClient;