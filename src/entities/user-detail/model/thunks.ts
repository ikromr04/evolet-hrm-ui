import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { storeUserDetail } from '../api/user-detail-api';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { UserDetailStoreSchema } from './schemas';
import { UserDetail } from './types';
import { mapUserDetailStore } from './mappers';

const storeUserDetailAction = createAsyncThunk<UserDetail, {
  payload: UserDetailStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'user-detail/store',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      const userDetail = await storeUserDetail(api, mapUserDetailStore(payload));
      
      return userDetail;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeUserDetailAction,
};
