import axios from 'axios';

/**
 * Dedicated Axios instance for the Escalation Policy domain.
 *
 * Kept separate from the settings apiClient because the two APIs
 * have different base URLs:
 *   Settings:            /v1/settings
 *   Escalation Policies: /v1/escalation-policies
 *
 * Both share the same interceptor logic (JWT attachment + 401 redirect)
 * so the pattern is mirrored here exactly.
 */

const ESCALATION_API_BASE_URL =
  import.meta.env.VITE_ESCALATION_API_BASE_URL ||
  'http://localhost:8080/v1/escalation-policies';

export const escalationApiClient = axios.create({
  baseURL: ESCALATION_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT Interceptor — attach bearer token on every outbound request
escalationApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
escalationApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default escalationApiClient;
