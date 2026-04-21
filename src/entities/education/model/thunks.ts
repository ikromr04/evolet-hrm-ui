import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { EducationStoreSchema } from './schemas';
import { Education } from './types';
import { storeEducation } from '../api/education-api';

const storeEducationAction = createAsyncThunk<Education, {
  data: EducationStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'educations/store',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await storeEducation(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeEducationAction,
};
