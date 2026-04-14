import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { fetchAuthUser, fetchUsers, loginUser, logoutUser, storeUser, updateUser } from '../api/user-api';
import { User, Users } from './types';
import { LoginSchema, UserStoreSchema, UserUpdateSchema } from './schemas';
import { Token } from '@/shared/lib';
import { mapLogin, mapUserStore, mapUserUpdate } from './mappers';
import { ApiErrors, ErrorResponse } from '@/shared/api';

const checkAuthAction = createAsyncThunk<User, undefined, {
  extra: AxiosInstance;
}>(
  'user/check',
  async (_arg, { extra: api }) => {
    return await fetchAuthUser(api);
  },
);

const loginAction = createAsyncThunk<Token, LoginSchema, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/login',
  async (payload, { extra: api, rejectWithValue }) => {
    try {
      return await loginUser(api, mapLogin(payload));
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await logoutUser(api);
  }
);

const storeUserAction = createAsyncThunk<User, {
  payload: UserStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/store',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      return await storeUser(api, mapUserStore(payload));
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const updateUserAction = createAsyncThunk<User, {
  payload: UserUpdateSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/update',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      return await updateUser(api, mapUserUpdate(payload));
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const fetchUsersAction = createAsyncThunk<Users, undefined, {
  extra: AxiosInstance;
}>(
  'users/fetch',
  async (_arg, { extra: api }) => {
    return await fetchUsers(api);
  },
);

export {
  checkAuthAction,
  loginAction,
  logoutAction,
  storeUserAction,
  updateUserAction,
  fetchUsersAction
};
