import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { fetchProfiles, storeProfile } from '../api/profile-api';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { ProfileStoreSchema } from './schemas';
import { Profile, Profiles } from './types';
import { mapProfileStore } from './mappers';

const fetchProfilesAction = createAsyncThunk<Profiles, undefined, {
  extra: AxiosInstance;
}>(
  'profiles/fetch',
  async (_arg, { extra: api }) => {
    return await fetchProfiles(api);
  }
);

const storeProfileAction = createAsyncThunk<Profile, {
  payload: ProfileStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'profiles/store',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      const profile = await storeProfile(api, mapProfileStore(payload));

      return profile;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  fetchProfilesAction,
  storeProfileAction,
};
