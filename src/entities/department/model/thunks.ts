import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Departments } from './types';
import { fetchDepartments } from '../api/department-api';

const fetchDepartmentsAction = createAsyncThunk<Departments, undefined, {
  extra: AxiosInstance;
}>(
  'departments/fetch',
  async (_arg, { extra: api }) => {
    return await fetchDepartments(api);
  },
);

export {
  fetchDepartmentsAction,
};
