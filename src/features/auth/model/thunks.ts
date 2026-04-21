import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { Token } from '@/shared/lib';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { checkAuth, login, logout } from '../api/auth-api';
import { LoginSchema } from './schemas';
import { Me } from './types';

const checkAuthAction = createAsyncThunk<Me, undefined, {
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, { extra: api }) => {
    return await checkAuth(api);
  },
);

const loginAction = createAsyncThunk<Token, LoginSchema, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'auth/login',
  async (payload, { extra: api, rejectWithValue }) => {
    try {
      return await login(api, payload);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await logout(api);
  }
);

export {
  checkAuthAction,
  loginAction,
  logoutAction,
};
