import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserResource } from './types';
import { AxiosInstance } from 'axios';
import { fetchAuthUser } from '../api/user-api';

const checkAuthAction = createAsyncThunk<UserResource, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    return await fetchAuthUser(api);
  },
);

export { checkAuthAction };
