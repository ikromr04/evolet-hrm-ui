import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { EducationStoreSchema } from './schemas';
import { Education } from './types';
import { storeEducation } from '../api/education-api';
import { mapEducationStore } from './mappers';

const storeEducationAction = createAsyncThunk<Education, {
  payload: EducationStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'educations/store',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      const profile = await storeEducation(api, mapEducationStore(payload));
      
      return profile;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeEducationAction,
};
