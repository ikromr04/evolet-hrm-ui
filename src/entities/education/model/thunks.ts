import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { EducationStoreSchema, EducationUpdateSchema } from './schemas';
import { Education, Educations } from './types';
import { deleteEducation, fetchEducations, storeEducation, updateEducation } from '../api/education-api';

const fetchEducationsAction = createAsyncThunk<Educations, undefined, {
  extra: AxiosInstance;
}>(
  'educations/fetch',
  async (_arg, { extra: api }) => {
    return await fetchEducations(api);
  }
);

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

const updateEducationAction = createAsyncThunk<Education, {
  data: EducationUpdateSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'educations/update',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await updateEducation(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const deleteEducationAction = createAsyncThunk<Education, {
  data: Education;
}, {
  extra: AxiosInstance;
}>(
  'educations/delete',
  async ({ data }, { extra: api }) => {
    await deleteEducation(api, data.id);
    
    return data;
  }
);

export {
  fetchEducationsAction,
  storeEducationAction,
  updateEducationAction,
  deleteEducationAction,
};
