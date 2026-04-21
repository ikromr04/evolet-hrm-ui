import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { ExperienceStoreSchema } from './schemas';
import { Experience } from './types';
import { storeExperience } from '../api/experience-api';

const storeExperienceAction = createAsyncThunk<Experience, {
  data: ExperienceStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'experiences/store',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await storeExperience(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeExperienceAction,
};
