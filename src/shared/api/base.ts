import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../lib/token';

const BACKEND_URL = import.meta.env.VITE_API_URL;
const REQUEST_TIMEOUT = import.meta.env.VITE_API_TIMEOUT;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers['Accept'] = 'application/vnd.api+json';

    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};

export { createAPI };
