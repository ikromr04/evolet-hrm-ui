import { ApiRoute } from '@/const/route';
import { UserResource } from '@/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

export const checkAuthAction = createAsyncThunk<UserResource, undefined, {
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserResource>(ApiRoute.Auth.Check);

    return data;
  },
);
