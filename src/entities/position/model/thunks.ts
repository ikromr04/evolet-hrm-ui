import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Positions } from './types';
import { fetchPositions } from '../api/position-api';

const fetchPositionsAction = createAsyncThunk<Positions, undefined, {
  extra: AxiosInstance;
}>(
  'positions/fetch',
  async (_arg, { extra: api }) => {
    return await fetchPositions(api);
  },
);

export {
  fetchPositionsAction,
};
