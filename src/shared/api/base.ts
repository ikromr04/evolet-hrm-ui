import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../lib/token';

const BACKEND_URL = 'http://127.0.0.1:8000/api/v1';
const REQUEST_TIMEOUT = 10000;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers['Content-Type'] = 'application/vnd.api+json';
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
