import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { ExperienceStoreSchema, ExperienceUpdateSchema } from './schemas';
import { Experience, Experiences } from './types';
import { deleteExperience, fetchExperiences, storeExperience, updateExperience } from '../api/experience-api';

const fetchExperiencesAction = createAsyncThunk<Experiences, undefined, {
  extra: AxiosInstance;
}>(
  'experiences/fetch',
  async (_arg, { extra: api }) => {
    return await fetchExperiences(api);
  }
);

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

const updateExperienceAction = createAsyncThunk<Experience, {
  data: ExperienceUpdateSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'experiences/update',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await updateExperience(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const deleteExperienceAction = createAsyncThunk<Experience, {
  data: Experience;
}, {
  extra: AxiosInstance;
}>(
  'experiences/delete',
  async ({ data }, { extra: api }) => {
    await deleteExperience(api, data.id);

    return data;
  }
);

export {
  fetchExperiencesAction,
  storeExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
};
