import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { fetchUsers, fireUser, storeUser, transferUser, updateAvatar, updateUser } from '../api/user-api';
import { User, Users } from './types';
import { UserFireSchema, UserStoreSchema, UserTransferSchema, UserUpdateSchema } from './schemas';
import { ApiErrors, ErrorResponse } from '@/shared/api';

const fetchUsersAction = createAsyncThunk<Users, undefined, {
  extra: AxiosInstance;
}>(
  'users/fetch',
  async (_arg, { extra: api }) => {
    return await fetchUsers(api);
  },
);

const storeUserAction = createAsyncThunk<User, {
  data: UserStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/store',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await storeUser(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const updateUserAction = createAsyncThunk<User, {
  data: UserUpdateSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/update',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await updateUser(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const updateAvatarAction = createAsyncThunk<User, {
  data: UserUpdateSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/updateAvatar',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await updateAvatar(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const fireUserAction = createAsyncThunk<string, {
  data: UserFireSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/fire',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      await fireUser(api, data);

      return data.id;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const transferUserAction = createAsyncThunk<string, {
  data: UserTransferSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user/transfer',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      await transferUser(api, data);

      return data.id;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeUserAction,
  updateUserAction,
  fetchUsersAction,
  updateAvatarAction,
  fireUserAction,
  transferUserAction,
};
