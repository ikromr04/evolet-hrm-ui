import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { fetchAuthUser, loginUser, logoutUser } from '../api/user-api';
import { User } from './types';
import { LoginSchema } from './schemas';
import { Token } from '@/shared/lib';
import { mapLogin } from './mappers';
import { ApiErrors, ErrorResponse } from '@/shared/api';

const checkAuthAction = createAsyncThunk<User, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    return await fetchAuthUser(api);
  },
);

const loginAction = createAsyncThunk<Token, {
  payload: LoginSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/loginUser',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      const token = await loginUser(api, mapLogin(payload));
      return token;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/logoutUser',
  async (_arg, { extra: api }) => {
    await logoutUser(api);
  }
);

export { checkAuthAction, loginAction, logoutAction };
