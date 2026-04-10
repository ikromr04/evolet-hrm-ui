import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Languages } from './types';
import { fetchLanguages } from '../api/language-api';

const fetchLanguagesAction = createAsyncThunk<Languages, undefined, {
  extra: AxiosInstance;
}>(
  'languages/fetch',
  async (_arg, { extra: api }) => {
    return await fetchLanguages(api);
  },
);

export {
  fetchLanguagesAction,
};
