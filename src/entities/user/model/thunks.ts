import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { fetchAuthUser, loginUser, logoutUser, storeUser, uploadUserAvatar } from '../api/user-api';
import { User } from './types';
import { AvatarUploadSchema, LoginSchema, UserStoreSchema } from './schemas';
import { Token } from '@/shared/lib';
import { mapLogin, mapUserStore } from './mappers';
import { ApiErrors, ErrorResponse } from '@/shared/api';

const checkAuthAction = createAsyncThunk<User, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    return await fetchAuthUser(api);
  },
);

const loginAction = createAsyncThunk<Token, LoginSchema, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/loginUser',
  async (payload, { extra: api, rejectWithValue }) => {
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

const storeUserAction = createAsyncThunk<User, UserStoreSchema, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/storeUser',
  async (payload, { extra: api, rejectWithValue }) => {
    try {
      const user = await storeUser(api, mapUserStore(payload));

      return user;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const uploadUserAvatarAction = createAsyncThunk<User, {
  id: string;
  payload: AvatarUploadSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/uploadUserAvatar',
  async ({ id, payload }, { extra: api, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', payload.image);

      const user = await uploadUserAvatar(api, id, formData);

      return user;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  checkAuthAction,
  loginAction,
  logoutAction,
  storeUserAction,
  uploadUserAvatarAction,
};
