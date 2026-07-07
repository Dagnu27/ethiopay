import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  profile: () => api.get('/auth/profile'),
};

export const transactionService = {
  send: (data) => api.post('/transactions/send', data),
  balance: () => api.get('/transactions/balance'),
  history: (params) => api.get('/transactions/history', { params }),
  stats: () => api.get('/transactions/stats'),
};

export const billService = {
  getAll: (params) => api.get('/bills', { params }),
  pay: (id) => api.post(`/bills/${id}/pay`),
};

export const withdrawalService = {
  request: (data) => api.post('/withdrawals', data),
  history: (params) => api.get('/withdrawals', { params }),
  stats: () => api.get('/withdrawals/stats'),
};

export const qrService = {
  generate: (data) => api.post('/qr/generate', data),
  scan: (data) => api.post('/qr/scan', data),
};

export const adminService = {
  dashboard: () => api.get('/admin/dashboard'),
  users: (params) => api.get('/admin/users', { params }),
  transactions: (params) => api.get('/admin/transactions', { params }),
  toggleUser: (id) => api.put(`/admin/users/${id}/toggle`),
};

export default api;