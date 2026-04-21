import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { EquipmentStoreSchema } from './schemas';
import { Equipment } from './types';
import { storeEquipment } from '../api/equipment-api';

const storeEquipmentAction = createAsyncThunk<Equipment, {
  data: EquipmentStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'equipments/store',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await storeEquipment(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeEquipmentAction,
};
