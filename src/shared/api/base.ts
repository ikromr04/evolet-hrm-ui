import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://evolet-hrm-restapi.test/api';
const REQUEST_TIMEOUT = 5000;

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
