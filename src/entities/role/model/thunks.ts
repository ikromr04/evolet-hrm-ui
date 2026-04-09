import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Roles } from './types';
import { fetchRoles } from '../../role/api/role-api';

const fetchRolesAction = createAsyncThunk<Roles, undefined, {
  extra: AxiosInstance;
}>(
  'roles/fetch',
  async (_arg, { extra: api }) => {
    return await fetchRoles(api);
  },
);

export {
  fetchRolesAction,
};
