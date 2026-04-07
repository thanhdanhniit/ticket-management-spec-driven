import axios from 'axios';

const SERVICES_API_BASE_URL =
  import.meta.env.VITE_SERVICES_API_BASE_URL || 'http://localhost:8080/api/v1';

export const servicesApiClient = axios.create({
  baseURL: SERVICES_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT Interceptor — attach bearer token on every outbound request
servicesApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 and 403 globally
servicesApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      if (localStorage.getItem('auth_token')) {
        localStorage.removeItem('auth_token');
        alert('Your login session has expired. Please log in again.');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default servicesApiClient;
