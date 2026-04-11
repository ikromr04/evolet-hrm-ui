import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { ExperienceStoreSchema } from './schemas';
import { Experience } from './types';
import { storeExperience } from '../api/experience-api';
import { mapExperienceStore } from './mappers';

const storeExperienceAction = createAsyncThunk<Experience, {
  payload: ExperienceStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'experiences/store',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      const profile = await storeExperience(api, mapExperienceStore(payload));
      
      return profile;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeExperienceAction,
};
