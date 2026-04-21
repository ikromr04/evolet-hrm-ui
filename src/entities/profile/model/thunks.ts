import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { fetchProfiles, storeProfile, updateProfile } from '../api/profile-api';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { ProfileStoreSchema, ProfileUpdateSchema } from './schemas';
import { Profile, Profiles } from './types';

const fetchProfilesAction = createAsyncThunk<Profiles, undefined, {
  extra: AxiosInstance;
}>(
  'profiles/fetch',
  async (_arg, { extra: api }) => {
    return await fetchProfiles(api);
  }
);

const storeProfileAction = createAsyncThunk<Profile, {
  data: ProfileStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'profiles/store',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await storeProfile(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const updateProfileAction = createAsyncThunk<Profile, {
  data: ProfileUpdateSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'profiles/update',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await updateProfile(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  fetchProfilesAction,
  storeProfileAction,
  updateProfileAction,
};
